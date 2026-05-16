'use client'
import { usePathname } from 'next/navigation'

import headerNavLinks from '@/data/nav-links'
import siteMetadata from '@/data/site-metadata'
import { useScroll } from '@/providers/ScrollProvider'

import MobileNav from '../MobileNav'
import ThemeSwitch from '../ThemeSwitch'
import { SafeLink as Link } from '../mdx/Link'
import { DynamicLogo } from '@/components/brand/DynamicLogo'

export function AppNavbar({}) {
  const pathName = usePathname()
  const { scrollProgress } = useScroll()

  function checkKbRoute(link) {
    try {
      return link.href.substring(0, 3) === '/kb' && pathName?.substring(0, 3) === '/kb'
    } catch (error) {}
  }
  // Make better favicon
  // https://www.remove.bg/upload
  // https://www.canva.com/design/DAHJZ2uqiWQ/AJFhQIonTYZ9OMnINFHzmw/edit?ui=eyJHIjp7IkQiOnsiRCI6eyJBPyI6IkYifX19fQ
  return (
    <nav className="h-14 sticky top-0 z-10 flex items-center justify-between px-2 sm:px-3 bg-white dark:bg-black border-b border-outline-variant">
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center gap-2">
          <DynamicLogo className="h-8 w-8 rounded-lg shadow-sm" />

          <div className="hidden sm:block text-primary md:text-2xl font-semibold">
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        <div className="hidden sm:flex">
          <div className="hidden md:flex items-center">
            {(headerNavLinks ?? []).map((link) => {
              const isKbRoute = checkKbRoute(link, pathName)
              const isActive = pathName == link.href || isKbRoute
              const Icon = link.icon

              return (
                <Link
                  key={link.title}
                  href={link.href}
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
                  // 
                  // 2. ✅ Favor a state field
                  // className="nav-link"
                  // data-active={isActive}
                  data-active={isActive}
                  className={`nav-link  ${isActive ? 'nav-link' : 'nav-link'}`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="hidden lg:inline">{link.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-full">
        <div
          className="h-full relative overflow-hidden animate-pulse-soft-glow"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left',
            transition: 'width transform 120ms linear',
          }}
        ></div>
      </div>
    </nav>
  )
}
