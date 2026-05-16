'use client'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { RibbonItem, ViewportRail } from './components'
import { useWorkspaceViewport } from '@/hooks/useWorkspaceViewport'
import { WorkspaceLayoutProps } from './types'
import { workspaces } from './workspaces'
export default function ShowcasePage() {
  const viewport = useWorkspaceViewport(workspaces[0].id)

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-on-background">
      <WorkspaceLayout
        viewConfig={viewport}
        viewportRail={
          <ViewportRail
            items={workspaces}
            activeId={viewport.activeId}
            onSelect={viewport.select}
            previewId={viewport.previewId}
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
export function WorkspaceViewport({ activeId, previewId, workspaces }: WorkspaceViewportProps) {
  const shownId = previewId ?? activeId

  return (
    <div className="absolute inset-0 overflow-hidden">
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
            <div className="h-full overflow-y-auto bg-[var(--background)] text-[var(--on-background)]">
              <Component workspaceId={workspace.id} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export function WorkspaceLayout({ children, viewConfig, viewportRail }: WorkspaceLayoutProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {viewConfig?.railPosition == 'top' && viewportRail}

      <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
        {viewConfig?.railPosition == 'left' && (
          <aside className="flex-shrink-0">{viewportRail}</aside>
        )}

        <main className="flex-1 min-w-0 min-h-0 overflow-hidden">{children}</main>

        {viewConfig?.railPosition == 'right' && (
          <aside className="flex-shrink-0">{viewportRail}</aside>
        )}
      </div>

      {viewConfig?.railPosition == 'bottom' && viewportRail}
    </div>
  )
}
