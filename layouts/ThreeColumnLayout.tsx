// Note:
// This file is named ThreeColumn layout to communicate intent.
// This layout is designed to work within NextJS AppRouter system.
// In a nutshell, this system:
// - Defines routes
// - Organizes code
// - Differentiates behavior
// In this case, we have a left sidebar which
// shares state between all KB routes. We don't want
// data to be fetched again or for the tree navigation to collapse on click(page change)
// So we utilize layout.tsx convention to fetch data and then compose the UI.
// In this "wrapping" layout, we start our three column layout with the left column
// and then leave the the remaining space for each page to handle.

// layouts/ThreeColumnLayout.tsx
'use client'
import SidebarTree from '../app/kb/SidebarTree'
import { ResizableColumn } from '@/components/layout/ResizableColumn'

export function KBLayout({ tree, children }) {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <ResizableColumn side="left">
        <SidebarTree data={tree} />
      </ResizableColumn>
      <div className="flex-1 min-w-0 h-full flex">{children}</div>
    </div>
  )
}
