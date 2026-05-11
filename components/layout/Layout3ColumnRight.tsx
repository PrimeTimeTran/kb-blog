import { ResizableColumn } from '@/app/kb/ResizableColumn'
import { Layout3ColumnCenter } from './Layout3ColumnCenter'

export async function Layout3ColumnRight({ children, rightCol }) {
  return (
    <div className="flex h-full w-full min-h-0">
      {/* CENTERED MAIN CONTENT */}
      <div className="flex-1 min-w-0 overflow-y-auto no-scrollbar prose dark:prose-invert">
        {children}
      </div>

      {/* RIGHT */}
      <ResizableColumn side="right">
        <div className="h-full shrink-0 overflow-y-auto">{rightCol}</div>
      </ResizableColumn>
    </div>
  )
}
