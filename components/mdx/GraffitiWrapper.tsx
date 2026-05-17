'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Prism from 'prismjs'

import '@/data/code-formatting'
import { graffitiWords } from '@/data/graffiti'
import { useScroll } from '@/providers/ScrollProvider'

export default function GraffitiWrapper({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)

  const [anchors, setAnchors] = useState<GraffitiAnchor[]>([])
  const { scrollY } = useScroll()

  /**
   * Prism highlighting
   */
  useEffect(() => {
    Prism.highlightAll()
  }, [children])

  /**
   * Build graffiti anchors from rendered MDX articles
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

  return (
    <div className="relative">
      {/* =========================
          GRAFFITI BACKGROUND LAYER
      ========================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
        {anchors.map((a) => {
          const speed = 0.4 + a.drift * 1.6
          const depth = 0.6 + a.opacity

          const parallaxY = scrollY * speed * depth * -1
          const wobble = Math.sin(scrollY * 0.002 + a.left * 0.01) * 5

          return (
            <div
              key={a.id}
              className={`absolute select-none whitespace-nowrap font-black text-on-surface
                ${a.size}
                ${a.color}
              `}
              style={{
                top: a.top,
                left: a.left,
                opacity: a.opacity,
                willChange: 'transform',
                transform: `
                  translate3d(0, ${parallaxY + wobble}px, 0)
                  rotate(${a.rotate}deg)
                `,
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
function buildGraffitiAnchors(root: HTMLElement): GraffitiAnchor[] {
  const articles = root.querySelectorAll('article')
  return Array.from(articles).map((el, i) => {
    const rect = el.getBoundingClientRect()

    const seed = Math.floor(rect.top) * 31 + Math.floor(rect.left) * 17

    const r1 = seededRandom(seed + 11)
    const r2 = seededRandom(seed + 21)
    const r3 = seededRandom(seed + 31)
    const r4 = seededRandom(seed + 41)

    const side = r1 > 0.5 ? 1 : -1

    const center = rect.left + window.scrollX + rect.width / 2
    const maxOffset = rect.width * 0.6 + 120
    // symmetric signed offset
    const direction = r1 < 0.5 ? -1 : 1
    const offset = r2 * maxOffset * direction
    const jitter = (r3 - 0.5) * 30
    const left = center + offset + jitter
    return {
      id: `graffiti-${i}`,

      // preserve original vertical rhythm
      top: rect.top + window.scrollY,
      left,
      text: graffitiWords[i % graffitiWords.length],
      rotate: (r3 - 0.5) * 20,
      drift: 0.02 + r4 * 0.06,
      opacity: 0.15 + r1 * 0.35,
      size: r2 > 0.66 ? 'text-6xl' : r2 > 0.33 ? 'text-4xl' : 'text-2xl',

      color: graffitiColors[Math.floor(r1 * graffitiColors.length)],
    }
  })
}
const graffitiColors = [
  'text-primary',
  'text-secondary',
  'text-tertiary',

  'text-primary/80',
  'text-secondary/80',
  'text-tertiary/80',

  'text-primary-container',
  'text-secondary-container',
  'text-tertiary-container',

  'text-on-surface-variant',
  'text-outline',

  // optional vivid accents
  'text-error',
  'text-error/80',
]
const graffitiColors2 = [
  'text-on-surface/20',
  'text-on-surface/30',
  'text-on-surface-variant/40',

  'text-primary/30',
  'text-primary/40',

  'text-secondary/30',
  'text-secondary/40',

  'text-tertiary/30',
  'text-tertiary/40',
]
type GraffitiAnchor = {
  id: string
  top: number
  left: number
  text: string
  rotate: number
  drift: number
  opacity: number
  size: string
  color: string
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}
