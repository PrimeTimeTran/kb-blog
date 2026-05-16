'use client'
import { useRef, useEffect, useState } from 'react'

import '@/data/code-formatting'

export function useMarkerSync() {
  useEffect(() => {
    const onScroll = () => updateMarkers()
    const onResize = () => updateMarkers()

    updateMarkers()

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])
}

type Marker = {
  id: string
  el: HTMLElement
  top: number
  left: number
  width: number
  height: number
}

const markers: Map<string, Marker> = new Map()

export function registerMarker(id: string, el: HTMLElement) {
  const rect = el.getBoundingClientRect()

  markers.set(id, {
    id,
    el,
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  })
}

export function updateMarkers() {
  markers.forEach((marker) => {
    const rect = marker.el.getBoundingClientRect()

    marker.top = rect.top + window.scrollY
    marker.left = rect.left + window.scrollX
    marker.width = rect.width
    marker.height = rect.height
  })
}
export function MarkerOverlay() {
  return (
    <>
      {Array.from(markers.values()).map((m) => (
        <div
          key={m.id}
          style={{
            position: 'fixed',
            top: m.top - window.scrollY - 8,
            left: m.left,
            width: m.width,
            height: 4,
            background: 'red',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}
export default function MDXWrapper({ children }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Prism.highlightAll()
  }, [children])

  useEffect(() => {
    if (!ref.current) return

    const h1s = ref.current.querySelectorAll('h1')

    h1s.forEach((h, i) => {
      registerMarker(`h1-${i}`, h as HTMLElement)
    })

    updateMarkers()
  }, [children])

  useMarkerSync()

  return (
    <div ref={ref} className="mdx-content">
      <MarkerOverlay />
      {children}
    </div>
  )
}
