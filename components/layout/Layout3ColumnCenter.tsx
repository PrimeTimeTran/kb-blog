'use client'

import { useScroll } from '../../providers/ScrollSpyProvider'

export function Layout3ColumnCenter({ children }) {
  const { scrollRef } = useScroll()

  return (
    <div
      ref={scrollRef}
      className="
        flex-1
        min-w-0
        min-h-0
        overflow-y-auto
        no-scrollbar
      "
    >
      {children}
    </div>
  )
}
