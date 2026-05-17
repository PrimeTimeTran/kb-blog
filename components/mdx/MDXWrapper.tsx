'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Prism from 'prismjs'

import '@/data/code-formatting'

type GraffitiAnchor = {
  id: string
  top: number
  left: number
  text: string
  rotate: number
  drift: number
  opacity: number
  size: string
}

const WORDS = [
  'BUILD',
  'SHIP',
  'ITERATE',
  'FOCUS',
  'LEARN',
  'SYSTEMS',
  'GRAPH',
  'VECTOR',
  'FLOW',
  'SCROLL',
]

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function buildGraffitiAnchors(root: HTMLElement): GraffitiAnchor[] {
  const headings = root.querySelectorAll('h1, h2')

  return Array.from(headings).map((el, i) => {
    const rect = el.getBoundingClientRect()

    const r1 = seededRandom(i * 11)
    const r2 = seededRandom(i * 21)
    const r3 = seededRandom(i * 31)
    const r4 = seededRandom(i * 41)

    const side = r1 > 0.5 ? 1 : -1

    return {
      id: `graffiti-${i}`,

      // absolute page coordinates
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX + side * (120 + r2 * 140),

      text: WORDS[i % WORDS.length],

      rotate: (r3 - 0.5) * 20,

      drift: 0.02 + r4 * 0.06,

      opacity: 0.15 + r1 * 0.35,

      size: r2 > 0.66 ? 'text-6xl' : r2 > 0.33 ? 'text-4xl' : 'text-2xl',
    }
  })
}

export default function MDXWrapper({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)

  const [anchors, setAnchors] = useState<GraffitiAnchor[]>([])
  const [scrollY, setScrollY] = useState(0)

  /**
   * Prism highlighting
   */
  useEffect(() => {
    Prism.highlightAll()
  }, [children])

  /**
   * Build graffiti anchors from rendered MDX headings
   */
  useLayoutEffect(() => {
    if (!contentRef.current) return

    const update = () => {
      const next = buildGraffitiAnchors(contentRef.current!)
      setAnchors(next)
    }

    update()

    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(contentRef.current)

    window.addEventListener('resize', update)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [children])

  /**
   * Scroll sync
   */
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return

      ticking = true

      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="relative">
      {/* =========================
          GRAFFITI BACKGROUND LAYER
      ========================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
        {anchors.map((a) => {
          const parallaxY = scrollY * a.drift * -1

          return (
            <div
              key={a.id}
              className={`
                absolute
                select-none
                whitespace-nowrap
                font-black
                text-on-surface
                ${a.size}
              `}
              style={{
                top: a.top,
                left: a.left,

                opacity: a.opacity,

                transform: `
                  translate3d(0, ${parallaxY}px, 0)
                  rotate(${a.rotate}deg)
                `,

                willChange: 'transform',
              }}
            >
              {a.text}
            </div>
          )
        })}
      </div>

      {/* =========================
          MAIN MDX CONTENT
      ========================== */}
      <div ref={contentRef} className="mdx-content relative z-10">
        {children}
      </div>
    </div>
  )
}
