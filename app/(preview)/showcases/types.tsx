import React from 'react'

export type WorkspaceViewportProps = {
  activeId: string
  workspaces: WorkspaceDefinition[]

  railPosition: RailPosition
  onRailPositionChange?: (pos: RailPosition) => void
}
export type RailPosition = 'top' | 'bottom'
export type RibbonPosition = 'top' | 'bottom' | 'left' | 'right'

export type WorkspaceDefinition = {
  id: string
  title: string

  /**
   * Optional scoped theme.
   * These become CSS variables on the workspace boundary.
   */
  theme?: React.CSSProperties

  /**
   * Persist mounted state when inactive.
   */
  persist?: boolean

  /**
   * Workspace UI
   */
  component: React.ComponentType<WorkspaceComponentProps>
}

export type WorkspaceComponentProps = {
  workspaceId: string
}
export type LocalRibbonItem = {
  id: string
  label: string
}

export type LocalRibbonProps = {
  items: LocalRibbonItem[]
  activeId: string
  onSelect: (id: string) => void
  position?: RibbonPosition
}

/* ============================================================================
 * GLOBAL RIBBON
 * ========================================================================== */
export type RibbonOrientation = 'horizontal' | 'vertical'

export type WorkspaceRibbonProps = {
  items: WorkspaceDefinition[]
  activeId: string
  onSelect: (id: string) => void
  orientation: RibbonOrientation
}

export type WorkspaceLayoutProps = {
  top?: React.ReactNode
  bottom?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  children: React.ReactNode
  workspace: {}
  viewConfig: {}
  viewportRail: React.ReactNode
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
export const workspaces: [] = [
  {
    id: 'motion-lab',
    title: 'Motion Lab',
    persist: true,

    theme: {
      ['--background' as any]: '#09090b',
      ['--surface' as any]: '#18181b',
      ['--surface-container' as any]: '#27272a',
      ['--primary' as any]: '#8b5cf6',
      ['--on-background' as any]: '#fafafa',
    },

    component: MotionWorkspace,
  },

  {
    id: 'flex-gallery',
    title: 'Flex Gallery',
    persist: true,

    theme: {
      ['--background' as any]: '#ffffff',
      ['--surface' as any]: '#f4f4f5',
      ['--surface-container' as any]: '#e4e4e7',
      ['--primary' as any]: '#2563eb',
      ['--on-background' as any]: '#18181b',
    },

    component: FlexWorkspace,
  },

  {
    id: 'project-alpha',
    title: 'Project Alpha',
    persist: true,

    theme: {
      ['--background' as any]: '#071013',
      ['--surface' as any]: '#0f172a',
      ['--surface-container' as any]: '#1e293b',
      ['--primary' as any]: '#06b6d4',
      ['--on-background' as any]: '#e2e8f0',
    },

    component: ProjectWorkspace,
  },
]
