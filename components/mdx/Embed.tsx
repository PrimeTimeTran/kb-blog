'use client';

import { useEffect, useState } from 'react';
import { useRegistry } from '@/providers/RegistryProvider';

import { compileWikiMDX } from '../../mdx-components';

export function Embed({ id, index, currentSlug, depth, visited }) {
  return <h1>Embed</h1>;
  const registry = useRegistry();
  const key = id.split('/').pop();
  const doc = registry?.[key];

  const [Content, setContent] = useState<any>(null);

  // Look up the unique target identifier/slug of the file we want to embed
  const targetSlug = doc?.slug || key;

  // --- RUNTIME CIRCUIT BREAKERS ---

  // Rule 1: Stop immediately if we are trying to embed a file that is already rendering up the tree
  const isCircular = visited.has(targetSlug);

  // Rule 2: Enforce maximum nesting depth constraint (1 deep maximum)
  const isTooDeep = depth >= 1;

  useEffect(() => {
    // Abort out completely if a circuit breaker tripped or there's no content
    if (!doc?.mdxSource || isCircular || isTooDeep) return;

    let cancelled = false;

    // Create unique, non-mutating trackers to step down into the next nested layer safely
    const nextDepth = depth + 1;
    const nextVisited = new Set([...visited, currentSlug].filter(Boolean));

    compileWikiMDX(doc.mdxSource, {
      slug: targetSlug,
      index: index,
      depth: nextDepth, // Pass tracking down into the sub-compiler
      visited: nextVisited, // Pass updated records down into the sub-compiler
    }).then((C) => {
      if (!cancelled) setContent(() => C.Content);
    });

    return () => {
      cancelled = true;
    };
  }, [doc?.mdxSource, isCircular, isTooDeep, targetSlug, depth, visited, currentSlug, index]);

  // Fallback views for your layout boundaries
  if (!doc?.mdxSource) {
    return (
      <div className="border border-dashed border-zinc-500 p-2 text-xs text-zinc-500">Document not found: {id}</div>
    );
  }

  if (isCircular) {
    return (
      <div className="border border-red-500/30 bg-red-500/5 p-2 text-xs text-red-400">
        ⚠️ Recursive embed loop blocked ({targetSlug})
      </div>
    );
  }

  if (isTooDeep) {
    return (
      <div className="border border-zinc-700 bg-zinc-900/30 p-2 text-xs text-zinc-500 italic">
        Link reference to <span className="font-mono">{targetSlug}</span> (Nesting limit reached)
      </div>
    );
  }

  if (!Content) return <div className="text-xs text-zinc-500 animate-pulse">Loading embed...</div>;

  return (
    <div className="prose p-3 dark:prose-invert overflow-auto h-[400px] embed border border-zinc-200 dark:border-zinc-800 rounded-md">
      <Content />
    </div>
  );
}
