'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useScrollState } from '../hooks/useScrollState';

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const [toc, setToc] = useState([]);

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

  return (
    <ScrollContext.Provider
      value={{
        activeId,
        shrunk,
        toc,
        setToc,
        scrollProgress,
        scrollY,
        setScrollEl,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider');
  return ctx;
}
