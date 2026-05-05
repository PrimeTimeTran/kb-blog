'use client'

import React, { useState, useRef, useEffect } from 'react'

import { images } from '@/data/images'

function LightBox({ images, len }) {
  const mainRef = useRef(null)
  const navLockRef = useRef(false)
  const thumbRef = useRef(null)
  const lightboxRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  useEffect(() => {
    lightboxRef.current = lightboxOpen
  }, [lightboxOpen])

  const next = () => {
    setActiveIndex((i) => (i + 1) % len)
  }
  const prev = () => {
    setActiveIndex((i) => (i - 1 + len) % len)
  }
  const openLightbox = (i) => {
    setActiveIndex(i)
    setLightboxOpen(true)
  }
  const isProgrammaticScroll = useRef(false)

  const step = (dir) => {
    if (navLockRef.current) return

    navLockRef.current = true
    isProgrammaticScroll.current = true

    setActiveIndex((i) => (i + dir + len) % len)

    setTimeout(() => {
      navLockRef.current = false
      isProgrammaticScroll.current = false
    }, 120)
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)

      if (e.key === ' ') {
        e.preventDefault()
        setLightboxOpen((v) => !v)
      }

      if (e.key === 'ArrowUp') setLightboxOpen(true)
      if (e.key === 'ArrowDown') setLightboxOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [len, step])

  useEffect(() => {
    const mainEl = mainRef.current?.children?.[activeIndex]

    if (mainEl) {
      mainEl.scrollIntoView({
        behavior: 'auto',
        inline: 'center',
      })
    }

    const thumb = thumbRef.current?.children?.[activeIndex]
    thumb?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })

    // release lock AFTER frame
    requestAnimationFrame(() => {
      isProgrammaticScroll.current = false
    })
  }, [activeIndex])

  useEffect(() => {
    const container = mainRef.current
    if (!container) return

    const onScroll = () => {
      if (isProgrammaticScroll.current) return

      const children = Array.from(container.children)
      const center = container.scrollLeft + container.offsetWidth / 2

      let closest = 0
      let minDist = Infinity

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const dist = Math.abs(center - childCenter)

        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })

      setActiveIndex(closest)
    }

    container.addEventListener('scroll', onScroll)
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {/* INDEX */}
      <div className="text-xs text-gray-400 mb-2">
        {activeIndex + 1} / {len}
      </div>

      {/* MAIN IMAGE SCROLLER */}
      <div className="w-full max-w-5xl">
        <div ref={mainRef} className="flex overflow-x-auto snap-x snap-mandatory">
          {images.map((img, i) => (
            <div key={i} className="min-w-full snap-center flex flex-col items-center">
              <img
                src={img.original}
                className="max-h-[70vh] object-contain"
                onClick={() => setLightboxOpen(true)}
              />
              <p className="text-sm text-gray-500 mt-3 text-center">{img.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 w-full max-w-5xl">
        <div ref={thumbRef} className="flex gap-2 overflow-x-auto px-4 py-2 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className={`transition-all duration-200 border rounded overflow-hidden
                      ${
                        activeIndex === i
                          ? 'scale-110 opacity-100 ring-2 ring-black shadow-lg'
                          : 'scale-95 opacity-40 hover:scale-105 hover:opacity-80'
                      }
                    `}
            >
              <img src={img.thumbnail || img.original} className="h-14 w-20 object-cover" />
            </button>
          ))}
        </div>
      </div>
      {/* LIGHTBOX */}
      {lightboxOpen && activeIndex !== null && (
        <div
          className={`transition-all duration-300 ${
            lightboxOpen ? 'fixed inset-0 bg-black z-50 flex items-center justify-center' : ''
          }`}
        >
          <button onClick={prev} className="absolute left-4 text-white text-3xl">
            ‹
          </button>

          <img
            src={images[activeIndex].original}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button onClick={next} className="absolute right-4 text-white text-3xl">
            ›
          </button>

          <div className="absolute bottom-6 text-white text-sm opacity-80">
            {images[activeIndex].description}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CenteredGalleryPanel({ className = '' }) {
  const [tab, setTab] = useState('images')
  const len = images.length
  return (
    <div className={`flex flex-col h-full w-full min-h-0 ${className}`}>
      {/* TABS */}
      <div className="shrink-0 flex border-b">
        <button
          onClick={() => setTab('main')}
          className={`px-4 py-2 text-sm ${
            tab === 'main' ? 'border-b-2 border-black font-semibold' : ''
          }`}
        >
          Main
        </button>

        <button
          onClick={() => setTab('images')}
          className={`px-4 py-2 text-sm ${
            tab === 'images' ? 'border-b-2 border-black font-semibold' : ''
          }`}
        >
          Images
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 min-h-0 overflow-auto">
        {tab === 'main' ? (
          <div className="h-full w-full flex items-center justify-center text-center">
            Main Content
          </div>
        ) : (
          <LightBox images={images} len={images.length} />
        )}
      </div>
    </div>
  )
}
