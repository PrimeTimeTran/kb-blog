'use client'

import KBSidebar from './KBSidebar'
import { ResizableColumn } from './ResizableColumn'

export default function LayoutClient({ data, children }) {
  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden">
      {/* LEFT */}
      <ResizableColumn side="left">
        <KBSidebar data={data} />
      </ResizableColumn>

      {/* CENTER (route-owned content) */}
      <div className="flex-1 min-w-0 min-h-0 overflow-y-auto p-3">{children}</div>
    </div>
  )
}
