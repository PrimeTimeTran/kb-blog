'use client'
import { useEffect, useState } from 'react'

export function useScrollSpy(toc = []) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (!toc.length) return

    const elements = (
      (toc ?? []).map((item) => {
        if (!item?.url) return null
        const id = item.url.replace('#', '')
        return document.getElementById(id)
      }) ?? []
    ).filter(Boolean)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = (entries ?? [])
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(`#${visible[0].target.id}`)
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [toc])

  return activeId
}
