import { useEffect, useRef, useState } from 'react';

type TocItem = {
  url?: string;
  slug?: string;
};

type ScrollState = {
  scrollY: number;
  scrollProgress: number;
  shrunk: boolean;
  activeId: string | null;
};

export function useScrollState(el: HTMLElement | null, toc: TocItem[] = [], threshold = 40): ScrollState {
  const ticking = useRef(false);

  const SHRINK_AT = threshold;
  const EXPAND_AT = Math.max(0, threshold - 24);

  const [scrollY, setScrollY] = useState(0);
  const [shrunk, setShrunk] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /*
   * SCROLL STATE
   */

  useEffect(() => {
    if (!el) return;

    let frame = 0;

    const update = () => {
      const scrollTop = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;

      setScrollY((prev) => (prev !== scrollTop ? scrollTop : prev));

      const nextProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      setScrollProgress((prev) => (prev !== nextProgress ? nextProgress : prev));

      setShrunk((prev) => {
        if (!prev && scrollTop >= SHRINK_AT) return true;
        if (prev && scrollTop <= EXPAND_AT) return false;
        return prev;
      });

      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    el.addEventListener('scroll', onScroll, { passive: true });

    update();

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
    };
  }, [el, SHRINK_AT, EXPAND_AT]);

  /*
   * TOC OBSERVER
   */

  useEffect(() => {
    if (!el || !toc?.length) return;

    const elements = toc
      .map((item) => {
        const id = item?.url?.replace('#', '') ?? item?.slug ?? null;

        if (!id) return null;
        return document.getElementById(id);
      })
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (!visible.length) return;

        const id = visible[0].target.id;
        const next = `#${id}`;

        setActiveId((prev) => (prev !== next ? next : prev));
      },
      {
        root: el,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      },
    );

    elements.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [el, toc]);

  return {
    scrollY,
    scrollProgress,
    shrunk,
    activeId,
  };
}
