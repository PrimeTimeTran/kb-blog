'use client'
// import { useScroll } from '@/providers/ScrollProvider'

export function CenterRegion({ children }) {
  // const { setScrollEl } = useScroll()

  return (
    <div className="flex-1 min-w-0 min-h-0">
      <div className="w-full max-w-5xl px-3 mx-auto">{children}</div>
    </div>
  )
}
