'use client'
import { AppFooter } from '@/components/layout/AppFooter'
import { AppShell } from '@/components/layout/AppShell'
import { useScroll } from '@/providers/ScrollProvider'

export function ScrollContainer({ children }) {
  const { setScrollEl } = useScroll()

  return (
    <div ref={setScrollEl} className="flex-1 overflow-y-auto">
      {children}
    </div>
  )
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="h-full flex flex-col">
        <div className="h-full flex flex-col">
          <AppShell>
            <main className="flex-1">
              <ScrollContainer>{children} </ScrollContainer>
            </main>
          </AppShell>
        </div>
      </body>
    </html>
  )
}

// export function Page() {
//   return (
//     <div className="w-full flex flex-col gap-6">
//       {/* page content */}
//     </div>
//   )
// }
