'use client'
import clsx from 'clsx'
import { ViewportRail } from './Rail'
import { workspaces } from './WorkspaceList'
import { useWorkspaceViewport } from '@/hooks/useWorkspaceViewport'
import { WorkspaceLayoutProps, WorkspaceViewportProps } from './types'

export default function ShowcasePage() {
  const viewport = useWorkspaceViewport(workspaces[0].id)

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
              // className="absolute inset-0 z-0 pointer-events-auto overflow-hidden"
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
function CornerControls({ viewport }) {
  const { setRailPosition } = viewport

  const buttonClass =
    'absolute z-50 h-10 w-10 rounded-full border border-outline bg-surface text-on-surface shadow-lg backdrop-blur transition hover:scale-105 active:scale-95'

  return (
    <>
      {/* TL → always horizontal top */}
      <button className={clsx(buttonClass, 'top-4 left-4')} onClick={() => setRailPosition('top')}>
        TL
      </button>

      {/* TR → always vertical right */}
      <button
        className={clsx(buttonClass, 'top-4 right-4')}
        onClick={() => setRailPosition('right')}
      >
        TR
      </button>

      {/* BL → always vertical left */}
      <button
        className={clsx(buttonClass, 'bottom-4 left-4')}
        onClick={() => setRailPosition('left')}
      >
        BL
      </button>

      {/* BR → always horizontal bottom */}
      <button
        className={clsx(buttonClass, 'bottom-4 right-4')}
        onClick={() => setRailPosition('bottom')}
      >
        BR
      </button>
    </>
  )
}
