import { useEffect, useMemo, useRef } from 'react';

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
