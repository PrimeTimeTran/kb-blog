import { ResizableColumn } from '@/app/kb/ResizableColumn'
import { Layout3ColumnCenter } from './Layout3ColumnCenter'

export async function Layout3ColumnRight({ children, rightCol }) {
  return (
    <div className="flex h-full w-full min-h-0">
      {/* CENTERED MAIN CONTENT */}
      {children}
      {/* RIGHT */}
      <ResizableColumn side="right">
        <div className="h-full shrink-0 overflow-y-auto">{rightCol}</div>
      </ResizableColumn>
    </div>
  )
}
