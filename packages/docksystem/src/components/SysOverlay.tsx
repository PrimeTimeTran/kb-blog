'use client'

import { JSX, ReactNode, MouseEvent } from 'react'

type OverlayProps = {
  placement: string
  open: boolean
  width: Number
  height: Number
  onClose: () => void
  onResize: () => void
  children: ReactNode
}
type OverlayPlacement = 'left' | 'right' | 'bottom' | 'center'

type OverlayBehavior =
  | 'singleton' // cmd palette, search
  | 'stack' // inspector panels, chat history
  | 'ephemeral' // toasts
  | 'sequence' // onboarding / tutorial flows
type OverlayOrchestration = {
  dismissable?: boolean
  escapeCloses?: boolean
  backdrop?: boolean
  backdropOpacity?: number
  lockScroll?: boolean

  // important for your "wizard / onboarding" concern
  sequenceGroup?: string
  stepIndex?: number
}
type OverlayInstance = {
  id: string

  // WHERE
  placement: OverlayPlacement

  // HOW IT BEHAVES
  behavior: OverlayBehavior

  // CONTENT
  node: React.ReactNode

  // STATE
  open: boolean

  // SIZE (optional depending on placement)
  size?: {
    width?: number
    height?: number
  }

  // ORCHESTRATION RULES
  config?: OverlayOrchestration
}
export function CenterTestPanel() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="rounded-xl bg-red-500 px-6 py-4 text-white shadow-2xl">CENTER TEST PANEL</div>
    </div>
  )
}

export function CenterTestPanel2({ children }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ background: 'blue', color: 'white', padding: 20 }}>
        ABSOLUTE CENTER TEST{children}
      </div>
    </div>
  )
}

export function SysOverlay({
  placement,
  open,
  width = 400,
  height = 320,
  onClose,
  onResize,
  children,
}: OverlayProps): JSX.Element {
  console.log('SysOverlay children:', children)
  const isSide = placement === 'left' || placement === 'right'
  const isBottom = placement === 'bottom'
  const isCenter = placement === 'center'

  const visible = open

  // return <CenterTestPanel2 children={children} />

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-200
          ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* PANEL */}
      <aside
        className={`
          fixed z-50 flex flex-col bg-zinc-900 text-white shadow-2xl
          border border-white/10
          transition-all duration-200 ease-out
          ${placement === 'left' ? 'left-0 top-0 h-full' : ''}
          ${placement === 'right' ? 'right-0 top-0 h-full' : ''}
          ${placement === 'bottom' ? 'bottom-0 left-0 w-full' : ''}
          ${placement === 'center' ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl' : ''}
          ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          width: isSide || isCenter ? width : undefined,
          height: isBottom || isCenter ? height : undefined,
        }}
      >
        {/* RESIZE HANDLE */}
        {isSide && onResize && (
          <div
            onMouseDown={onResize}
            className={`
              absolute top-0 h-full w-1 cursor-col-resize hover:bg-white/10
              ${placement === 'left' ? 'right-0' : 'left-0'}
            `}
          />
        )}

        {isBottom && onResize && (
          <div onMouseDown={onResize} className="h-1 w-full cursor-row-resize hover:bg-white/10" />
        )}

        {/* CONTENT */}
        <div className="flex h-full flex-col overflow-hidden z-9999">hello world{children}</div>
      </aside>
    </>
  )
}
