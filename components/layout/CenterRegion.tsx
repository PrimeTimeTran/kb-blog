'use client'
import { useScroll } from '@/providers/ScrollProvider'

export function CenterRegion({ children }) {
  const { setScrollEl } = useScroll()

  return (
    <div ref={setScrollEl} className="flex-1 min-w-0 min-h-0 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-5xl px-3 mx-auto">{children}</div>
    </div>
  )
}
