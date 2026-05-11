'use client'
import { createContext, useContext, useRef, useState } from 'react'
import { useScrollState } from '../hooks/useScrollState'

const ScrollContext = createContext(undefined)

export function ScrollSpyProvider({ children }) {
  const scrollRef = useRef(null)
  const [toc, setToc] = useState([])

  const { activeId, shrunk } = useScrollState(scrollRef, toc)

  return (
    <ScrollContext.Provider value={{ activeId, shrunk, toc, setToc, scrollRef }}>
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
