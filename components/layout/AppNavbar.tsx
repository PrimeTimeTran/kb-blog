'use client'

import { usePathname } from 'next/navigation'

import { useScroll } from '@/providers/ScrollProvider'

import headerNavLinks from '@/data/nav-links'
import siteMetadata from '@/data/site-metadata'

import MobileNav from '../MobileNav'
import ThemeSwitch from '../ThemeSwitch'

import { SafeLink as Link } from '../mdx/Link'

export function Navbar({}) {
  const pathName = usePathname()
  const { scrollProgress } = useScroll()

  function checkKbRoute(link) {
    try {
      return link.href.substring(0, 3) === '/kb' && pathName.substring(0, 3) === '/kb'
    } catch (error) {}
  }
  // Make better favicon
  // https://www.remove.bg/upload
  // https://www.canva.com/design/DAHJZ2uqiWQ/AJFhQIonTYZ9OMnINFHzmw/edit?ui=eyJHIjp7IkQiOnsiRCI6eyJBPyI6IkYifX19fQ
  return (
    <nav className="h-14 sticky top-0 z-10 flex items-center justify-between px-2 sm:px-3 bg-white dark:bg-black border-b border-(--outline-variant)">
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center gap-2">
          <img src="/static/favicons/loi-tran.png" alt="Logo" className="h-6 w-6" />

          <div className="hidden sm:block text-lg md:text-2xl font-semibold">
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
                  className={`px-2 sm:px-3 py-2 text-sm sm:text-base font-medium flex items-center gap-1 sm:gap-2 transition-colors ${
                    isActive ? 'text-nav-active' : 'text-nav'
                  }`}
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
            width: `${scrollProgress * 100}%`,
            backgroundColor: 'var(--primary)',
            transition: 'width 120ms linear',
          }}
        >
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      </div>
    </nav>
  )
}
