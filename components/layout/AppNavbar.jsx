'use client'

import { usePathname } from 'next/navigation'

import Logo from '../../data/logo.svg?react'
import { SafeLink as Link } from '../../mdx/components/Link'
import headerNavLinks from '../../data/nav-links'
import siteMetadata from '../../data/site-metadata'

import MobileNav from '../../components/MobileNav'
import ThemeSwitch from '../../components/ThemeSwitch'

export function Navbar({ className }) {
  const pathName = usePathname()

  function checkKbRoute(link) {
    try {
      return link.href.substring(0, 3) === '/kb' && pathName.substring(0, 3) === '/kb'
    } catch (error) {
      console.log('link parse error', error)
    }
  }
  return (
    <nav
      className={
        className ||
        'h-14 sticky top-0 z-10 flex items-center justify-between border-b px-2 sm:px-3 bg-white dark:bg-black'
      }
    >
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center gap-2">
          <Logo />

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
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-meta hover:text-primary-500 dark:text-meta hover:dark:text-primary-400'
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
    </nav>
  )
}
