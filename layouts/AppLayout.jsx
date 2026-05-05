'use client'

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  )
}
