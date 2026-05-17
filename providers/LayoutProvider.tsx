'use client'

import { createContext, useContext, useState } from 'react'
import { DEFAULT_LEFT, DEFAULT_RIGHT } from '../data/core-constants'
import { Graffiti } from '@/components/Graffiti'
import { AppNavbar } from '@/components/layout/AppNavbar'

const LayoutContext = createContext(null)

export function LayoutProvider({ children }) {
  const [layout, setLayout] = useState({
    left: DEFAULT_LEFT,
    right: DEFAULT_RIGHT,
  })
  return <LayoutContext.Provider value={{ layout, setLayout }}>{children}</LayoutContext.Provider>
  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      <div className="relative min-h-screen overflow-x-hidden bg-surface text-on-surface">
        {/* 1. Background layer */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Graffiti />
        </div>

        {/* 2. App layer */}
        <div className="flex min-h-screen flex-col">
          <AppNavbar />
          <main className="flex-1 min-h-0">{children}</main>
        </div>

        {/* 3. Overlay root (IMPORTANT for drawers/modals) */}
        <div id="overlay-root" />
      </div>
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider')
  return ctx
}
