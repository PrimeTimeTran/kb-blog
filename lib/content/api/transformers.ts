import { FrontMatter } from '../types';

export interface UniversalPathIndex {
  [key: string]: unknown;
}

export interface FileData {
  slug?: string;
  title?: string;
  frontMatter?: FrontMatter;
  mdxSource?: string;
  [key: string]: unknown;
}

export interface UniversalEmbedIndex {
  [key: string]: FileData;
}

/**
 * Recursively resolves Obsidian-style wiki embeds (`![[slug]]`) within MDX content
 * by replacing embed references with the embedded document's processed content.
 *
 * Features:
 * - Supports nested embeds with configurable recursion depth protection.
 * - Prevents circular embed loops using a visited set.
 * - Uses a shared embed index for slug/content lookup.
 * - Preserves unresolved embeds if no matching entry exists.
 *
 * Example:
 * ```md
 * Hello
 *
 * ![[shared/button]]
 * ```
 *
 * becomes:
 *
 * ```md
 * Hello
 *
 * <contents of shared/button>
 * ```
 *
 * @param mdxSource - Raw MDX source content to preprocess.
 * @param index - Lookup table containing embeddable content entries keyed by slug.
 * @param currentSlug - Slug of the currently processing document.
 * @param depth - Current recursive embed depth. Used internally for safety limits.
 * @param visited - Tracks previously visited embeds to avoid infinite recursion.
 *
 * @returns MDX content with wiki embeds recursively expanded.
 */
export function preprocessEmbeds(
  mdxSource: string | null | undefined,
  index: UniversalEmbedIndex,
  currentSlug: string,
  depth: number = 1,
  visited: Set<string> = new Set(),
): string {
  if (!mdxSource) return '';

  const lines = mdxSource.split('\n');
  const processedLines = lines.map((line) => {
    const embedRegex = /!\[\[([^\]]+)\]\]/;
    const match = line.match(embedRegex);

    if (!match) return line;

    const rawTarget = match[1];
    const cleanTarget = rawTarget.replace(/\.mdx?$/, '');

    const resolvedKey = Object.keys(index).find((key) => {
      const cleanKey = key.replace(/\.mdx?$/, '');
      const item = index[key];

      return (
        cleanKey === cleanTarget ||
        cleanKey.endsWith('/' + cleanTarget) ||
        cleanKey.endsWith('/0.' + cleanTarget) ||
        item?.slug === cleanTarget ||
        item?.slug === rawTarget
      );
    });

    if (!resolvedKey) return line;

    const fileData = index[resolvedKey];
    if (!fileData) return line;

    // Extract display title cleanly with safe string manipulation guards
    const defaultTitle = cleanTarget.split('/').pop()?.replace(/^0\./, '') ?? '';
    const displayTitle = fileData.frontMatter?.title || fileData.title || defaultTitle;

    const targetSlug = fileData.slug || resolvedKey;
    const cleanHref = `/kb/${targetSlug}`;

    const prefixMatch = line.match(/^([\s>]*)/);
    const linePrefix = prefixMatch ? prefixMatch[1] : '';

    let generatedHtml = '';

    if (visited.has(targetSlug)) {
      generatedHtml = `
<div class="border border-error/30 bg-error-container text-on-error-container my-4 p-3 text-sm">
  ⚠️ <strong>Recursive loop blocked:</strong> Infinite loop reference to <a href="${cleanHref}" class="underline font-mono">${displayTitle}</a> stopped.
</div>
`;
    } else if (depth > 2) {
      generatedHtml = `
<div class="border border-outline bg-surface-variant text-on-surface-variant my-4 p-3 text-xs italic">
  🔗 Link reference to nested document: <a href="${cleanHref}" class="underline font-medium not-italic">${displayTitle}</a> (Nesting limit reached)
</div>
`;
    } else {
      const nextVisited = new Set(visited);
      nextVisited.add(currentSlug);

      const processedSubContent = preprocessEmbeds(fileData.mdxSource, index, targetSlug, depth + 1, nextVisited);

      generatedHtml = `
<details class="obsidian-embed-container border border-outline bg-surface text-on-surface my-6 overflow-hidden shadow-sm" open>
  <summary class="embed-header flex items-center justify-between px-4 py-2.5 bg-surface-variant/50 border-b border-outline cursor-pointer list-none hover:bg-surface-variant transition-colors select-none">
    <div class="flex items-center gap-2 font-medium text-sm">
      <span class="embed-icon opacity-70">📂</span>
      <span class="embed-title font-semibold">${displayTitle}</span>
    </div>
    <a href="${cleanHref}" class="embed-link text-xs text-primary hover:underline flex items-center gap-1" title="Open source note">
      Open Note ↗
    </a>
  </summary>
  <div class="embed-body prose p-4 max-h-[400px] overflow-auto text-sm text-on-surface">
    ${processedSubContent}
  </div>
</details>
`;
    }

    const prefixedHtml = generatedHtml
      .trim()
      .split('\n')
      .map((htmlLine) => `${linePrefix}${htmlLine}`)
      .join('\n');

    return prefixedHtml;
  });

  return processedLines.join('\n');
}
