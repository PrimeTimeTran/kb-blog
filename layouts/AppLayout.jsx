'use client'

import Prism from '@/lib/prism'
globalThis.Prism = Prism

export default function AppLayout({ children }) {
  console.log('AppLayout')
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  )
}
