'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { logEvent } from './analytics/GoogleAnalytics'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9 w-9" />

  const isDark = theme === 'dark' || resolvedTheme === 'dark'

  const onToggleTheme = () => {
    setIsSpinning(true)
    const newTheme = isDark ? 'light' : 'dark'

    // Duration matches the animation timing
    setTimeout(() => setIsSpinning(false), 500)

    logEvent('Changes theme', 'Behavior', 'Style', newTheme)
    setTheme(newTheme)
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="relative ml-1 mr-1 flex h-9 w-9 items-center justify-center rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors sm:ml-4 overflow-hidden"
      onClick={onToggleTheme}
    >
      {/* Subtle Spinner Ring */}
      <AnimatePresence>
        {isSpinning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { repeat: Infinity, duration: 0.8, ease: 'linear' } }}
            className="absolute inset-0 border-2 border-primary/30 border-t-primary rounded-xl"
          />
        )}
      </AnimatePresence>

      {/* Icon Container - Fixed Size to prevent layout shifts */}
      <div className="relative h-5 w-5 flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={isDark ? 'sun' : 'moon'}
            // Absolute positioning ensures the icons stack on top of each other during the swap
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.2, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.2, rotate: 45 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              opacity: { duration: 0.2 },
            }}
          >
            {isDark ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-warning"
              >
                <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  )
}

export default ThemeSwitch
