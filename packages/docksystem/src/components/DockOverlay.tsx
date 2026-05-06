'use client'

import { JSX, ReactNode, MouseEvent } from 'react'

// 1. Define strict type requirements for the overlay component props
interface DockOverlayProps {
  /** Dictates which edge of the screen the sheet anchors to */
  side: 'left' | 'right'
  /** Controls the active open/hidden visibility state of the overlay panel */
  open: boolean
  /** The width of the container panel (e.g., 280, "320px", "50vw") */
  width: number | string
  /** Triggered when the user clicks the semi-transparent background backdrop overlay */
  onClose: () => void
  /** Triggered when the user initiates a drag resize on the handle bar */
  onResize?: (e: MouseEvent<HTMLDivElement>) => void
  /** Inner layout fragments to render within the scrollable sheet container */
  children: ReactNode
}

export default function DockOverlay({
  side,
  open,
  width,
  onClose,
  onResize,
  children,
}: DockOverlayProps): JSX.Element {
  const isLeft = side === 'left'

  // Standard template literal syntax prevents unnecessary array joining allocations on every state update
  const backdropClasses = `fixed inset-0 bg-black/30 z-40 transition-opacity duration-200 ${
    open ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`

  const panelClasses = `fixed inset-y-0 z-50 flex bg-green-700 transition-transform duration-200 ${
    isLeft ? 'left-0 border-r' : 'right-0 border-l'
  } ${open ? 'translate-x-0' : isLeft ? '-translate-x-full' : 'translate-x-full'}`

  return (
    <>
      {/* BACKDROP */}
      <div className={backdropClasses} onClick={onClose} />

      {/* PANEL */}
      <aside className={panelClasses} style={{ width }}>
        {/* RESIZE HANDLE */}
        {onResize && (
          <div onMouseDown={onResize} className="w-1 cursor-col-resize hover:bg-slate-400" />
        )}

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">{children ? children : 'Hello from Overlay'}</div>
      </aside>
    </>
  )
}
