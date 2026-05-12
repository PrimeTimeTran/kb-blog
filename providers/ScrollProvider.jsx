'use client'
import { createContext, useContext, useRef, useState } from 'react'
import { useScrollState } from '../hooks/useScrollState'

const ScrollContext = createContext(undefined)

export function ScrollProvider({ children }) {
  const [toc, setToc] = useState([])
  const [scrollEl, setScrollEl] = useState(null)

  const { shrunk, activeId, scrollProgress } = useScrollState(scrollEl, toc)

  return (
    <ScrollContext.Provider
      value={{ activeId, shrunk, toc, setToc, scrollEl, setScrollEl, scrollProgress }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const ctx = useContext(ScrollContext)
  if (!ctx) {
    throw new Error('useScroll must be used within ScrollSpyProvider')
  }
  return ctx
}
