'use client'
import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { RibbonItem, ViewportRail } from './components'
import { useWorkspaceViewport } from '@/hooks/useWorkspaceViewport'
import { WorkspaceLayoutProps, WorkspaceViewportProps } from './types'
import { workspaces } from './workspaces'

export default function ShowcasePage() {
  const viewport = useWorkspaceViewport(workspaces[0].id)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-on-background">
      {/* LAYER 1: VIEWPORT */}
      <div className="absolute inset-0 z-0">
        <WorkspaceViewport
          workspaces={workspaces}
          activeId={viewport.activeId}
          previewId={viewport.previewId}
        />
      </div>

      {/* LAYER 2: LAYOUT (rails) */}
      <div className="absolute inset-0 z-10">
        <WorkspaceLayout
          viewConfig={viewport}
          rail={
            <ViewportRail
              items={workspaces}
              activeId={viewport.activeId}
              onSelect={viewport.select}
              previewId={viewport.previewId}
              onPreview={viewport.preview}
            />
          }
        >
          {/* empty — viewport is already separate layer */}
          <div />
        </WorkspaceLayout>
      </div>
    </div>
  )
}
export function WorkspaceViewport({ activeId, previewId, workspaces }: WorkspaceViewportProps) {
  const shownId = previewId ?? activeId

  return (
    <div className="absolute inset-0 transition-opacity">
      {/* <div className="absolute inset-0 z-0"> */}
      {workspaces.map((workspace) => {
        const isShown = workspace.id === shownId
        const Component = workspace.component

        return (
          <div
            key={workspace.id}
            style={workspace.theme}
            className={clsx(
              'absolute inset-0 transition-opacity duration-300',
              isShown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
          >
            <div className="absolute inset-0 z-0">
              <Component workspaceId={workspace.id} />
            </div>
          </div>
        )
      })}
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
    <div className="relative flex h-full flex-col">
      {position === 'top' && (
        <div className="h-24 w-full bg-blue-500 flex items-center justify-center text-white border-b border-black/20">
          TOP RAIL
        </div>
      )}

      <div className="flex flex-1 min-h-0 min-w-0">
        {/* LEFT */}
        {position === 'left' && (
          <div className="w-64 bg-green-500 flex items-center justify-center text-white">
            LEFT RAIL
          </div>
        )}

        {/* CONTENT */}
        <div className="flex flex-1 min-h-0">{children}</div>

        {/* RIGHT */}
        {position === 'right' && (
          <div className="w-64 bg-yellow-500 flex items-center justify-center text-black">
            RIGHT RAIL
          </div>
        )}
      </div>

      {/* BOTTOM */}
      {position === 'bottom' && (
        <div className="h-24 w-full bg-purple-500 flex items-center justify-center text-white">
          BOTTOM RAIL
        </div>
      )}
    </div>
  )
}
export function WorkspaceLayoutToolbar({
  position,
  setPosition,
}: {
  position: 'top' | 'bottom' | 'left' | 'right'
  setPosition: (p: 'top' | 'bottom' | 'left' | 'right') => void
}) {
  const positions = ['top', 'right', 'bottom', 'left'] as const

  return (
    <div className="h-full w-full bg-black/5 dark:bg-white/5 flex flex-col gap-2 p-2 text-xs">
      <div className="font-semibold opacity-70">Layout Debug</div>

      {positions.map((p) => (
        <button
          key={p}
          onClick={() => setPosition(p)}
          className={
            'rounded px-2 py-1 text-left transition-all ' +
            (p === position
              ? 'bg-[var(--primary)] text-white'
              : 'hover:bg-black/10 dark:hover:bg-white/10')
          }
        >
          {p.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
// export function WorkspaceLayout({
//   children,
//   viewConfig,
//   rail,
// }: {
//   children: React.ReactNode
//   viewConfig: ReturnType<typeof useWorkspaceViewport>
//   rail: React.ReactNode
// }) {
//   const position = viewConfig.railPosition
//   const setPosition = viewConfig.setRailPosition

//   const Toolbar = <WorkspaceLayoutToolbar position={position} setPosition={setPosition} />

//   const RailWithOptionalToolbar = ({
//     direction,
//     className,
//   }: {
//     direction: 'horizontal' | 'vertical'
//     className?: string
//   }) => {
//     if (direction === 'horizontal') {
//       return (
//         <div className={`flex w-full shrink-0 border-black/10 ${className ?? ''}`}>
//           <div className="flex-1 min-w-0">{rail}</div>
//           <div className="w-48 border-l border-black/10">{Toolbar}</div>
//         </div>
//       )
//     }

//     return (
//       <div className={`flex h-full shrink-0 flex-col border-black/10 ${className ?? ''}`}>
//         <div className="flex-1 min-h-0">{rail}</div>
//         <div className="h-40 border-t border-black/10">{Toolbar}</div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex h-full min-h-0 flex-col border-2 border-red-500">
//       {/* TOP */}
//       {position === 'top' && <WorkspaceLayoutToolbar direction="horizontal" className="border-b" />}

//       {/* MIDDLE */}
//       <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
//         {/* LEFT */}
//         {position === 'left' && (
//           <aside className="flex w-64 shrink-0 border-r">
//             <WorkspaceLayoutToolbar direction="vertical" />
//           </aside>
//         )}

//         {/* CONTENT */}
//         <main className="flex-1 min-w-0 min-h-0 overflow-hidden">{children}</main>

//         {/* RIGHT */}
//         {position === 'right' && (
//           <aside className="flex w-64 shrink-0 border-l">
//             <WorkspaceLayoutToolbar direction="vertical" />
//           </aside>
//         )}
//       </div>

//       {/* BOTTOM */}
//       {position === 'bottom' && (
//         <WorkspaceLayoutToolbar direction="horizontal" className="border-t" />
//       )}
//     </div>
//   )
// }
// export function WorkspaceLayout({
//   children,
//   viewConfig,
//   rail,
// }: {
//   children: React.ReactNode
//   viewConfig: ReturnType<typeof useWorkspaceViewport>
//   rail: React.ReactNode
// }) {
//   const position = viewConfig.railPosition
//   const setPosition = viewConfig.setRailPosition

//   const Toolbar = <WorkspaceLayoutToolbar position={position} setPosition={setPosition} />

//   const renderRail = () => rail

//   return (
//     <div className="flex h-full min-h-0 flex-col border-2 border-red-500">
//       {position === 'top' && (
//         <div className="flex shrink-0 border-b border-black/10">
//           <div className="flex-1">{renderRail()}</div>
//           <div className="w-48 border-l border-black/10">{Toolbar}</div>
//         </div>
//       )}

//       {/* MIDDLE ROW */}
//       <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
//         {position === 'left' && (
//           <aside className="flex shrink-0 border-r border-black/10 flex-col">
//             <div className="flex-1">{renderRail()}</div>
//             <div className="h-40 border-t border-black/10">{Toolbar}</div>
//           </aside>
//         )}

//         <main className="flex-1 min-w-0 min-h-0 overflow-hidden">{children}</main>

//         {position === 'right' && (
//           <aside className="flex shrink-0 border-l border-black/10 flex-col">
//             <div className="flex-1">{renderRail()}</div>
//             <div className="h-40 border-t border-black/10">{Toolbar}</div>
//           </aside>
//         )}
//       </div>

//       {position === 'bottom' && (
//         <div className="flex shrink-0 border-t border-black/10">
//           <div className="flex-1">{renderRail()}</div>
//           <div className="w-48 border-l border-black/10">{Toolbar}</div>
//         </div>
//       )}
//     </div>
//   )
// }
// export function WorkspaceLayoutToolbar({
//   position,
//   setPosition,
// }: {
//   position: 'top' | 'bottom' | 'left' | 'right'
//   setPosition: (p: 'top' | 'bottom' | 'left' | 'right') => void
// }) {
//   const positions = ['top', 'right', 'bottom', 'left'] as const

//   return (
//     <div className="h-full w-full bg-black/5 dark:bg-white/5 flex flex-col gap-2 p-2 text-xs">
//       <div className="font-semibold opacity-70">Layout Debug</div>

//       {positions.map((p) => (
//         <button
//           key={p}
//           onClick={() => setPosition(p)}
//           className={
//             'rounded px-2 py-1 text-left transition-all ' +
//             (p === position
//               ? 'bg-[var(--primary)] text-white'
//               : 'hover:bg-black/10 dark:hover:bg-white/10')
//           }
//         >
//           {p.toUpperCase()}
//         </button>
//       ))}
//     </div>
//   )
// }
