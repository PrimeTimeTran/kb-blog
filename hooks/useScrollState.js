'use client'

import { useEffect, useState } from 'react'

export function useScrollState(el, toc = [], threshold = 40) {
  const [shrunk, setShrunk] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Header Shrink/Progress Bar
  useEffect(() => {
    if (!el) return

    const onScroll = () => {
      const scrollTop = el.scrollTop
      const height = el.scrollHeight - el.clientHeight
      setScrollProgress(scrollTop / height)
      setShrunk(scrollTop > threshold)
    }

    el.addEventListener('scroll', onScroll)
    onScroll()

    return () => el.removeEventListener('scroll', onScroll)
  }, [el, threshold])

  // Highlight Table of Contents
  useEffect(() => {
    if (!el || !toc.length) return

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
          setActiveId(`#${visible[0].target.id}`)
        }
      },
      {
        root: el,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    )

    elements.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [el, toc])

  return { activeId, shrunk, scrollProgress }
}
