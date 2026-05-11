'use client'

import { useScroll } from '../../providers/ScrollSpyProvider'

export function Layout3ColumnCenter({ children }) {
  console.log('CENTER MOUNT')
  const { scrollRef } = useScroll()

  return (
    <div
      ref={scrollRef}
      className="flex-1 min-w-0 h-full overflow-y-auto no-scrollbar prose dark:prose-invert"
    >
      {children}
    </div>
  )
}
