'use client'
import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { SectionTitle } from './components'
import { BaseScroll } from '@/components/BaseScroll'
import { useThemeStore } from '@/hooks/useThemeStore'
import { useTheme } from 'next-themes'
import type { Theme } from '@/lib/theme/palette'
import { applyMaterialTheme, THEME_VAULT } from '@/lib/theme/palette'

export function Page1() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <BaseScroll>
      <div className="h-full w-full overflow-y-scroll space-y-16 p-8">
        <HoverOverlay active={active} />
        {renderHoverIcons(active, setActive)}
      </div>
    </BaseScroll>
  )
}

export function renderHoverIcons(active, setActive) {
  const items = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <section className="space-y-6 relative">
      <SectionTitle title="Text Animations" />

      {items.map((n) => (
        <div
          key={n}
          onMouseEnter={() => setActive(n)}
          onMouseLeave={() => setActive(null)}
          className={`h-16 flex items-center px-4 rounded cursor-pointer transition ${
            n % 2 === 0 ? 'bg-zinc-200' : 'bg-zinc-400'
          }`}
        >
          Item {n}
        </div>
      ))}

      {/* GLOBAL OVERLAY LAYER */}
      <HoverOverlay active={active} />
    </section>
  )
}

export function HoverOverlay({ active }: { active: number | null }) {
  return (
    // OPTION 1:
    // fixed inset-0:
    // “position this element relative to the viewport and stretch it across the whole screen”
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active}
            className="flex gap-4"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-12 w-12 rounded bg-white shadow-lg flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {active}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Creates per list item hover pops out and hover exit shrinks
export function Page2() {
  return (
    <div className="h-full w-full overflow-y-scroll space-y-16 p-8">
      <SectionTitle title="Text Animations" />
      <HoverList />
    </div>
  )
}
function HoverList() {
  const items = Array.from({ length: 5 }, (_, i) => i + 1)

  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((n) => (
        <HoverItem
          key={n}
          n={n}
          active={hovered === n}
          onEnter={() => setHovered(n)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </div>
  )
}

function HoverItem({
  n,
  active,
  onEnter,
  onLeave,
}: {
  n: number
  active: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative h-16 flex items-center px-4 rounded cursor-pointer transition ${
        n % 2 === 0 ? 'bg-zinc-200' : 'bg-zinc-400'
      }`}
    >
      Item {n}
      {/* BURST ICON GROUP */}
      <div className={`absolute right-6 top-1/2 -translate-y-1/2 flex gap-2 pointer-events-none`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-8 w-8 bg-white rounded shadow transition-all duration-300 ease-out`}
            style={{
              transform: active ? `translateY(-20px) scale(1)` : `translateY(0px) scale(0)`,
              opacity: active ? 1 : 0,
              transitionDelay: active ? `${i * 30}ms` : '0ms',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function Page3({ children }) {
  const { resolvedTheme } = useTheme()
  const { seed, setSeed } = useThemeStore()

  const isDark = resolvedTheme === 'dark'
  const isTransitioningRef = useRef(false)

  const [transition, setTransition] = useState(false)
  const [nextThemeIndex, setNextThemeIndex] = useState<number | null>(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const [snapshotSeed, setSnapshotSeed] = useState<string | null>(null)

  useEffect(() => {
    applyMaterialTheme(seed, isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [seed, isDark])

  const triggerThemeChange = (e: React.MouseEvent) => {
    if (isTransitioningRef.current) return

    isTransitioningRef.current = true

    const nextIndex = (THEME_VAULT.findIndex((t) => t.seed === seed) + 1) % THEME_VAULT.length

    const nextTheme = THEME_VAULT[nextIndex]

    setNextThemeIndex(nextIndex)
    setSnapshotSeed(nextTheme.seed)

    // ✅ EXACT SAME SYSTEM AS YOUR RED DOT
    setOrigin({
      x: e.clientX,
      y: e.clientY,
    })

    setTransition(true)
  }

  const onTransitionEnd = () => {
    if (nextThemeIndex === null) return

    setSeed(THEME_VAULT[nextThemeIndex].seed)

    setNextThemeIndex(null)
    setSnapshotSeed(null)
    setTransition(false)

    isTransitioningRef.current = false
  }

  return (
    <div className="relative w-full h-full" onClick={triggerThemeChange}>
      <div className="relative z-10">{children}</div>

      {/* DEBUG (you can remove later) */}
      <div
        style={{
          position: 'fixed',
          left: origin.x,
          top: origin.y,
          width: 10,
          height: 10,
          borderRadius: 999,
          background: 'red',
          transform: 'translate(-50%, -50%)',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />

      <ThemeExplosion
        active={transition}
        origin={origin}
        color={snapshotSeed ?? seed}
        onDone={onTransitionEnd}
      />
    </div>
  )
}
function ThemeExplosion({ active, origin, color, onDone }: any) {
  useEffect(() => {
    if (!active) return
    const t = setTimeout(onDone, 650)
    return () => clearTimeout(t)
  }, [active, onDone])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: color,

          // ✅ ONE-WAY EXPANSION ONLY
          clipPath: active
            ? `circle(150vmax at ${origin.x}px ${origin.y}px)`
            : `circle(0px at ${origin.x}px ${origin.y}px)`,

          transition: active ? 'clip-path 650ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
        }}
      />
    </div>
  )
}
