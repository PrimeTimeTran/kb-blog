'use client'

import { ResizableColumn } from '@/components/layout/ResizableColumn'
import { useScroll } from '@/providers/ScrollProvider'

/* ─────────────────────────────
   LEFT
───────────────────────────── */
export function Layout3ColumnLeft({ children, leftCol }) {
  return (
    <div className="h-full flex min-h-0 overflow-hidden">
      <ResizableColumn side="left">
        <div className="h-full w-full overflow-hidden">{leftCol}</div>
      </ResizableColumn>

      {children}
    </div>
  )
}

/* ─────────────────────────────
   RIGHT (TOC)
───────────────────────────── */
export function Layout3ColumnRight({ children, rightCol }) {
  return (
    <div className="h-full flex w-full min-h-0 overflow-hidden">
      {children}

      <ResizableColumn side="right">
        <div className="h-full w-full overflow-hidden">{rightCol}</div>
      </ResizableColumn>
    </div>
  )
}

/* ─────────────────────────────
   CENTER (ONLY SCROLL ROOT)
───────────────────────────── */
export function Layout3ColumnCenter({ children }) {
  const { setScrollEl } = useScroll()

  return (
    <div
      ref={setScrollEl}
      data-scroll-root
      className="
        flex-1
        min-w-0
        min-h-0
        overflow-y-auto
        no-scrollbar
      "
    >
      {children}
    </div>
  )
}

// export function ScrollContainer({ children }) {
//   const { scrollRef } = useScrollSpy()

//   return (
//     <div
//       ref={scrollRef}
//       data-scroll-root
//       className="
//         flex-1
//         min-w-0
//         min-h-0
//         overflow-y-auto
//         no-scrollbar
//       "
//     >
//       {children}
//     </div>
//   )
// }
