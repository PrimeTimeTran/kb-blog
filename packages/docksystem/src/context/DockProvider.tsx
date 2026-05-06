'use client'

import { createContext, useContext, useRef, useState, useMemo, JSX, ReactNode } from 'react'
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
  const layout = useDockSystem()
  const slotsRef = useRef<Record<string, ReactNode>>({})
  const [, forceRender] = useState<number>(0)

  // 1. Keep functions stable with useCallback definitions or stable closures
  const setSlot = useMemo(
    () =>
      (name: string, node: ReactNode): void => {
        // Only update and trigger a re-render if the slot content actually changed
        if (slotsRef.current[name] !== node) {
          slotsRef.current[name] = node
          forceRender((x) => x + 1)
        }
      },
    []
  )

  const clearSlot = useMemo(
    () =>
      (name: string): void => {
        if (name in slotsRef.current) {
          delete slotsRef.current[name]
          forceRender((x) => x + 1)
        }
      },
    []
  )

  const getSlot = useMemo(
    () =>
      (name: string): ReactNode | undefined => {
        return slotsRef.current[name]
      },
    []
  )

  // 2. CRITICAL: Memoize the final context value!
  // This object will ONLY change if the layout state itself changes,
  // breaking the infinite re-render loop completely.
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

  return <DockContext.Provider value={contextValue}>{children}</DockContext.Provider>
}

export function useDock(): DockContextType {
  const context = useContext(DockContext)
  if (!context) {
    throw new Error('useDock must be used within a DockProvider')
  }
  return context
}
