import React from 'react'
import { useWorkspaceViewport } from '@/hooks/useViewport'

export type WorkspaceId = string
export type WorkspaceNavigationMode = 'idle' | 'select' | 'preview'

export type RailOrientation = 'horizontal' | 'vertical'
export type RailPosition = 'left' | 'right' | 'top' | 'bottom'
export type RailAnchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type WorkspaceDefinition = {
  id: string
  title: string
  persist?: boolean
  theme?: React.CSSProperties
  component: React.ComponentType<WorkspaceComponentProps>
}

export type Workspace = {
  id: string
  title: string
  persist?: boolean
  meta?: Record<string, unknown>
}
export interface WorkspaceHistory {
  index: number
  stack: WorkspaceId[]
}
export interface WorkspaceViewportState {
  activeId: WorkspaceId
  previewId: WorkspaceId | null

  railPosition: RailPosition
  orientation: RailOrientation

  navigationMode: WorkspaceNavigationMode
}
export interface ViewportAPI {
  railOpen: boolean
  closeRail: () => void
  isVertical: boolean
  isPreviewing: boolean
  isHorizontal: boolean
  railPosition: RailPosition
  orientation: RailOrientation
  activeId: WorkspaceId
  previewId: WorkspaceId | null
  navigationMode: WorkspaceNavigationMode
  select: (id: WorkspaceId) => void
  setRailPosition: (pos: RailPosition) => void
  preview: (id: WorkspaceId | null) => void
}
export type WorkspaceComponentProps = {
  workspaceId: string
}
export type WorkspaceLayoutProps = {
  rail: React.ReactNode
  children: React.ReactNode
  viewport: ReturnType<typeof useWorkspaceViewport>
}
export type RailItemProps = {
  item: any
  viewport: any
  active: boolean
  isVertical: boolean
  previewId: string | null
  onSelect: (id: string) => void
  onPreview: (id: string | null) => void
}
export type ViewportRailProps = {
  items: WorkspaceDefinition[]
  viewport: ViewportAPI
}
export type RailProps = {
  items: any[]
  activeId: string
  previewId: string | null
  onSelect: (id: string) => void
  onPreview: (id: string | null) => void
  position?: RailPosition
}
export type WorkspaceViewportProps = {
  viewport: ViewportAPI
  workspaces: WorkspaceDefinition[]
}
export type ControlOverlay = {
  viewport: ViewportAPI
}
export type Action =
  | { type: 'SET_ANCHOR'; anchor: RailAnchor }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'CLOSE' }

export type RailState = {
  anchor: 'tl' | 'tr' | 'bl' | 'br'
  position: 'top' | 'bottom' | 'left' | 'right'
  open: boolean
}
