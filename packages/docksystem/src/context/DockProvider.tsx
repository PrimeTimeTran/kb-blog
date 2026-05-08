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
import { useSys } from './useSys'
import { SystemContextType } from '../system.types'

export const DockContext = createContext<SystemContextType | null>(null)

interface DockProviderProps {
  children: ReactNode
}

export function DockProvider({ children }: DockProviderProps): JSX.Element {
  const layout = useSys()
  const slotsRef = useRef<Record<string, ReactNode>>({})
  const [, forceRender] = useState(0)
  const setSlot = useCallback((name: string, node: ReactNode) => {
    const prev = slotsRef.current[name]
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

  const contextValue = useMemo<SystemContextType>(
    () => ({
      state: layout.state,
      toggle: layout.toggle,
      setOverlay: layout.setOverlay,
      startResize: layout.startResize,
      setSlot,
      clearSlot,
      getSlot,
      layers: layout.layers,
      layer: {
        toggle: layout.toggle,
        register: layout.register,
        toggle: layout.toggleLayer,
      },
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

export function useDock(): SystemContextType {
  const context = useContext(DockContext)
  if (!context) {
    throw new Error('useDock must be used within a DockProvider')
  }
  return context
}
