'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="min-h-screen w-full"
      >
        <div className="flex min-h-screen w-full gap-12 px-6 py-10 box-border">
          {/* MAIN */}
          <div className="flex flex-col flex-1 max-w-4xl">
            <h1 className="text-xl mb-6">Template</h1>

            {/* Counter */}
            <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 w-fit mb-8">
              <button
                onClick={() => setCount((c) => c - 1)}
                className="
              h-8 px-2 text-sm rounded-md border
              border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-700
              active:bg-gray-200 dark:active:bg-gray-600
              transition
            "
              >
                −
              </button>

              <div className="min-w-10 text-center text-sm text-gray-800 dark:text-gray-200">
                {count}
              </div>

              <button
                onClick={() => setCount((c) => c + 1)}
                className="
              h-8 px-3 text-sm rounded-md
              bg-black text-white
              dark:bg-white dark:text-black
              hover:opacity-90 active:opacity-80
              transition
            "
              >
                +
              </button>

              <button
                onClick={() => setCount(0)}
                className="
              h-8 px-2 text-sm rounded-md border
              border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-700
              active:bg-gray-200 dark:active:bg-gray-600
              transition
            "
              >
                reset
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 border border-gray-100 rounded-lg">{children}</div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-64 border-l border-gray-200 pl-4 sticky top-6 h-fit">
            <div className="text-xs text-gray-500 mb-2">Route</div>
            <div className="text-sm font-mono break-all">{pathname}</div>
          </aside>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
