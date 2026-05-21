'use client'
import clsx from 'clsx'
import { ViewportRail } from './Rail'
import { workspaces } from './WorkspaceList'
import { useLongPress, useViewport } from '@/hooks/useViewport'
import { ControlOverlay, WorkspaceLayoutProps, WorkspaceViewportProps } from './types'

export default function ShowcasePage() {
  const viewport = useViewport(workspaces[0].id)

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-surface">
      <CornerControls viewport={viewport} />
      <WorkspaceLayout
        viewport={viewport}
        rail={<ViewportRail items={workspaces} viewport={viewport} />}
      >
        <WorkspaceViewport workspaces={workspaces} viewport={viewport} />
      </WorkspaceLayout>
    </div>
  )
}
export function WorkspaceLayout({ children, viewport, rail }: WorkspaceLayoutProps) {
  const position = viewport.railPosition
  return (
    <div className="fixed inset-0 overflow-hidden text-on-background bg-transparent">
      <div className="absolute inset-0 z-0 overflow-y-auto pointer-events-auto">{children}</div>

      {/* SINGLE RAIL CONTAINER */}
      <div
        className={clsx(
          'fixed z-50 pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          viewport.orientation === 'vertical' ? 'top-0 bottom-0 w-64' : 'left-0 right-0 h-32',
          position === 'left' && 'left-0 translate-x-0',
          position === 'right' && 'right-0 translate-x-0',
          position === 'top' && 'top-0 translate-y-0',
          position === 'bottom' && 'bottom-0 translate-y-0'
        )}
      >
        {rail}
      </div>
    </div>
  )
}
export function WorkspaceViewport({ viewport, workspaces }: WorkspaceViewportProps) {
  const isVertical = viewport.orientation === 'vertical'
  const shownId = viewport.previewId ?? viewport.activeId
  const shownIndex = workspaces.findIndex((w) => w.id === shownId)

  const transform = isVertical
    ? `translateY(-${shownIndex * 100}%)`
    : `translateX(-${shownIndex * 100}%)`

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
              className="relative h-full w-full shrink-0 overflow-hidden bg-background"
              style={workspace.theme}
            >
              <Component workspaceId={workspace.id} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
function CornerControls({ viewport }: ControlOverlay) {
  const { interactRail, handleRailLongPress } = viewport

  const buttonClass =
    'absolute z-50 h-10 w-10 rounded-full border border-outline bg-surface text-on-surface shadow-lg backdrop-blur transition hover:scale-105 active:scale-95'

  const tl = useLongPress(() => handleRailLongPress('tl'))
  const tr = useLongPress(() => handleRailLongPress('tr'))
  const bl = useLongPress(() => handleRailLongPress('bl'))
  const br = useLongPress(() => handleRailLongPress('br'))

  const bind = (anchor, lp) => ({
    ...lp.handlers,
    onClick: () => {
      if (lp.shouldSuppressClick()) return
      interactRail(anchor)
    },
  })

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
