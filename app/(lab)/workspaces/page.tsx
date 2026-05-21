'use client'
import clsx from 'clsx'
import { workspaces } from './data'
import { ViewportRail } from './Rail'
import { useLongPress, useViewport } from '@/hooks/useViewport'
import { WorkspaceProps, ViewportProps, ViewportControllerProps, RailState } from './types'
import { useState } from 'react'

export default function ShowcasePage() {
  const viewport = useViewport(workspaces[0].id)

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-surface">
      <ViewportController viewport={viewport} />
      <Workspace
        viewport={viewport}
        viewportRail={<ViewportRail items={workspaces} viewport={viewport} />}
      >
        <Viewport workspaces={workspaces} viewport={viewport} />
      </Workspace>
    </div>
  )
}

// Viewport = system
// Workspace = data
// Rail = UI mechanism

export function Workspace({ children, viewport, viewportRail }: WorkspaceProps) {
  const { rail } = viewport

  const anchorClass: Record<RailState['anchor'], string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }

  const sizeClass = viewport.isVertical ? 'top-0 bottom-0 w-64' : 'left-0 right-0 h-32'

  // WIP: Open/Close expand/collapse animation
  // const hidden =
  //   rail.anchor === 'left'
  //     ? '-translate-x-full'
  //     : rail.anchor === 'right'
  //       ? 'translate-x-full'
  //       : rail.anchor === 'top'
  //         ? '-translate-y-full'
  //         : 'translate-y-full'
  return (
    <div className="fixed inset-0 overflow-hidden text-on-background bg-transparent">
      <div className="absolute inset-0 z-0 overflow-y-auto pointer-events-auto">{children}</div>
      <div
        className={clsx(
          'fixed z-10 pointer-events-auto',
          'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          anchorClass[rail.anchor],
          sizeClass,
          rail.open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        {viewportRail}
      </div>
    </div>
  )
}
export function Viewport({ viewport, workspaces }: ViewportProps) {
  const { animateRef, isVertical } = viewport
  const activeId = viewport.previewId ?? viewport.activeId
  const displayIdx = workspaces.findIndex((w) => w.id === activeId)
  const animate = animateRef.current
  const transform = isVertical
    ? `translateY(-${displayIdx * 100}%)`
    : `translateX(-${displayIdx * 100}%)`

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className={clsx(
          'flex h-full will-change-transform',
          animate && 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
        )}
        style={{
          transform,
          flexDirection: isVertical ? 'column' : 'row',
        }}
      >
        {workspaces.map((workspace) => {
          const Component = workspace.component

          return (
            <div
              key={workspace.id}
              style={workspace.theme}
              className="relative h-full w-full shrink-0 overflow-hidden bg-background"
            >
              <Component workspaceId={workspace.id} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
function ViewportController({ viewport }: ViewportControllerProps) {
  const { interactRail, handleLongPress } = viewport

  const tl = useLongPress(() => handleLongPress('tl'))
  const tr = useLongPress(() => handleLongPress('tr'))
  const bl = useLongPress(() => handleLongPress('bl'))
  const br = useLongPress(() => handleLongPress('br'))

  const bind = (anchor: RailState['anchor'], lp) => ({
    ...lp.handlers,

    onClick: () => {
      if (lp.consume()) return
      interactRail(anchor)
    },
  })
  const buttonClass =
    'absolute z-50 h-10 w-10 rounded-full border border-outline bg-surface text-on-surface shadow-lg backdrop-blur transition hover:scale-105 active:scale-95'

  return (
    <>
      <button className={clsx(buttonClass, 'top-4 left-4')} {...bind('tl', tl)}>
        TL
      </button>

      <button className={clsx(buttonClass, 'top-4 right-4')} {...bind('tr', tr)}>
        TR
      </button>

      <button className={clsx(buttonClass, 'bottom-4 left-4')} {...bind('bl', bl)}>
        BL
      </button>

      <button className={clsx(buttonClass, 'bottom-4 right-4')} {...bind('br', br)}>
        BR
      </button>
    </>
  )
}
