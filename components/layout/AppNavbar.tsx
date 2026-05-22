// https://prismic.io/blog/css-background-effects
// - Awesome navbar
// - Nav links may have a dropdown panel
// - Hover drops down the panel unless there is already a panel expanded in which card the animation goes from left to right or vice versa
// -
'use client';
import { usePathname } from 'next/navigation';

import headerNavLinks from '@/data/nav-links';
import siteMetadata from '@/data/site-metadata';
import { useScroll } from '@/providers/ScrollProvider';
import { useMobileNav } from '@/providers/MobileNavProvider';

import ThemeSwitch from '../ThemeSwitch';
import { SafeLink as Link } from '@/mdx/Link';
import { DynamicLogo } from '@/components/brand/DynamicLogo';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NavVariant = 'desktop' | 'mobile';
interface RenderNavLinksProps {
  pathName: string;
  variant: NavVariant;
  onNavigate?: () => void;
}

function checkKbRoute(link: string, pathName: string) {
  try {
    return link.href.substring(0, 3) === '/kb' && pathName?.substring(0, 3) === '/kb';
  } catch (error) {}
}
function renderNavLinks({ pathName, variant, onNavigate }: RenderNavLinksProps) {
  return (headerNavLinks ?? []).map((link) => {
    const isKbRoute = checkKbRoute(link, pathName);
    const isActive = pathName === link.href || isKbRoute;
    const Icon = link.icon;

    return (
      // ✅ Favor state fields
      // - data-active={isActive}
      // 1. Then react body is cleaner
      // - className="nav-link"
      // 2. ⛔️ 👎
      // Don't use React className={isActive ? "text-primary bg..." : "text-muted"}

      // React owns state and decides which style

      <Link
        key={link.title}
        href={link.href}
        onClick={onNavigate}
        data-variant={variant}
        data-active={isActive}
        className="/* 1. Base Layout Resets (Protects against body-link pollution) */ inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium no-underline m-0 tracking-normal transition-all duration-200 cursor-pointer /* 2. Default Static Theme State */ text-on-surface-variant hover:text-primary hover:bg-primary/5 /* 3. React-Driven State Modifiers (Tailwind Data Attributes) */ data-[active=true]:text-primary data-[active=true]:bg-primary-container/30 data-[active=true]:font-semibold /* 4. Optional Contextual Variant Customization */ data-[variant=mobile]:w-full data-[variant=mobile]:px-4 data-[variant=mobile]:py-3"
      >
        {Icon && (
          <Icon
            className="
              w-5 h-5 transition-transform duration-200 shrink-0
              text-on-surface-variant/70
              group-hover:text-primary
              data-[active=true]:text-primary
            "
            data-active={isActive}
          />
        )}

        <span className="truncate">{link.title}</span>
      </Link>
    );
  });
}
function renderNavLinks2({ pathName, variant, onNavigate }: RenderNavLinksProps) {
  return (headerNavLinks ?? []).map((link) => {
    const isKbRoute = checkKbRoute(link, pathName);
    const isActive = pathName === link.href || isKbRoute;

    const Icon = link.icon;
    // How to style?
    // - Inline Tailwind?
    // - Global CSS?
    // - Utilities?
    // - CLSX?
    // - React?
    // - Styled components?

    return (
      <Link
        key={link.title}
        href={link.href}
        onClick={onNavigate}
        data-variant={variant}
        data-active={isActive}
        className="nav-link mx-4 p-2"
      >
        {Icon && <Icon className="nav-link-icon" />}

        <span className="nav-link-label">{link.title}</span>
      </Link>
    );
  });
}

export function AppNavbar() {
  const pathName = usePathname();
  const { scrollProgress } = useScroll();
  const { setOpen } = useMobileNav();

  return (
    // height: 4rem;
    // 4rem = 64px
    // h-16 = 64px
    <nav className="fixed top-0 left-0 right-0 h-16 z-20 flex items-center justify-between border-b border-outline-variant/60 bg-surface/80 px-3 sm:px-4 backdrop-blur-xl">
      {/* LEFT */}
      <Link href="/" className="flex items-center gap-3">
        <DynamicLogo className="h-9 w-9 rounded-xl shadow-sm" />

        <div className="hidden sm:block aurora-text md:text-2xl font-semibold">{siteMetadata.headerTitle}</div>
      </Link>

      {/* CENTER — desktop ONLY */}
      <div className="hidden md:flex items-center">
        {renderNavLinks({
          pathName,
          variant: 'desktop',
        })}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="icon-button md:hidden">
          ☰
        </button>
        <ThemeSwitch />
      </div>

      {/* progress */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]">
        <div
          className="h-full bg-primary animate-pulse"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left',
          }}
        />
      </div>
    </nav>
  );
}
export function MobileNavbarOnOverlay() {
  const { open, setOpen } = useMobileNav();
  const pathName = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100">
      {/* Backdrop */}
      <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Sheet */}
      <aside className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-surface shadow-2xl border-l border-outline-variant">
        {/* header */}
        <div className="flex h-16 items-center justify-between border-b border-outline-variant px-4">
          <span className="text-sm font-medium">Navigation</span>

          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="icon-button">
              ✕
            </button>
            <ThemeSwitch />
          </div>
        </div>
        {/* nav */}
        <nav className="px-2 py-3">
          {renderNavLinks({
            pathName,
            variant: 'mobile',
            onNavigate: () => setOpen(false),
          })}
        </nav>
      </aside>
    </div>
  );
}
export function BaseNavbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const { setOpen } = useMobileNav();

  function open(index: number) {
    if (displayIndex !== null) {
      setDirection(index > displayIndex ? 'right' : 'left');
      setPrevIndex(displayIndex);
    }

    setDisplayIndex(index);
    setMounted(true);
  }

  function close() {
    setMounted(false);
    setDisplayIndex(null);
    setPrevIndex(null);
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!navRef.current) return;

      const rect = navRef.current.getBoundingClientRect();

      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom + 300;

      if (!inside) close();
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [displayIndex]);

  return (
    <div className="fixed w-full h-16 z-50 bg-surface/80 backdrop-blur-xl">
      <div className="relative flex items-center justify-between px-8 h-16 border-b">
        <div ref={navRef} className="flex justify-center ">
          {items.map((item, index) => (
            <div key={index} className="flex justify-center px-16 group" onMouseEnter={() => open(index)}>
              <button key={item.label} className="flex items-center gap-1 py-2 text-sm">
                <span>{item.label}</span>

                <svg
                  className="h-8 w-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            // onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="icon-button md:hidden"
          >
            ☰
          </button>
          <ThemeSwitch />
        </div>
      </div>

      <div
        className={clsx(
          'absolute left-0 top-full w-full overflow-hidden bg-surface shadow-xl transition-all duration-300',
          mounted ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        <div className="relative">
          {displayIndex != null && (
            <motion.div
              className="flex w-full bg-surface will-change-transform"
              animate={{
                x: displayIndex != null ? `-${displayIndex * 100}%` : direction === 'right' ? '100%' : '-100%',
              }}
              initial={false}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {items.map((item) => (
                <div key={item.label} className="w-screen flex flex-col justify-around shrink-0 h-[220px]">
                  <div className="px-6">{item.content}</div>
                  <div className="bg-surface-variant w-screen h-16">stuff</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const items = [
  {
    label: 'Products',
    content: (
      <div className="grid grid-cols-2 gap-4">
        <Card title="Editor" />
        <Card title="Analytics" />
        <Card title="AI Tools" />
        <Card title="Automation" />
      </div>
    ),
  },
  {
    label: 'Solutions',
    content: (
      <div className="grid grid-cols-2 gap-4">
        <Card title="Frameworks" />
        <Card title="Soltuions" />
        <Card title="Skills" />
        <Card title="Stuff" />
      </div>
    ),
  },
  {
    label: 'Resources',
    content: (
      <div className="space-y-3">
        <PanelLink>Docs</PanelLink>
        <PanelLink>Guides</PanelLink>
        <PanelLink>API</PanelLink>
      </div>
    ),
  },
];

function Card({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
}

function PanelLink({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl p-3 transition-colors hover:bg-white/5">{children}</div>;
}

export function DropdownPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Options
      </button>

      {/* Animated Dropdown Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed top-16 left-0 w-screen overflow-hidden bg-white border border-gray-200 shadow-lg z-50"
          >
            <ul className="py-1 text-gray-700">
              <li>
                <a href="#profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </a>
              </li>

              <li>
                <a href="#settings" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
              </li>

              <li>
                <a href="#logout" className="block px-4 py-2 hover:bg-gray-100 font-semibold text-red-600">
                  Logout
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
