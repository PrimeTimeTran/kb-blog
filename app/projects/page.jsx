'use client'
import React, { useState, useRef, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'

// import PhotoSwipeLightbox from 'photoswipe/lightbox'
// import 'photoswipe/style.css'
// https://www.embla-carousel.com/docs/examples/predefined#default
const images = [
  {
    thumbnail: '/static/images/img1.jpg',
    original: '/static/images/img1.jpg',
    width: 1600,
    height: 1067,
    description: 'Mountain at sunrise',
  },
  {
    thumbnail: '/static/images/img2.avif',
    original: '/static/images/img2.avif',
    width: 1600,
    height: 900,
    description: 'Ocean view',
  },
  {
    thumbnail: '/static/images/img3.avif',
    original: '/static/images/img3.avif',
    width: 1400,
    height: 933,
    description: 'Forest path',
  },
]

export default function Page() {
  const [tab, setTab] = useState('images')
  const galleryRef = useRef()

  useEffect(() => {
    if (tab !== 'images') return
    if (!galleryRef.current) return
  }, [tab])

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Tabs */}
      <div className="flex border-b bg-white">
        <button
          onClick={() => setTab('main')}
          className={`px-4 py-2 ${tab === 'main' ? 'border-b-2 border-black' : ''}`}
        >
          Main
        </button>

        <button
          onClick={() => setTab('images')}
          className={`px-4 py-2 ${tab === 'images' ? 'border-b-2 border-black' : ''}`}
        >
          Images
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {tab === 'main' && (
          <div>
            <h1 className="text-xl font-semibold">Main Content</h1>
            <p className="text-gray-600 mt-2">Switch to Images tab to open PhotoSwipe gallery.</p>
          </div>
        )}

        {tab === 'images' && (
          <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <ImageGallery
                ref={galleryRef}
                items={images}
                renderItem={(item) => (
                  <div className="flex flex-col items-center">
                    <img src={item.original} />
                    <div className="mt-2 text-sm text-gray-600">{item.description}</div>
                  </div>
                )}
                showThumbnails={true}
                onSlide={(index) => console.log('Slid to', index)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
