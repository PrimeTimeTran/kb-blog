'use client'

import { useScroll } from '@/providers/ScrollProvider'

export function BaseScroll({ children }) {
  const { setScrollEl } = useScroll()

  return (
    <div
      id="scroll-container"
      ref={setScrollEl}
      data-scroll-root
      className="  flex-1  min-w-0  overflow-y-auto scroll-smooth"
      // style={{ contain: 'layout paint' }}
    >
      {children}
    </div>
  )
}
