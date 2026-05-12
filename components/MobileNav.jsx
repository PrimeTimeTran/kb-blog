import { useState } from 'react'
import { SafeLink as Link } from './mdx/Link'
import headerNavLinks from '../data/nav-links'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      document.body.style.overflow = status ? 'auto' : 'hidden'
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      {/* Trigger */}
      <button
        type="button"
        onClick={onToggleNav}
        aria-label="Toggle Menu"
        className="h-9 w-9 rounded-md flex items-center justify-center
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-50
          transition-all duration-300 ease-out
          ${navShow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Blur background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onToggleNav} />

        {/* Panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-[85%] max-w-sm
            bg-white dark:bg-black
            border-l border-gray-200 dark:border-gray-800
            shadow-2xl
            transform transition-transform duration-300 ease-out
            ${navShow ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Menu</span>

            <button
              onClick={onToggleNav}
              className="h-8 w-8 rounded-md flex items-center justify-center
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              ✕
            </button>
          </div>

          {/* Nav */}
          <nav className="px-3 py-4 space-y-1">
            {(headerNavLinks ?? []).map((link) => {
              const Icon = link.icon

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={onToggleNav}
                  className="
                      flex items-center gap-3
                      px-3 py-3 rounded-md
                      text-base font-medium
                      text-gray-800 dark:text-gray-100
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      transition
                    "
                >
                  {Icon && <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}

                  <span>{link.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
export default MobileNav
