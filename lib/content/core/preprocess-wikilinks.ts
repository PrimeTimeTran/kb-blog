import { slug } from 'github-slugger';

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

function normalizeKey(input = '') {
  return input
    .replace(/\.mdx?$/, '')
    .replace(/^\//, '')
    .replace(/\\/g, '/')
    .trim()
    .toLowerCase();
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
    path: normalizeKey(filePart),
    anchor,
    alias,
  };
}

function buildLookup(index: Record<string, Entry>) {
  const exact = new Map<string, Entry>();
  const basenameMap = new Map<string, Entry[]>();
  const aliasMap = new Map<string, Entry[]>();

  for (const entry of Object.values(index)) {
    const canonical = normalizeKey(entry.path);

    exact.set(canonical, entry);

    const base = normalizeKey(path.basename(canonical));

    if (!basenameMap.has(base)) {
      basenameMap.set(base, []);
    }

    basenameMap.get(base)!.push(entry);

    for (const alias of entry.aliases || []) {
      const normalizedAlias = normalizeKey(alias);

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
  const normalized = normalizeKey(link.path);

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
  const basename = normalizeKey(path.basename(normalized));
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

  const url = `/kb/${normalizeKey(resolved.entry.path)}${anchor}`;

  const label =
    link.alias || link.anchor ? `${link.path}${link.anchor ? `#${link.anchor}` : ''}` : resolved.entry.title;

  return `[${label}](${url})`;
}

/**
 * DROP-IN
 */
export function preprocessWikiLinks(source = '', index: Record<string, Entry> = {}, currentSlug = '') {
  const lookup = buildLookup(index);

  const debug = {
    resolved: [] as any[],
    ambiguous: [] as any[],
    missing: [] as any[],
  };

  const output = source.replace(/\[\[(.+?)\]\]/g, (_, raw) => {
    const link = parse(raw);

    const resolved = resolve(link, lookup);

    if (resolved.reason === 'ambiguous') {
      debug.ambiguous.push({
        raw,
        normalized: resolved.normalized,
        matches: resolved.matches?.map((x) => x.path),
      });

      console.warn('[wiki:ambiguous]', {
        raw,
        normalized: resolved.normalized,
        matches: resolved.matches?.map((x) => x.path),
      });

      return `[[${raw}]]`;
    }

    if (resolved.reason === 'missing') {
      debug.missing.push({
        raw,
        normalized: resolved.normalized,
      });

      console.warn('[wiki:missing]', {
        raw,
        normalized: resolved.normalized,
      });

      return `[[${raw}]]`;
    }

    const finalPath = `/kb/${normalizeKey(resolved.entry!.path)}${
      link.anchor ? `#${normalizeAnchor(link.anchor)}` : ''
    }`;

    debug.resolved.push({
      raw,
      resolvedBy: resolved.reason,
      finalPath,
    });

    console.log('[wiki:resolved]', {
      raw,
      resolvedBy: resolved.reason,
      finalPath,
    });

    return render(link, resolved);
  });

  console.groupCollapsed('[wiki-links]');
  console.table(debug.resolved);

  if (debug.ambiguous.length) {
    console.group('[wiki-links ambiguous]');
    console.table(debug.ambiguous);
    console.groupEnd();
  }

  if (debug.missing.length) {
    console.group('[wiki-links missing]');
    console.table(debug.missing);
    console.groupEnd();
  }

  console.groupEnd();

  return output;
}
