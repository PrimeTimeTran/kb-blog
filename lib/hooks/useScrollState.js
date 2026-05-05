'use client'

import { useEffect, useState } from 'react'

export function useScrollState(ref, toc = [], threshold = 40) {
  const [activeId, setActiveId] = useState(null)
  const [shrunk, setShrunk] = useState(false)

  // SHRINK (scroll-based)
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const onScroll = () => {
      setShrunk(el.scrollTop > threshold)
    }

    onScroll()
    el.addEventListener('scroll', onScroll)

    return () => el.removeEventListener('scroll', onScroll)
  }, [ref, threshold])

  // SCROLLSPY (intersection-based)
  useEffect(() => {
    const root = ref?.current
    if (!root || !toc.length) return

    const elements = toc
      .map((item) => {
        const id = item.url.replace('#', '')
        return document.getElementById(id)
      })
      .filter(Boolean)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) {
          const newId = `#${visible[0].target.id}`
          setActiveId(newId)
        }
      },
      {
        root,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [toc, ref])

  return { activeId, shrunk }
}
