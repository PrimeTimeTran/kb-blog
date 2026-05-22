import { createTrace } from '@/lib/trace';

export function resolveUniversalPath(currentFileSlug, targetLinkPath, index) {
  if (!targetLinkPath || !index) return null;

  let cleanTarget = targetLinkPath
    .split('#')[0]
    .split('|')[0]
    .trim()
    .replace(/\.md(x)?$/, '')
    .toLowerCase();
  const cleanTargetLeaf = cleanTarget.split('/').pop().replace(/^0\./, '');

  if (index[cleanTarget]) return cleanTarget;

  const keys = Object.keys(index);
  for (let i = 0; i < keys.length; i++) {
    const registryKey = keys[i];
    const registryFilePart = registryKey.split('/').pop().toLowerCase();
    const cleanRegistryLeaf = registryFilePart.replace(/^0\./, '').replace(/\.md(x)?$/, '');

    if (cleanRegistryLeaf === cleanTargetLeaf) {
      return registryKey;
    }
  }
  return null;
}
// export function preprocessEmbeds(mdxSource, index, currentSlug, depth = 1, visited = new Set()) {
//   if (!mdxSource) return '';

//   const lines = mdxSource.split('\n');
//   const processedLines = lines.map((line) => {
//     // Matches Obsidian transclusion grammar: ![[filename.md]] or ![[path/filename]]
//     const embedRegex = /!\[\[([^\]]+)\]\]/;
//     const match = line.match(embedRegex);

//     if (!match) return line;

//     const rawTarget = match[1];
//     // Strip trailing .md or .mdx extensions to get a clean target name
//     const cleanTarget = rawTarget.replace(/\.mdx?$/, '');

//     // Resolve registry data keys accurately by checking keys, filenames, or slugs
//     const resolvedKey = Object.keys(index).find((key) => {
//       const cleanKey = key.replace(/\.mdx?$/, '');
//       return (
//         cleanKey === cleanTarget ||
//         cleanKey.endsWith('/' + cleanTarget) ||
//         cleanKey.endsWith('/0.' + cleanTarget) ||
//         index[key].slug === cleanTarget ||
//         index[key].slug === rawTarget
//       );
//     });

//     const fileData = index[resolvedKey];

//     // If the referenced file asset cannot be found, fallback to original unparsed text
//     if (!fileData) return line;

//     const displayTitle =
//       fileData.frontMatter?.title || fileData.title || cleanTarget.split('/').pop().replace(/^0\./, '');
//     const targetSlug = fileData.slug || resolvedKey;
//     const cleanHref = `/kb/${targetSlug}`;

//     // Capture contextual layout symbols up front (e.g. "> ", "  *", ">>> ")
//     const prefixMatch = line.match(/^([\s>]*)/);
//     const linePrefix = prefixMatch ? prefixMatch[1] : '';

//     let generatedHtml = '';

//     // --- SAFETY CHECK 1: CIRCULAR PROTECTION ---
//     if (visited.has(targetSlug)) {
//       generatedHtml = `
// <div className="border border-error/30 bg-error-container text-on-error-container my-4 rounded-md p-3 text-sm">
//   ⚠️ <strong>Recursive loop blocked:</strong> Infinite loop reference to <a href="${cleanHref}" className="underline font-mono">${displayTitle}</a> stopped.
// </div>
// `;
//     }
//     // --- SAFETY CHECK 2: MAX NESTING DEPTH ---
//     else if (depth > 2) {
//       generatedHtml = `
// <div className="border border-outline bg-surface-variant text-on-surface-variant my-4 rounded-md p-3 text-xs italic">
//   🔗 Link reference to nested document: <a href="${cleanHref}" className="underline font-medium not-italic">${displayTitle}</a> (Nesting limit reached)
// </div>
// `;
//     }
//     // --- SAFE UNPACKING RUN ---
//     else {
//       // Create a fresh tracking history instance to avoid sibling side-effects
//       const nextVisited = new Set(visited);
//       nextVisited.add(currentSlug);

//       // Process embedded sub-contents recursively
//       const processedSubContent = preprocessEmbeds(fileData.mdxSource, index, targetSlug, depth + 1, nextVisited);

//       generatedHtml = `
// <details className="obsidian-embed-container border border-outline bg-surface text-on-surface rounded-lg my-6 overflow-hidden shadow-sm" open>
//   <summary className="embed-header flex items-center justify-between px-4 py-2.5 bg-surface-variant/50 border-b border-outline cursor-pointer list-none hover:bg-surface-variant transition-colors select-none">
//     <div className="flex items-center gap-2 font-medium text-sm">
//       <span className="embed-icon opacity-70">📂</span>
//       <span className="embed-title font-semibold">${displayTitle}</span>
//     </div>
//     <a href="${cleanHref}" className="embed-link text-xs text-primary hover:underline flex items-center gap-1" title="Open source note">
//       Open Note ↗
//     </a>
//   </summary>
//   <div className="embed-body prose p-4 max-h-[400px] overflow-auto text-sm text-on-surface">
//     ${processedSubContent}
//   </div>
// </details>
// `;
//     }

//     // Replace the *entire* text line with our newly formatted multiline string blocks
//     // and append our captured blockquote prefixes to each generated item line
//     const prefixedHtml = generatedHtml
//       .trim()
//       .split('\n')
//       .map((htmlLine) => `${linePrefix}${htmlLine}`)
//       .join('\n');

//     return prefixedHtml;
//   });

//   return processedLines.join('\n');
// }

export function preprocessEmbeds(mdxSource, index, currentSlug, depth = 1, visited = new Set()) {
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
      return (
        cleanKey === cleanTarget ||
        cleanKey.endsWith('/' + cleanTarget) ||
        cleanKey.endsWith('/0.' + cleanTarget) ||
        index[key].slug === cleanTarget ||
        index[key].slug === rawTarget
      );
    });

    const fileData = index[resolvedKey];
    if (!fileData) return line;

    const displayTitle =
      fileData.frontMatter?.title || fileData.title || cleanTarget.split('/').pop().replace(/^0\./, '');
    const targetSlug = fileData.slug || resolvedKey;
    const cleanHref = `/kb/${targetSlug}`;

    const prefixMatch = line.match(/^([\s>]*)/);
    const linePrefix = prefixMatch ? prefixMatch[1] : '';

    let generatedHtml = '';

    if (visited.has(targetSlug)) {
      generatedHtml = `
<div class="border border-error/30 bg-error-container text-on-error-container my-4 rounded-md p-3 text-sm">
  ⚠️ <strong>Recursive loop blocked:</strong> Infinite loop reference to <a href="${cleanHref}" class="underline font-mono">${displayTitle}</a> stopped.
</div>
`;
    } else if (depth > 2) {
      generatedHtml = `
<div class="border border-outline bg-surface-variant text-on-surface-variant my-4 rounded-md p-3 text-xs italic">
  🔗 Link reference to nested document: <a href="${cleanHref}" class="underline font-medium not-italic">${displayTitle}</a> (Nesting limit reached)
</div>
`;
    } else {
      const nextVisited = new Set(visited);
      nextVisited.add(currentSlug);

      const processedSubContent = preprocessEmbeds(fileData.mdxSource, index, targetSlug, depth + 1, nextVisited);

      // Using standard HTML "class" to comply cleanly with compiler targets and testing suites
      generatedHtml = `
<details class="obsidian-embed-container border border-outline bg-surface text-on-surface rounded-lg my-6 overflow-hidden shadow-sm" open>
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
