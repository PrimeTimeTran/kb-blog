'use client'

import React, { useRef, JSX, MouseEvent } from 'react'
import { DockOverlay } from './DockOverlay'
import { useDock } from '../context/DockProvider'

// 1. Define strict interfaces for the Dock state regions
interface RegionState {
  open: boolean
  width: number | string
}

interface DockContextState {
  state: {
    regions: {
      left: RegionState
      right: RegionState
      leftOverlay: RegionState
      rightOverlay: RegionState
    }
  }
  startResize: (args: { name: 'left' | 'right'; key: 'width' }) => void
  toggle: (name: 'leftOverlay' | 'rightOverlay' | 'left' | 'right') => void
}

// 2. Define props for the DockShell component
interface DockShellProps {
  left?: React.ReactNode
  leftOverlay?: React.ReactNode
  right?: React.ReactNode
  rightOverlay?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DockShell({
  left,
  leftOverlay,
  right,
  rightOverlay,
  children,
  className = '',
}: DockShellProps): JSX.Element {
  // Properly typing the HTMLDivElement for the scroll container
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Cast useDock to our explicit TypeScript definition
  const dock = useDock() as DockContextState

  console.log('SYSTEM LAYOUT RENDER')
  console.log('RIGHT OPEN:', dock.state.regions.right.open)

  const isSingleColumn = !left && !right

  // Mouse event handler properly typed for the resizer bar
  const handleLeftResize = (e: MouseEvent<HTMLDivElement>): void => {
    dock.startResize({ name: 'left', key: 'width' })
  }

  const handleRightResize = (e: MouseEvent<HTMLDivElement>): void => {
    dock.startResize({ name: 'right', key: 'width' })
  }

  return (
    <div className={`flex h-full w-full ${className}`}>
      {/* LEFT DOCK */}
      {!isSingleColumn && (
        <aside
          style={{
            width: dock.state.regions.left.open ? dock.state.regions.left.width : 0,
          }}
          className="w-64 shrink-0 border-r overflow-hidden relative transition-all duration-200"
        >
          {left}
          {dock.state.regions.left.open && (
            <div
              onMouseDown={handleLeftResize}
              className="w-1 cursor-col-resize hover:bg-slate-300"
            />
          )}
        </aside>
      )}

      {/* MAIN */}
      <main
        ref={scrollRef}
        className={`no-scrollbar flex-1 min-w-0 min-h-0 overflow-y-auto ${
          isSingleColumn ? 'px-24' : ''
        }`}
      >
        <div className="max-w-3xl mx-auto px-6">{children}</div>
      </main>

      {/* RIGHT DOCK */}
      {!isSingleColumn && (
        <aside
          style={{
            width: dock.state.regions.right.open ? dock.state.regions.right.width : 0,
          }}
          className="transition-all duration-200 w-80 shrink-0 border-l overflow-hidden relative"
        >
          {dock.state.regions.right.open && (
            <div
              onMouseDown={handleRightResize}
              className="w-1 cursor-col-resize hover:bg-slate-300"
            />
          )}
          {right}
        </aside>
      )}

      {/* OVERLAYS */}
      <DockOverlay
        side="left"
        open={dock.state.regions.leftOverlay.open}
        width={dock.state.regions.leftOverlay.width}
        onClose={() => dock.toggle('leftOverlay')}
      >
        {leftOverlay}
      </DockOverlay>

      <DockOverlay
        side="right"
        open={dock.state.regions.rightOverlay.open}
        width={dock.state.regions.rightOverlay.width}
        onClose={() => dock.toggle('rightOverlay')}
      >
        {rightOverlay}
      </DockOverlay>
    </div>
  )
}
