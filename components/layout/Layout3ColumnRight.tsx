import { ResizableColumn } from '@/app/kb/ResizableColumn'

export async function Layout3ColumnRight({ children, rightCol }) {
  return (
    <div className="flex h-full w-full min-h-0">
      {/* CENTERED MAIN CONTENT */}
      {children}
      {/* RIGHT */}
      <ResizableColumn side="right">
        <div className="flex flex-1 min-h-0 overflow-hidden">{rightCol}</div>
      </ResizableColumn>
    </div>
  )
}
