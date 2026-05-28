import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft } from 'lucide-react';

import { DynamicLogo } from '@/components/brand/DynamicLogo';
import ThemeSwitch from '../ThemeSwitch';
import { DropdownPanel } from './DropdownPanel';
import { navItems } from '@/data/navItems';

export function MegaNavbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  function close() {
    setMounted(false);
    setActiveIdx(null);
    setHasEntered(false);
  }
  function open(index: number) {
    if (activeIdx !== null) {
      // setDirection(index > activeIdx ? 'right' : 'left');
      // setPrevIndex(activeIdx);
    }
    setActiveIdx(index);
    setMounted(true);
  }
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  function cancelClose() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }
  function scheduleClose() {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      close();
    }, 180);
  }
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseLeave = (e: MouseEvent) => {
      const nextTarget = e.relatedTarget as Node | null;

      // still inside navbar/dropdown ecosystem
      if (nextTarget && container.contains(nextTarget)) {
        return;
      }
      scheduleClose();
    };
    const handleMouseEnter = () => {
      cancelClose();
    };
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
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
  const motionDiv = {
    animate: {
      x: activeIdx != null ? `-${activeIdx * 100}%` : '0%',
    },
    transition: {
      duration: hasEntered ? 0.35 : 0,
      ease: ease,
    },
  };
  return (
    <div ref={containerRef} className="fixed inset-x-0 top-0 z-20">
      <div className="h-10 w-full absolute top-16 left-0" />
      <div className="w-full h-16 relative">
        <nav className="flex h-16 px-8 border-b relative justify-between">
          <div ref={navRef} className="flex flex-1 justify-center items-center">
            <DynamicLogo className="h-9 w-9 rounded-xl shadow-sm" />
            {navItems.map((item, index) => {
              return (
                <div
                  key={index}
                  onMouseEnter={() => open(index)}
                  className="flex flex-1 justify-center items-center align-middle group"
                >
                  <button className="nav-link flex flex-1 justify-center">
                    <item.icon className="nav-link-icon text-primary" />
                    <span className="hidden md:flex">{item.label}</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="nav-link-icon hidden md:flex h-8 w-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-180"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Open menu" className="icon-button md:hidden">
              ☰
            </button>
            <ThemeSwitch />
          </div>
        </nav>

        <AnimatePresence>
          {mounted && (
            <motion.aside {...asideMotion} className="overflow-hidden shadow-xl">
              <div className="overflow-hidden w-full relative">
                <motion.div
                  initial={false}
                  {...motionDiv}
                  onAnimationComplete={() => {
                    // Once the initial height animation of the parent is done,
                    // we enable the horizontal animation
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
      </div>
    </div>
  );
}
