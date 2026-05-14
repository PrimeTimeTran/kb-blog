// layouts/ThreeColumnLayout.tsx
'use client'
import SidebarTree from '../app/kb/SidebarTree'
import { ResizableColumn } from '@/components/layout/ResizableColumn'

export function KBLayout({ tree, children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ResizableColumn side="left" className="h-full">
        <SidebarTree data={tree} />
      </ResizableColumn>
      <div className="flex-1 min-w-0 h-full flex">{children}</div>
    </div>
  )
}
