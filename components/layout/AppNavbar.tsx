'use client'
import { usePathname } from 'next/navigation'

import headerNavLinks from '@/data/nav-links'
import siteMetadata from '@/data/site-metadata'
import { useScroll } from '@/providers/ScrollProvider'
import { useMobileNav } from '@/providers/MobileNavProvider'

import ThemeSwitch from '../ThemeSwitch'
import { SafeLink as Link } from '@/mdx/Link'
import { DynamicLogo } from '@/components/brand/DynamicLogo'

type NavVariant = 'desktop' | 'mobile'

interface RenderNavLinksProps {
  pathName: string
  variant: NavVariant
  onNavigate?: () => void
}

function checkKbRoute(link: string, pathName: string) {
  try {
    return link.href.substring(0, 3) === '/kb' && pathName?.substring(0, 3) === '/kb'
  } catch (error) {}
}

function renderNavLinks({ pathName, variant, onNavigate }: RenderNavLinksProps) {
  return (headerNavLinks ?? []).map((link) => {
    const isKbRoute = checkKbRoute(link, pathName)
    const isActive = pathName === link.href || isKbRoute

    const Icon = link.icon
    // How to style?
    // - Inline Tailwind?
    // - Global CSS?
    // - Utilities?
    // - CLSX?
    // - React?
    // - Styled components?

    // 1. ⛔️ 👎 For now, don't use React className={isActive ? "text-primary bg..." : "text-muted"}
    // data-active={isActive}
    // React owns state and decides which style
    //
    // 2. ✅ Favor a state field
    // className="nav-link"
    return (
      <Link
        key={link.title}
        href={link.href}
        onClick={onNavigate}
        data-variant={variant}
        data-active={isActive}
        className="nav-link"
      >
        {Icon && <Icon className="nav-link-icon" />}

        <span className="nav-link-label">{link.title}</span>
      </Link>
    )
  })
}

export function AppNavbar() {
  const pathName = usePathname()
  const { scrollProgress } = useScroll()
  const { setOpen } = useMobileNav()

  return (
    <nav className="fixed inset-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/60 bg-surface/80 px-3 sm:px-4 backdrop-blur-xl">
      {/* LEFT */}
      <Link href="/" className="flex items-center gap-3">
        <DynamicLogo className="h-9 w-9 rounded-xl shadow-sm" />

        <div className="hidden sm:block text-primary md:text-2xl font-semibold">
          {siteMetadata.headerTitle}
        </div>
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
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="icon-button md:hidden"
        >
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
  )
}

export function MobileNavbarOnOverlay() {
  const { open, setOpen } = useMobileNav()
  const pathName = usePathname()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-100">
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

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
  )
}
