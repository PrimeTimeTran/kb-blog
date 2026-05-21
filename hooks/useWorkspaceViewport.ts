import { useState, useCallback } from 'react'

export type RailAnchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export function toggleVertical(anchor: RailAnchor): RailAnchor {
  switch (anchor) {
    case 'top-left':
      return 'bottom-left'
    case 'top-right':
      return 'bottom-right'
    case 'bottom-left':
      return 'top-left'
    case 'bottom-right':
      return 'top-right'
  }
}

export function toggleHorizontal(anchor: RailAnchor): RailAnchor {
  switch (anchor) {
    case 'top-left':
      return 'top-right'
    case 'top-right':
      return 'top-left'
    case 'bottom-left':
      return 'bottom-right'
    case 'bottom-right':
      return 'bottom-left'
  }
}

export function useWorkspaceViewport(initialId: WorkspaceId): WorkspaceViewportAPI {
  const [activeId, setActiveId] = useState<WorkspaceId>(initialId)

  const [previewId, setPreviewId] = useState<WorkspaceId | null>(null)

  const [railPosition, setRailPosition] = useState<RailPosition>('right')

  const [navigationMode, setNavigationMode] = useState<WorkspaceNavigationMode>('idle')

  // DERIVED (not state)
  const orientation: Orientation =
    railPosition === 'left' || railPosition === 'right' ? 'vertical' : 'horizontal'

  const select = useCallback((id: WorkspaceId) => {
    setActiveId(id)
    setPreviewId(null)
    setNavigationMode('select')
  }, [])

  const preview = useCallback((id: WorkspaceId | null) => {
    setPreviewId(id)
    setNavigationMode(id ? 'preview' : 'idle')
  }, [])

  const isPreviewing = previewId !== null

  const isHorizontal = orientation === 'horizontal'
  const isVertical = orientation === 'vertical'

  return {
    activeId,
    previewId,

    railPosition,
    orientation,
    navigationMode,

    select,
    preview,

    setRailPosition,

    isPreviewing,
    isHorizontal,
    isVertical,
  }
}

/**
 * Core layout primitives
 */
export type Orientation = 'horizontal' | 'vertical'
export type RailPosition = 'top' | 'bottom' | 'left' | 'right'

/**
 * Workspace identity system
 * (you'll almost certainly expand this later)
 */
export type WorkspaceId = string

/**
 * Navigation intent state
 */
export type WorkspaceNavigationMode = 'idle' | 'select' | 'preview'

/**
 * Optional future: workspace history (back/forward like navigation)
 */
export interface WorkspaceHistory {
  stack: WorkspaceId[]
  index: number
}

/**
 * Full viewport state shape (useful if you later lift into context/store)
 */
export interface WorkspaceViewportState {
  activeId: WorkspaceId
  previewId: WorkspaceId | null

  railPosition: RailPosition
  orientation: Orientation

  navigationMode: WorkspaceNavigationMode
}

/**
 * Hook return type (important once you start composing hooks)
 */
export interface WorkspaceViewportAPI {
  activeId: WorkspaceId
  previewId: WorkspaceId | null

  railPosition: RailPosition
  orientation: Orientation

  navigationMode: WorkspaceNavigationMode

  // actions
  select: (id: WorkspaceId) => void
  preview: (id: WorkspaceId | null) => void

  setRailPosition: (pos: RailPosition) => void

  // derived (very useful soon)
  isPreviewing: boolean
  isHorizontal: boolean
  isVertical: boolean
}
