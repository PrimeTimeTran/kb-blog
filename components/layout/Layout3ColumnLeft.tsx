import { ResizableColumn } from '@/app/kb/ResizableColumn'

export function Layout3ColumnLeft({ children, leftCol }) {
  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden">
      <ResizableColumn side="left">{leftCol}</ResizableColumn>
      {children}
    </div>
  )
}
