'use client'

import { useEffect, useState } from 'react'

export function useScrollState(el, toc = [], threshold = 40) {
  const [shrunk, setShrunk] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Header Shrink/Progress Bar
  useEffect(() => {
    if (!el) return

    const SHRINK_AT = threshold
    const EXPAND_AT = threshold - 20

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrollTop = el.scrollTop
        const height = el.scrollHeight - el.clientHeight

        setScrollProgress(scrollTop / height)

        setShrunk((prev) => {
          if (!prev && scrollTop > SHRINK_AT) return true
          if (prev && scrollTop < EXPAND_AT) return false
          return prev
        })

        ticking = false
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })
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
