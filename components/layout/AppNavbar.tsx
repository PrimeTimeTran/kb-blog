'use client';

import { DynamicLogo } from '@/components/brand/DynamicLogo';
import { SafeLink as Link } from '@/mdx/Link';
import { MegaNavbar } from './MegaNavbar';
import ThemeSwitch from '../ThemeSwitch';
import { getFeatureFlags } from '@/lib/feature-flags';
import headerNavLinks from '@/data/nav-links';
import siteMetadata from '@/data/site-metadata';
import { useMobileNav } from '@/providers/MobileNavProvider';
// https://prismic.io/blog/css-background-effects
// - Awesome navbar
// - Nav links may have a dropdown panel
// - Hover drops down the panel unless there is already a panel expanded in which card the animation goes from left to right or vice versa
import { usePathname } from 'next/navigation';
import { useScroll } from '@/providers/ScrollProvider';

export function AppNavbar() {
  const pathName = usePathname();
  const { scrollProgress } = useScroll();
  const { setOpen } = useMobileNav();
  if (getFeatureFlags().isMegaMenuOn) return <MegaNavbar pathName={pathName} />;
  return (
    // height: 4rem;
    // 4rem = 64px
    // h-16 = 64px
    <nav className="z-20 flex h-16 px-4 bg-lowest/80 border-b border-on-surface-variant/10 shadow-sm fixed top-0 left-0 right-0 items-center justify-between backdrop-blur-md">
      {/* LEFT */}
      <Link href="/" className="flex items-center gap-3">
        <DynamicLogo className="h-9 w-9 rounded-xl shadow-sm" />

        <div className="hidden font-semibold aurora-text sm:block md:text-2xl">{siteMetadata.headerTitle}</div>
      </Link>

      <div className="hidden items-center md:flex">
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

      <div className="h-0.5 pointer-events-none absolute inset-x-0 bottom-0">
        <div
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left',
          }}
          className="h-full bg-primary animate-pulse"
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
    <div className="z-100 fixed inset-0">
      {/* Backdrop */}
      <div onClick={() => setOpen(false)} className="bg-black/30 absolute inset-0 backdrop-blur-sm" />

      {/* Sheet */}
      <aside className="h-full w-[86%] max-w-sm bg-surface border-l border-outline-variant shadow-2xl absolute right-0 top-0">
        {/* header */}
        <div className="flex h-16 px-4 border-b border-outline-variant items-center justify-between">
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

function checkKbRoute(link: string, pathName: string) {
  try {
    return link.href.substring(0, 3) === '/kb' && pathName?.substring(0, 3) === '/kb';
  } catch (error) {
    console.error('Error', error);
  }
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
        className="inline-flex px-3 py-2 m-0 text-sm font-medium tracking-normal text-on-surface-variant rounded-lg transition-all cursor-pointer /* 1. Base Layout Resets (Protects against body-link pollution) */ items-center gap-2 no-underline duration-200 /* 2. Default Static Theme State */ hover:text-primary hover:bg-primary/5 /* 3. React-Driven State Modifiers (Tailwind Data Attributes) */ data-[active=true]:text-primary data-[active=true]:bg-primary-container/30 data-[active=true]:font-semibold /* 4. Optional Contextual Variant Customization */ data-[variant=mobile]:w-full data-[variant=mobile]:px-4 data-[variant=mobile]:py-3"
      >
        {Icon && (
          <Icon
            data-active={isActive}
            className="w-5 h-5 text-on-surface-variant/70 transition-transform duration-200 shrink-0 group-hover:text-primary data-[active=true]:text-primary"
          />
        )}

        <span className="truncate">{link.title}</span>
      </Link>
    );
  });
}
type NavVariant = 'desktop' | 'mobile';
interface RenderNavLinksProps {
  pathName: string;
  variant: NavVariant;
  onNavigate?: () => void;
}
