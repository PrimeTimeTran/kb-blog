'use client'

import { usePathname } from 'next/navigation'

import Logo from '@/data/logo.svg'
import { SafeLink as Link } from '@/mdx/components/Link'
import headerNavLinks from '@/data/nav-links'
import siteMetadata from '@/data/site-metadata'
import { useDock } from '../../packages/docksystem/src'

import MobileNav from '@/components/MobileNav'
import ThemeSwitch from '@/components/ThemeSwitch'

export function Navbar({ className }) {
  const pathName = usePathname()
  const dock = useDock()
  return (
    <header
      className={
        className ||
        'h-14 sticky top-0 z-10 flex justify-around theme-border-b px-3 bg-white dark:bg-black py-2'
      }
    >
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center">
          <Logo />
          <div className="ml-3 hidden text-2xl font-semibold sm:block">
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        <div className="hidden sm:flex">
          <div className="hidden sm:flex">
            <div>
              <h1>Docks</h1>
              <div className="bg-blue-500">
                <button onClick={() => dock.toggle('left')}>Toggle Left</button>
              </div>
              <div className="bg-green-500">
                <button onClick={() => dock.toggle('right')}>Toggle Right</button>
              </div>
              <div>
                <h1>Overlays</h1>
                <button onClick={() => dock.toggle('leftOverlay')}>Toggle Left Overlay</button>
                <button onClick={() => dock.toggle('rightOverlay')}>Toggle Right Overlay</button>
              </div>
            </div>
            {/* {(headerNavLinks ?? []).map((link) => {
              const isActive = pathName == link.href
              const Icon = link.icon

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`p-4 font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-meta hover:text-primary-500 dark:text-meta hover:dark:text-primary-400'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.title}
                </Link>
              )
            })} */}
          </div>
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}
