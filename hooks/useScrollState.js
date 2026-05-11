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

    console.log('hi')

    const elements = toc
      .map((item) => {
        const id = item.url.replace('#', '')
        return root.querySelector(`#${id}`)
      })
      .filter(Boolean)

    if (!elements.length) return

    console.log('observer ready')

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) {
          setActiveId(`#${visible[0].target.id}`)
        }

        console.log('IntersectionObserver')
      },
      {
        root,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [toc, ref?.current]) // 🔥 IMPORTANT CHANGE

  return { activeId, shrunk }
}
