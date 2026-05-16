import { useEffect, useRef, useState } from 'react'

export function useScrollState(el, toc = [], threshold = 40) {
  const ticking = useRef(false)

  const [scrollY, setScrollY] = useState(0)
  const [shrunk, setShrunk] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!el) return

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const scrollTop = el.scrollTop
        const maxScroll = el.scrollHeight - el.clientHeight

        setScrollY(scrollTop)
        setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0)

        setShrunk((prev) => {
          if (!prev && scrollTop > threshold) return true
          if (prev && scrollTop < threshold - 20) return false
          return prev
        })

        ticking.current = false
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })

    // initial sync
    onScroll()

    return () => {
      el.removeEventListener('scroll', onScroll)
    }
  }, [el, toc, threshold])

  // TOC observer
  useEffect(() => {
    if (!el || !toc.length) return

    const elements = toc
      .map((item) => document.getElementById(item.url.replace('#', '')))
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

  return {
    scrollY,
    scrollProgress,
    shrunk,
    activeId,
  }
}
