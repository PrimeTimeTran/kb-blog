import { AnimatePresence, motion } from 'framer-motion';
import { asideMotion, checkKbRoute, useNavDropdown } from './hooks';
import { useMobileNav, useScroll } from '@/providers';

import { ChevronDown } from './components';
import { CornerDownLeft } from 'lucide-react';
import { DropdownPanel } from './DropdownPanel';
import { DynamicLogo } from '@/components/brand/DynamicLogo';
import ThemeSwitch from '../../ThemeSwitch';
import { navItems } from '@/data/navItems';

export function MegaNavbar({ pathName }: { pathName: string }) {
  const { scrollProgress } = useScroll();
  const { setOpen } = useMobileNav();
  const { containerRef, mounted, setHasEntered, open, scheduleClose, motionDiv } = useNavDropdown();
  return (
    <div ref={containerRef} className="fixed inset-x-0 top-0 z-20 bg-surface border-b border-outline/40">
      <div className="h-10 w-full absolute top-16 left-0 pointer-events-none" />
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
          <motion.aside {...asideMotion} className="overflow-hidden shadow-lg">
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
