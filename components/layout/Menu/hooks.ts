import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { NavItem } from '@/data/navItems';
import { UseNavDropdownOptions } from './types';
import { getFeatureFlags } from '@/lib/feature-flags';

const initialState = getFeatureFlags().megaMenu.state;

export function useNavDropdown({ closeDelay = 180 }: UseNavDropdownOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mounted, setMounted] = useState(initialState.mounted);
  const [activeIdx, setActiveIdx] = useState<number | null>(initialState.activeIdx);
  const [hasEntered, setHasEntered] = useState(false);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    setMounted(false);
    setActiveIdx(null);
    setHasEntered(false);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();

    closeTimeoutRef.current = setTimeout(() => {
      close();
    }, closeDelay);
  }, [cancelClose, close, closeDelay]);

  const open = useCallback((index: number) => {
    setActiveIdx((prev) => {
      // direction hook point if you bring it back
      return index;
    });

    setMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      cancelClose();
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const nextTarget = e.relatedTarget as Node | null;

      if (nextTarget && container.contains(nextTarget)) return;

      scheduleClose();
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cancelClose, scheduleClose]);

  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  const motionDiv = useMemo(() => {
    return {
      animate: {
        x: activeIdx != null ? `-${activeIdx * 100}%` : '0%',
      },
      transition: {
        duration: hasEntered ? 0.35 : 0,
        ease,
      },
    };
  }, [activeIdx, hasEntered]);

  return {
    // refs
    containerRef,

    // state
    mounted,
    activeIdx,
    hasEntered,

    // setters (keep minimal exposed surface)
    setHasEntered,

    // actions
    open,
    close,
    scheduleClose,
    cancelClose,

    // motion
    motionDiv,
  };
}

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const asideMotion = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: 'auto',
  },
  exit: {
    opacity: 0,
    height: 0,
  },
  transition: {
    duration: 0.35,
    ease,
  },
};

export function checkKbRoute(link: NavItem, pathName: string) {
  try {
    return link.href.substring(0, 3) === '/kb' && pathName?.substring(0, 3) === '/kb';
  } catch (error) {
    console.error('Error', error);
  }
}
