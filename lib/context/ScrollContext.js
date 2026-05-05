'use client'
import { createContext, useContext } from 'react'

export const ScrollContext = createContext(null)

export function useScroll() {
  return useContext(ScrollContext)
}
