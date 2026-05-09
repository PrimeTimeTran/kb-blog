'use client'

import { useShellCounter } from './useShellCounter'
import { CounterControls } from './CounterControls'

export default function Layout({ children }) {
  const counter = useShellCounter()

  return (
    <div className="grid grid-cols-[240px_1fr_240px] min-h-screen">
      {/* LEFT */}
      <aside className="border-r border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-gray-800 dark:text-gray-200 mb-4">Left</h2>

        <CounterControls {...counter} />
      </aside>

      {/* CENTER */}
      <div className="flex justify-center px-6 py-10">
        <div className="w-full max-w-5xl grid grid-cols-[1fr_240px] gap-8">{children}</div>
      </div>

      {/* RIGHT PLACEHOLDER */}
      <aside />
    </div>
  )
}
