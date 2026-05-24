import { useEffect, useMemo, useRef } from 'react';

// RULE:
// This is a "type-only export".
// It does NOT exist at runtime in JavaScript.
//
// TypeScript erases this during compilation, so it is only used for:
// - static type checking
// - editor IntelliSense
//
// This is part of "erasable type-only exports":
// → types are removed at build time
// → no JavaScript output is generated

export type TOCItemData = {
  url: string;
  value: string;
  depth?: number;
};
export function useTableOfContents(toc: TOCItemData[], activeId?: string) {
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const activeIndex = useMemo(() => {
    if (!activeId) return -1;
    return toc.findIndex((i) => i.url === activeId);
  }, [toc, activeId]);

  const getItemState = (index: number, item: TOCItemData) => {
    const isActive = item.url === activeId;
    const isPassed = activeIndex !== -1 && index < activeIndex;

    return { isActive, isPassed };
  };

  useEffect(() => {
    if (!activeId) return;

    const el = itemRefs.current.get(activeId);
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const isVisible = elRect.top >= parentRect.top && elRect.bottom <= parentRect.bottom;

    if (!isVisible) {
      el.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  return {
    itemRefs,
    activeIndex,
    getItemState,
  };
}
