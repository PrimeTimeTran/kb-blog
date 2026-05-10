'use client'

import { createContext, useContext, useState } from 'react'

import { useScrollState } from '../hooks/useScrollState'

const ScrollContext = createContext(null)

export function ScrollSpyProvider({ children, scrollRef }) {
  const [toc, setToc] = useState([])
  const { activeId, shrunk } = useScrollState(scrollRef, toc)

  return (
    <ScrollContext.Provider value={{ activeId, shrunk, setToc }}>{children}</ScrollContext.Provider>
  )
}

export function useScroll() {
  return useContext(ScrollContext)
}
