'use client'

import TableOfContents from '../../../components/TableOfContents'
import { ResizableColumn } from '../ResizableColumn'

// Note:
export function PageClient({ children, toc }) {
  return (
    <div className="flex h-full min-h-0 w-full">
      {/* CENTER CONTENT */}
      <div className="flex-1 min-w-0 min-h-0 overflow-y-auto no-scrollbar">
        <div className="prose dark:prose-invert mx-16">{children}</div>
      </div>

      <ResizableColumn side="right">
        <TableOfContents toc={toc} />
      </ResizableColumn>
    </div>
  )
}
