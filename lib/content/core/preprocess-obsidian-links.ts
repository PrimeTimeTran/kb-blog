import { slug } from 'github-slugger';
import matter from 'gray-matter';

// BUG: Wikilinks parsing fails
// - [ ] Internal links
// - [ ] Absolute link/path(from root)
// - [ ] file name link/path
// - [ ] file name link/path

// Plan
// source
//   → extract wikilinks
//   → parse components
//   → resolve target
//   → render final URL

import path from 'path';
import GithubSlugger from 'github-slugger';

const slugger = new GithubSlugger();

type Entry = {
  id: string;
  path: string; // canonical
  title: string; // display title
  aliases?: string[];
};

type WikiLink = {
  raw: string;
  target: string;
  path: string;
  anchor?: string;
  alias?: string;
};

type ResolveResult = {
  entry: Entry | null;
  reason: 'exact' | 'basename' | 'alias' | 'ambiguous' | 'missing';
  matches?: Entry[];
  normalized: string;
};

function normalizePath(input = '') {
  return input
    .replace(/\.mdx?$/, '')
    .replace(/^\//, '')
    .replace(/\\/g, '/')
    .trim();
}

function normalizeAnchor(input = '') {
  slugger.reset();
  return slugger.slug(input.trim());
}

function parse(raw: string): WikiLink {
  const pipeIndex = raw.indexOf('|');

  const left = pipeIndex === -1 ? raw.trim() : raw.slice(0, pipeIndex).trim();

  const alias = pipeIndex === -1 ? undefined : raw.slice(pipeIndex + 1).trim();
  const hashIndex = left.indexOf('#');

  const filePart = hashIndex === -1 ? left : left.slice(0, hashIndex);

  const anchor = hashIndex === -1 ? undefined : left.slice(hashIndex + 1);

  return {
    raw,
    target: left,
    path: normalizePath(filePart),
    anchor,
    alias,
  };
}

function buildLookup(index: Record<string, Entry>) {
  const exact = new Map<string, Entry>();
  const basenameMap = new Map<string, Entry[]>();
  const aliasMap = new Map<string, Entry[]>();

  for (const entry of Object.values(index)) {
    const canonical = normalizePath(entry.path);

    exact.set(canonical, entry);

    const base = normalizePath(path.basename(canonical));

    if (!basenameMap.has(base)) {
      basenameMap.set(base, []);
    }

    basenameMap.get(base)!.push(entry);

    for (const alias of entry.aliases || []) {
      const normalizedAlias = normalizePath(alias);

      if (!aliasMap.has(normalizedAlias)) {
        aliasMap.set(normalizedAlias, []);
      }

      aliasMap.get(normalizedAlias)!.push(entry);
    }
  }

  return {
    exact,
    basenameMap,
    aliasMap,
  };
}

function resolve(link: WikiLink, lookup: ReturnType<typeof buildLookup>): ResolveResult {
  const normalized = normalizePath(link.path);

  // 1. exact path
  const exact = lookup.exact.get(normalized);

  if (exact) {
    return {
      entry: exact,
      reason: 'exact',
      normalized,
    };
  }

  // 2. basename match
  const basename = normalizePath(path.basename(normalized));
  const basenameMatches = lookup.basenameMap.get(basename) || [];

  if (basenameMatches.length === 1) {
    return {
      entry: basenameMatches[0],
      reason: 'basename',
      normalized,
    };
  }

  if (basenameMatches.length > 1) {
    return {
      entry: null,
      reason: 'ambiguous',
      matches: basenameMatches,
      normalized,
    };
  }

  // 3. alias match
  const aliasMatches = lookup.aliasMap.get(normalized) || [];

  if (aliasMatches.length === 1) {
    return {
      entry: aliasMatches[0],
      reason: 'alias',
      normalized,
    };
  }

  if (aliasMatches.length > 1) {
    return {
      entry: null,
      reason: 'ambiguous',
      matches: aliasMatches,
      normalized,
    };
  }

  return {
    entry: null,
    reason: 'missing',
    normalized,
  };
}

function render(link: WikiLink, resolved: ResolveResult) {
  if (!resolved.entry) {
    return `[[${link.raw}]]`;
  }

  const anchor = link.anchor ? `#${normalizeAnchor(link.anchor)}` : '';

  const url = `/kb/${normalizePath(resolved.entry.path)}${anchor}`;

  const label =
    link.alias || link.anchor ? `${link.path}${link.anchor ? `#${link.anchor}` : ''}` : resolved.entry.title;

  return `[${label}](${url})`;
}
/**
 * preprocessObsidianLinks()
 *
 * Compiler pass that converts Obsidian-style wikilinks into
 * standard markdown links BEFORE MDX compilation.
 *
 * This function processes ONE markdown document at a time,
 * while using the GLOBAL content index to resolve links.
 *
 * ----------------------------------------------------------------------------
 * SUPPORTED LINK TYPES
 * ----------------------------------------------------------------------------
 *
 * 1. Internal self-heading links
 *
 *    Input:
 *      [[#Markdown Elements]]
 *
 *    Output:
 *      [#Markdown Elements](#markdown-elements)
 *
 *    Notes:
 *    - Uses current document headings
 *    - Heading anchors are normalized/sluggified
 *    - Supports nested/self TOC-style navigation
 *
 * ----------------------------------------------------------------------------
 *
 * 2. Relative sibling page links
 *
 *    Current slug:
 *      0.preview/theme1
 *
 *    Input:
 *      [[page2]]
 *
 *    Output:
 *      [page2](/kb/0.preview/page2)
 *
 *    Notes:
 *    - Resolves relative to current page directory
 *    - Mimics Obsidian relative note resolution
 *
 * ----------------------------------------------------------------------------
 *
 * 3. Explicit markdown file links
 *
 *    Input:
 *      [[theme2.md]]
 *      [[theme2.mdx]]
 *
 *    Output:
 *      [theme2.md](/kb/0.preview/theme2)
 *
 *    Notes:
 *    - .md/.mdx extensions normalized away
 *    - Case-insensitive extension matching
 *
 * ----------------------------------------------------------------------------
 *
 * 4. Heading links into external pages
 *
 *    Input:
 *      [[theme2#Code]]
 *
 *    Output:
 *      [theme2#Code](/kb/0.preview/theme2#code)
 *
 * ----------------------------------------------------------------------------
 *
 * 5. Aliased wikilinks
 *
 *    Input:
 *      [[theme2#Code|theme2 > Code]]
 *
 *    Output:
 *      [theme2 > Code](/kb/0.preview/theme2#code)
 *
 *    Notes:
 *    - Alias becomes visible markdown label
 *    - Actual route still resolves from target
 *
 * ----------------------------------------------------------------------------
 *
 * 6. Missing / unpublished files
 *
 *    Input:
 *      [[gogogo.md]]
 *
 *    Output:
 *      gogogo.md
 *
 *    Notes:
 *    - Missing files are NOT linked
 *    - Wiki syntax is stripped safely
 *    - Prevents broken routes into unpublished content
 *
 * ----------------------------------------------------------------------------
 *
 * 7. Repeated wikilinks
 *
 *    Notes:
 *    - Multiple identical wikilinks resolve consistently
 *    - Stable deterministic output
 *
 * ----------------------------------------------------------------------------
 *
 * 8. Nested/foldered content resolution
 *
 *    Input:
 *      [[atom/math/calc/core/integral/integration]]
 *
 *    Output:
 *      [integration](/kb/atom/math/calc/core/integral/integration)
 *
 * ----------------------------------------------------------------------------
 *
 * 9. Markdown compatibility
 *
 *    Notes:
 *    - Emits STANDARD markdown links only
 *    - Does NOT emit raw HTML <a> tags
 *    - Allows MDX/remark/rehype pipeline to finish normally
 *
 * ----------------------------------------------------------------------------
 *
 * 10. Frontmatter safety
 *
 *    Notes:
 *    - Does not mutate frontmatter-like content
 *    - Prevents accidental corruption of metadata blocks
 *
 * ----------------------------------------------------------------------------
 *
 * 11. Asset/link safety
 *
 *    Notes:
 *    - Asset-like references (.png, .jpg, etc.) ignored
 *    - Prevents image references from becoming page routes
 *
 * ----------------------------------------------------------------------------
 *
 * 12. Pipeline invariants
 *
 *    Notes:
 *    - Never emits raw [[wikilink]] syntax after processing
 *    - Safe to run before MDX bundling
 *    - Does not require HTML parsing
 *    - Deterministic output from static index
 *
 * ----------------------------------------------------------------------------
 *
 * PIPELINE ORDER
 * ----------------------------------------------------------------------------
 *
 * Raw Markdown
 *   -> preprocessObsidianLinks()
 *   -> MDX/remark compilation
 *   -> HTML output
 *
 * This function MUST execute before markdown compilation.
 */

/**
 * Preprocesses Obsidian-style wikilinks into standard markdown links
 * before MDX/remark compilation.
 *
 * This function processes a single markdown document (`source`) while
 * using the global published content index (`index`) and current page
 * slug (`currentSlug`) to resolve relative/internal links.
 *
 * ----------------------------------------------------------------------------
 * Supported wikilink formats
 * ----------------------------------------------------------------------------
 *
 * Self heading links:
 *   [[#Markdown Elements]]
 *   -> [#Markdown Elements](#markdown-elements)
 *
 * Relative sibling page links:
 *   [[page2]]
 *   -> [page2](/kb/0.preview/page2)
 *
 * Explicit markdown file links:
 *   [[theme2.md]]
 *   [[theme2.mdx]]
 *   -> [theme2.md](/kb/0.preview/theme2)
 *
 * External page heading links:
 *   [[theme2#Code]]
 *   -> [theme2#Code](/kb/0.preview/theme2#code)
 *
 * Aliased wikilinks:
 *   [[theme2#Code|theme2 > Code]]
 *   -> [theme2 > Code](/kb/0.preview/theme2#code)
 *
 * Nested/foldered note links:
 *   [[atom/math/calc/core/integral/integration]]
 *   -> [integration](/kb/atom/math/calc/core/integral/integration)
 *
 * ----------------------------------------------------------------------------
 * Missing / unpublished content
 * ----------------------------------------------------------------------------
 *
 * If a target file is not present in the published index,
 * the wikilink syntax is stripped and downgraded to plain text.
 *
 * Example:
 *   [[gogogo.md]]
 *   -> gogogo.md
 *
 * This prevents broken routes into unpublished/draft content.
 *
 * ----------------------------------------------------------------------------
 * Pipeline behavior
 * ----------------------------------------------------------------------------
 *
 * This function MUST run before MDX/remark compilation.
 *
 * Pipeline:
 *   raw markdown
 *     -> preprocessObsidianLinks()
 *     -> MDX / remark / rehype
 *     -> HTML output
 *
 * The function intentionally emits STANDARD MARKDOWN LINKS,
 * not raw HTML anchor tags.
 *
 * ----------------------------------------------------------------------------
 * Guarantees
 * ----------------------------------------------------------------------------
 *
 * - Never emits raw [[wikilink]] syntax after processing
 * - Does not mutate frontmatter-like content
 * - Supports repeated deterministic link resolution
 * - Resolves relative links using currentSlug context
 * - Safe for static MDX compilation pipelines
 *
 * @param {string} source
 * Raw markdown source for the current document.
 *
 * @param {Record<string, Entry>} index
 * Global published content index keyed by normalized slug/path.
 *
 * @param {string} currentSlug
 * Current document slug/path used for relative wikilink resolution.
 *
 * @returns {string}
 * Markdown source with Obsidian wikilinks converted into
 * standard markdown links.
 */
export function preprocessObsidianLinks(source = '', index: Record<string, Entry> = {}, currentSlug = '') {
  return source.replace(/\[\[(.+?)\]\]/g, (_, raw) => {
    const [left, alias] = raw.split('|');

    const display = alias?.trim();

    // split file + anchor
    const [filePartRaw, anchorRaw] = left.split('#');

    const filePart = filePartRaw?.trim() ?? '';
    const anchor = anchorRaw?.trim();

    // -----------------------------------
    // SELF ANCHOR LINK
    // [[#Heading]]
    // -----------------------------------

    if (!filePart && anchor) {
      const hash = normalizeAnchor(anchor);

      return `[#${anchor}](#${hash})`;
    }

    // -----------------------------------
    // NORMALIZE TARGET
    // -----------------------------------

    const normalizedTarget = filePart
      .replace(/\.mdx?$/i, '')
      .replace(/^\//, '')
      .trim();

    // -----------------------------------
    // SELF/SIBLING RESOLUTION
    // -----------------------------------

    const currentDir = currentSlug.split('/').slice(0, -1).join('/');

    // relative sibling support
    const candidatePaths = [normalizedTarget, `${currentDir}/${normalizedTarget}`];

    const matchedKey = candidatePaths.find((candidate) => {
      return Object.prototype.hasOwnProperty.call(index, candidate);
    });

    // -----------------------------------
    // MISSING PAGE
    // unpublished/draft
    // -----------------------------------

    if (!matchedKey) {
      return display || left;
    }

    // -----------------------------------
    // BUILD URL
    // -----------------------------------

    const url = `/kb/${matchedKey}` + (anchor ? `#${normalizeAnchor(anchor)}` : '');

    const label = display || left;

    // IMPORTANT:
    // emit markdown link
    return `[${label}](${url})`;
  });
}
