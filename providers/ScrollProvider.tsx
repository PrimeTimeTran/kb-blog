'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

import { useScrollState } from '../hooks/useScrollState';
import { TOCItemData } from '@/hooks/useTOC';

type ScrollContextValue = {
  activeId: string | null;
  shrunk: boolean;
  toc: TOCItemData[];
  setToc: (toc: TOCItemData[]) => void;
  scrollProgress: number;
  scrollY: number;
  setScrollEl: (el: HTMLElement | null) => void;
};

export const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }) {
  const [toc, setToc] = useState<TOCItemData[]>([]);

  // DOM element lives here
  const scrollElRef = useRef(null);

  // React state version (IMPORTANT: triggers hook updates)
  const [scrollEl, setScrollElState] = useState(null);

  /**
   * Callback ref from ScrollContainer
   * This is the ONLY way the DOM node enters React state safely
   */
  const setScrollEl = useCallback((node) => {
    scrollElRef.current = node;
    setScrollElState(node);
  }, []);

  /**
   * Derived scroll state (single source of truth)
   */
  const { shrunk, activeId, scrollProgress, scrollY } = useScrollState(scrollEl, toc);
  const value: ScrollContextValue = {
    activeId,
    shrunk,
    toc,
    setToc,
    scrollProgress,
    scrollY,
    setScrollEl,
  };
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider');
  return ctx;
}
