import { useWorkspaceViewport, WorkspaceViewportAPI } from '@/hooks/useWorkspaceViewport'
import React from 'react'

export type WorkspaceId = string
export type RailDirection = 'horizontal' | 'vertical'
export type RailPosition = 'left' | 'right' | 'top' | 'bottom'
export type WorkspaceDefinition = {
  id: string
  title: string
  persist?: boolean
  theme?: React.CSSProperties
  component: React.ComponentType<WorkspaceComponentProps>
}
export type WorkspaceComponentProps = {
  workspaceId: string
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
  viewport: WorkspaceViewportAPI
}
export type WorkspaceRibbonProps = {
  items: WorkspaceDefinition[]
  activeId: string
  onSelect: (id: string) => void
  orientation: RailDirection
}
export type WorkspaceLayoutProps = {
  top?: React.ReactNode
  bottom?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  rail: React.ReactNode
  children: React.ReactNode
  viewport: ReturnType<typeof useWorkspaceViewport>
}
export type Workspace = {
  id: string
  title: string
  persist?: boolean
  meta?: Record<string, unknown>
}
export type RailProps = {
  items: any[]
  activeId: string
  previewId: string | null
  onSelect: (id: string) => void
  onPreview: (id: string | null) => void
  position?: 'top' | 'bottom' | 'left' | 'right'
}
export type WorkspaceViewportProps = {
  viewport: WorkspaceViewportAPI
  workspaces: WorkspaceDefinition[]
}
export type ControlOverlay = {
  setPosition: (p: RailPosition) => void
  viewport: ReturnType<typeof useWorkspaceViewport>
}
