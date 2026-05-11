export function Layout3ColumnCenter({ children, scrollRef }) {
  return (
    <div ref={scrollRef} className="flex h-full w-full min-h-0 overflow-y-auto no-scrollbar">
      {children}
    </div>
  )
}
