/**
 * @typedef {Object} DockAPI
 * @property {{ left: any, right: any, overlay: any }} state
 * @property {() => void} toggleLeft
 * @property {() => void} toggleRight
 * @property {() => void} openLeftOverlay
 * @property {() => void} closeLeftOverlay
 * @property {(side: string, width: number) => void} setWidth
 * @property {(name: string, node: any) => void} setSlot
 * @property {(name: string) => any} getSlot
 */

'use client'

import { createContext, useContext, useRef, useState } from 'react'
import { useDockSystem } from './useDockSystem'

const DockContext = createContext(null)

export function DockProvider({ children }) {
  const layout = useDockSystem()

  const slotsRef = useRef({})

  const [, forceRender] = useState(0)

  const setSlot = (name, node) => {
    slotsRef.current[name] = node
    forceRender((x) => x + 1)
  }

  const clearSlot = (name) => {
    delete slotsRef.current[name]
    forceRender((x) => x + 1)
  }

  const getSlot = (name) => slotsRef.current[name]
  const value = {
    ...layout,
    setSlot,
    clearSlot,
    getSlot,
  }
  return <DockContext.Provider value={{ ...value }}>{children}</DockContext.Provider>
}

/** @returns {DockAPI} */
export function useDock() {
  return useContext(DockContext)
}
