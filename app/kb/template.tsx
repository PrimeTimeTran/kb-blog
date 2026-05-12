'use client'
import { ResizableColumn } from '../../components/layout/ResizableColumn'
import TableOfContents from '@/components/TableOfContents'
import { CenterRegion } from '@/components/layout/CenterRegion'

export default function Template({ children, toc }) {
  return (
    <div className="flex h-full w-full min-h-0">
      <CenterRegion>{children}</CenterRegion>
      {toc && (
        <ResizableColumn side="right">
          <TableOfContents toc={toc} />
        </ResizableColumn>
      )}
    </div>
  )
}
