'use client'

import { ResizableColumn } from '@/app/kb/ResizableColumn'

import { useScroll } from '@/providers/ScrollSpyProvider'

export function Layout3ColumnLeft({ children, leftCol }) {
  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      <ResizableColumn side="left">
        <div className="h-full min-h-0 overflow-y-auto no-scrollbar">{leftCol}</div>
      </ResizableColumn>

      {children}
    </div>
  )
}

export function Layout3ColumnRight({ children, rightCol }) {
  return (
    <div className="flex h-full w-full min-h-0">
      {children}

      <ResizableColumn side="right">
        <div className="h-full min-h-0 overflow-y-auto">{rightCol}</div>
      </ResizableColumn>
    </div>
  )
}

export function Layout3ColumnCenter({ children }) {
  const { setScrollEl } = useScroll()

  return (
    <div
      ref={setScrollEl}
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
