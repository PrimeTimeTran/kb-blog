'use client'

import {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  JSX,
  ReactNode,
  useCallback,
  useEffect,
} from 'react'
import { useDockSystem } from './useDockSystem'

interface DockSystemLayout {
  state: any
  startResize: (args: { name: string; key: 'width' | 'height' }) => void
  toggle: (name: string) => void
  setOverlay: (active: string | null) => void
}

interface DockContextType extends DockSystemLayout {
  setSlot: (name: string, node: ReactNode) => void
  clearSlot: (name: string) => void
  getSlot: (name: string) => ReactNode | undefined
}

export const DockContext = createContext<DockContextType | null>(null)

interface DockProviderProps {
  children: ReactNode
}

export function DockProvider({ children }: DockProviderProps): JSX.Element {
  console.log('DockProvider')
  const layout = useDockSystem()
  const slotsRef = useRef<Record<string, ReactNode>>({})
  const [, forceRender] = useState(0)

  // 1. Keep functions stable with useCallback definitions or stable closures
  const setSlot = useCallback((name: string, node: ReactNode) => {
    const prev = slotsRef.current[name]

    // shallow guard (optional but useful)
    if (prev === node) return

    slotsRef.current[name] = node
    forceRender((x) => x + 1)
  }, [])

  const clearSlot = useCallback((name: string) => {
    if (!(name in slotsRef.current)) return

    delete slotsRef.current[name]
    forceRender((x) => x + 1)
  }, [])

  const getSlot = useCallback((name: string): ReactNode | undefined => {
    return slotsRef.current[name]
  }, [])

  const contextValue = useMemo<DockContextType>(
    () => ({
      state: layout.state,
      startResize: layout.startResize,
      toggle: layout.toggle,
      setOverlay: layout.setOverlay,
      setSlot,
      clearSlot,
      getSlot,
    }),
    [
      layout.state,
      layout.startResize,
      layout.toggle,
      layout.setOverlay,
      setSlot,
      clearSlot,
      getSlot,
    ]
  )

  useEffect(() => {
    console.log('DOCK PROVIDER MOUNTED')
  }, [])

  return <DockContext.Provider value={contextValue}>{children}</DockContext.Provider>
}

export function useDock(): DockContextType {
  const context = useContext(DockContext)
  if (!context) {
    throw new Error('useDock must be used within a DockProvider')
  }
  return context
}
