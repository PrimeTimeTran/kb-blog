'use client'

import React, { useRef, JSX, MouseEvent } from 'react'
import { useDock } from '../context/DockProvider'
import { SysOverlay } from './SysOverlay'
import { SysOverlays } from './SysOverlays'

import { type OverlayInstance } from '../system.types'

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

export function DockShell({ left, right, children, className = '' }: DockShellProps): JSX.Element {
  // Properly typing the HTMLDivElement for the scroll container
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Cast useDock to our explicit TypeScript definition
  const dock = useDock() as DockContextState

  console.log('SYSTEM LAYOUT RENDER')

  const isSingleColumn = !left && !right

  // Mouse event handler properly typed for the resizer bar
  const handleLeftResize = (e: MouseEvent<HTMLDivElement>): void => {
    dock.startResize({ name: 'left', key: 'width' })
  }

  const handleRightResize = (e: MouseEvent<HTMLDivElement>): void => {
    dock.startResize({ name: 'right', key: 'width' })
  }

  return (
    <div id="sys-shell-root" className="flex h-full w-full">
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
      <main ref={scrollRef} className={`no-scrollbar flex-1 min-w-0 min-h-0 overflow-y-auto`}>
        {children}
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
    </div>
  )
}
