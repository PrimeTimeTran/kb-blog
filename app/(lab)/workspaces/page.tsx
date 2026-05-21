'use client'
import clsx from 'clsx'
import React from 'react'
import { ViewportRail } from './components'
import { useWorkspaceViewport } from '@/hooks/useShowcaseViewport'
import { workspaces } from './WorkspaceList'

export default function ShowcasePage() {
  const viewport = useWorkspaceViewport(workspaces[0].id)

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <CornerControls
        setPosition={viewport.setRailPosition}
        setOrientation={viewport.setOrientation}
      />
      <WorkspaceLayout
        viewConfig={viewport}
        rail={
          <ViewportRail
            viewConfig={viewport}
            direction={
              viewport.railPosition === 'left' || viewport.railPosition === 'right'
                ? 'vertical'
                : 'horizontal'
            }
            items={workspaces}
            onSelect={viewport.select}
            onPreview={viewport.preview}
          />
        }
      >
        <WorkspaceViewport
          workspaces={workspaces}
          activeId={viewport.activeId}
          previewId={viewport.previewId}
        />
      </WorkspaceLayout>
    </div>
  )
}
export function WorkspaceLayout({
  children,
  viewConfig,
  rail,
}: {
  children: React.ReactNode
  viewConfig: ReturnType<typeof useWorkspaceViewport>
  rail: React.ReactNode
}) {
  const position = viewConfig.railPosition
  return (
    <div className="fixed inset-0 overflow-hidden text-on-background bg-transparent">
      <div className="absolute inset-0 z-0 overflow-y-auto pointer-events-auto">{children}</div>
      {/* 2. RAILS */}
      {position === 'left' && (
        <div className="fixed top-0 left-0 bottom-0 z-50 w-64 pointer-events-auto">{rail}</div>
      )}
      {position === 'right' && (
        <div className="fixed top-0 right-0 bottom-0 z-50 w-64 pointer-events-auto">{rail}</div>
      )}
      {position === 'top' && (
        <div className="fixed top-0 left-0 right-0 z-50 h-32 pointer-events-auto">{rail}</div>
      )}
      {position === 'bottom' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-32 pointer-events-auto">{rail}</div>
      )}
    </div>
  )
}

export function WorkspaceViewport({ activeId, previewId, workspaces }) {
  const shownId = previewId ?? activeId

  return (
    <div className="relative h-full w-full">
      {workspaces.map((workspace) => {
        const isShown = workspace.id === shownId
        const Component = workspace.component

        return (
          <div
            key={workspace.id}
            style={workspace.theme}
            className={clsx(
              'absolute inset-0 transition-opacity duration-300',
              isShown ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            <Component workspaceId={workspace.id} />
          </div>
        )
      })}
    </div>
  )
}

function CornerControls({
  setPosition,
  setOrientation,
}: {
  setPosition: (p: 'top' | 'right' | 'bottom' | 'left') => void
  setOrientation: (o: 'horizontal' | 'vertical') => void
}) {
  const applyLayout = (position: 'top' | 'right' | 'bottom' | 'left') => {
    setPosition(position)

    setOrientation(position === 'left' || position === 'right' ? 'vertical' : 'horizontal')
  }

  const buttonClass =
    'absolute z-50 h-10 w-10 rounded-full border border-outline bg-surface text-on-surface shadow-lg backdrop-blur transition hover:scale-105 active:scale-95'
  return (
    <>
      {/* TOP LEFT */}
      <button className={clsx(buttonClass, 'top-4 left-4')} onClick={() => applyLayout('top')}>
        TL
      </button>

      {/* TOP RIGHT */}
      {/* <button className={clsx(buttonClass, 'top-4 right-4')} onClick={() => applyLayout('right')}>
        TR
      </button> */}

      {/* BOTTOM RIGHT */}
      <button
        className={clsx(buttonClass, 'bottom-4 right-4')}
        onClick={() => applyLayout('bottom')}
      >
        BR
      </button>

      {/* BOTTOM LEFT */}
      <button className={clsx(buttonClass, 'bottom-4 left-4')} onClick={() => applyLayout('left')}>
        BL
      </button>
    </>
  )
}
