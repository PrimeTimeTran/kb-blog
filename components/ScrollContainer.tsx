'use client'
import { useScroll } from '@/providers/ScrollProvider'

export function ScrollContainer({ children }) {
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
        scroll-smooth
        no-scrollbar
      "
      // Prevents layout shift on TOC click
      style={{ contain: 'layout paint' }}
    >
      {children}
    </div>
  )
}
