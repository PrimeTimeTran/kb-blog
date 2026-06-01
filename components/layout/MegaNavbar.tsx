import { AnimatePresence, motion } from 'framer-motion';
import { NavItem, navItems } from '@/data/navItems';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMobileNav, useScroll } from '@/providers';

import { CornerDownLeft } from 'lucide-react';
import { DropdownPanel } from './DropdownPanel';
import { DynamicLogo } from '@/components/brand/DynamicLogo';
import ThemeSwitch from '../ThemeSwitch';
import clsx from 'clsx';
import { getFeatureFlags } from '@/lib/feature-flags';

export function MegaNavbar({ pathName }: { pathName: string }) {
  const { scrollProgress } = useScroll();
  const { setOpen } = useMobileNav();
  const { containerRef, mounted, setHasEntered, open, scheduleClose, motionDiv } = useNavDropdown();
  return (
    <div ref={containerRef} className="fixed inset-x-0 top-0 z-20 bg-surface border-b border-outline/40">
      <div className="h-10 w-full absolute top-16 left-0" />
      <div className="w-full h-16 relative">
        <nav className="flex h-16 px-8 relative justify-between">
          <div className="flex flex-1 justify-center items-center">
            <DynamicLogo className="h-9 w-9 rounded-xl shadow-sm" />
            {navItems.map((item, index) => {
              return (
                <div
                  key={index}
                  onMouseEnter={() => open(index)}
                  className="flex flex-1 justify-center items-center align-middle group"
                >
                  <button className="nav-link group" data-active={checkKbRoute(item, pathName)}>
                    <item.icon className="nav-link-icon" />
                    <span className="nav-link-label">{item.label}</span>
                    <ChevronDown className="nav-link-chevron" />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Open menu" className="icon-button md:hidden" onClick={() => setOpen(true)}>
              ☰
            </button>
            <ThemeSwitch />
          </div>
        </nav>
        <div className="h-0.5 pointer-events-none absolute inset-x-0 bottom-0">
          <div
            style={{
              transform: `scaleX(${scrollProgress})`,
              transformOrigin: 'left',
            }}
            className="h-full bg-primary animate-pulse"
          />
        </div>

        {AnimatedDropdowns()}
      </div>
    </div>
  );

  function AnimatedDropdowns() {
    return (
      <AnimatePresence>
        {mounted && (
          <motion.aside {...asideMotion} className="overflow-hidden shadow-lg ">
            <div className="overflow-hidden w-full relative">
              <motion.div
                initial={false}
                {...motionDiv}
                onAnimationComplete={() => {
                  // Once the initial height animation of
                  // the parent is done, then we enable horizontal animations
                  if (mounted) setHasEntered(true);
                }}
                className="flex w-full will-change-transform"
              >
                {navItems.map((item) => (
                  <DropdownPanel key={item.label} item={item} scheduleClose={scheduleClose} />
                ))}
              </motion.div>
            </div>

            <div
              className="fixed inset-x-0 bottom-0 h-24 flex justify-center items-center gap-2 text-sm text-on-surface-variant/70 animate-pulse"
              onMouseEnter={scheduleClose}
            >
              <CornerDownLeft className="h-4 w-4" />
              <span>Dismiss</span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    );
  }
}

function checkKbRoute(link: NavItem, pathName: string) {
  try {
    return link.href.substring(0, 3) === '/kb' && pathName?.substring(0, 3) === '/kb';
  } catch (error) {
    console.error('Error', error);
  }
}
type ChevronDownProps = {
  size?: number;
  className?: string;
};

export function ChevronDown({ size = 18, className }: ChevronDownProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{ width: size, height: size }}
      className={clsx(
        'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'text-on-surface-variant/60',
        className,
      )}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const asideMotion = {
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

type NavState = {
  mounted: boolean;
  activeIdx: number | null;
};

type UseNavDropdownOptions = {
  initialState?: NavState;
  closeDelay?: number;
  ease?: any;
};

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
