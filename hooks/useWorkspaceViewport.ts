import { useState, useCallback, useMemo } from 'react'

export function useWorkspaceViewport(initialId: WorkspaceId): WorkspaceViewportAPI {
  const [activeId, setActiveId] = useState<WorkspaceId>(initialId)
  const [previewId, setPreviewId] = useState<WorkspaceId | null>(null)

  const [railPosition, setRailPosition] = useState<RailPosition>('bottom')

  const [orientation, setOrientation] = useState<Orientation>('horizontal')

  const [navigationMode, setNavigationMode] = useState<WorkspaceNavigationMode>('idle')

  /**
   * Selecting a workspace becomes a "commit action"
   */
  const select = useCallback((id: WorkspaceId) => {
    setActiveId(id)
    setPreviewId(null)
    setNavigationMode('select')
  }, [])

  /**
   * Preview is transient state
   */
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
    setOrientation,

    isPreviewing,
    isHorizontal,
    isVertical,
  }
}

/**
 * Core layout primitives
 */
export type RailPosition = 'top' | 'bottom' | 'left' | 'right'
export type Orientation = 'horizontal' | 'vertical'

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
  setOrientation: (o: Orientation) => void

  // derived (very useful soon)
  isPreviewing: boolean
  isHorizontal: boolean
  isVertical: boolean
}
