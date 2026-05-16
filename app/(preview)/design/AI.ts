'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'

/* ============================================================================
 * TYPES
 * ========================================================================== */

type RibbonPosition = 'top' | 'bottom' | 'left' | 'right'

type WorkspaceDefinition = {
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

type WorkspaceComponentProps = {
  workspaceId: string
}

/* ============================================================================
 * MOCK DATA
 * ========================================================================== */

const workspaces: WorkspaceDefinition[] = [
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

/* ============================================================================
 * PAGE
 * ========================================================================== */

export default function ShowcasePage() {
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(
    workspaces[0].id
  )

  const activeWorkspace = useMemo(
    () =>
      workspaces.find((workspace) => {
        return workspace.id === activeWorkspaceId
      })!,
    [activeWorkspaceId]
  )

  return (
    <div className="h-screen overflow-hidden bg-background text-on-background">
      <WorkspaceLayout
        top={
          <WorkspaceRibbon
            items={workspaces}
            activeId={activeWorkspaceId}
            onSelect={setActiveWorkspaceId}
          />
        }
      >
        <WorkspaceViewport
          activeId={activeWorkspaceId}
          workspaces={workspaces}
        />
      </WorkspaceLayout>
    </div>
  )
}

/* ============================================================================
 * VIEWPORT
 * ========================================================================== */

type WorkspaceViewportProps = {
  activeId: string
  workspaces: WorkspaceDefinition[]
}

function WorkspaceViewport({
  activeId,
  workspaces,
}: WorkspaceViewportProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {workspaces.map((workspace) => {
        const active = workspace.id === activeId

        const Component = workspace.component

        return (
          <div
            key={workspace.id}
            style={workspace.theme}
            aria-hidden={!active}
            className={clsx(
              'absolute inset-0',
              'transition-opacity duration-300',
              active
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            )}
          >
            {(active || workspace.persist) && (
              <div className="h-full bg-[var(--background)] text-[var(--on-background)]">
                <Component workspaceId={workspace.id} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================================
 * WORKSPACE LAYOUT
 * ========================================================================== */

type WorkspaceLayoutProps = {
  top?: React.ReactNode
  bottom?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  children: React.ReactNode
}

function WorkspaceLayout({
  top,
  bottom,
  left,
  right,
  children,
}: WorkspaceLayoutProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {top}

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {left}

        <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
          {children}
        </main>

        {right}
      </div>

      {bottom}
    </div>
  )
}

/* ============================================================================
 * GLOBAL RIBBON
 * ========================================================================== */

type WorkspaceRibbonProps = {
  items: WorkspaceDefinition[]
  activeId: string
  onSelect: (id: string) => void
}

function WorkspaceRibbon({
  items,
  activeId,
  onSelect,
}: WorkspaceRibbonProps) {
  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-3 p-3">
          {items.map((item) => {
            const active = item.id === activeId

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={clsx(
                  'shrink-0 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                  active
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--surface-container)] hover:scale-[1.02]'
                )}
              >
                {item.title}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
 * LOCAL RIBBON
 * ========================================================================== */

type LocalRibbonItem = {
  id: string
  label: string
}

type LocalRibbonProps = {
  items: LocalRibbonItem[]
  activeId: string
  onSelect: (id: string) => void
  position?: RibbonPosition
}

function LocalRibbon({
  items,
  activeId,
  onSelect,
}: LocalRibbonProps) {
  return (
    <div className="border-t border-black/10 dark:border-white/10">
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2 p-2">
          {items.map((item) => {
            const active = item.id === activeId

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={clsx(
                  'rounded-lg px-3 py-2 text-sm transition-all',
                  active
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--surface-container)]'
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
 * MOTION WORKSPACE
 * ========================================================================== */

function MotionWorkspace() {
  const [activeTab, setActiveTab] = useState('springs')

  return (
    <WorkspaceLayout
      bottom={
        <LocalRibbon
          activeId={activeTab}
          onSelect={setActiveTab}
          items={[
            { id: 'springs', label: 'Springs' },
            { id: 'cards', label: 'Cards' },
            { id: 'depth', label: 'Depth' },
            { id: 'parallax', label: 'Parallax' },
          ]}
        />
      }
    >
      <ScrollableWorkspaceContent>
        <WorkspaceHero
          title="Motion Lab"
          description="Animation experiments, viewport motion, interaction studies."
        />

        <LargeScrollableSection />
      </ScrollableWorkspaceContent>
    </WorkspaceLayout>
  )
}

/* ============================================================================
 * FLEX WORKSPACE
 * ========================================================================== */

function FlexWorkspace() {
  const [activeTab, setActiveTab] = useState('rows')

  return (
    <WorkspaceLayout
      left={
        <VerticalRibbon
          activeId={activeTab}
          onSelect={setActiveTab}
          items={[
            { id: 'rows', label: 'Rows' },
            { id: 'columns', label: 'Columns' },
            { id: 'holy-grail', label: 'Holy Grail' },
            { id: 'stacking', label: 'Stacking' },
          ]}
        />
      }
    >
      <ScrollableWorkspaceContent>
        <WorkspaceHero
          title="Flex Gallery"
          description="Layout experiments and responsive composition patterns."
        />

        <LargeScrollableSection />
      </ScrollableWorkspaceContent>
    </WorkspaceLayout>
  )
}

/* ============================================================================
 * PROJECT WORKSPACE
 * ========================================================================== */

function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <WorkspaceLayout
      right={
        <VerticalRibbon
          activeId={activeTab}
          onSelect={setActiveTab}
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'stack', label: 'Stack' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'metrics', label: 'Metrics' },
          ]}
        />
      }
      bottom={
        <LocalRibbon
          activeId={activeTab}
          onSelect={setActiveTab}
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'stack', label: 'Stack' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'metrics', label: 'Metrics' },
          ]}
        />
      }
    >
      <ScrollableWorkspaceContent>
        <WorkspaceHero
          title="Project Alpha"
          description="Case study workspace with nested navigation regions."
        />

        <LargeScrollableSection />
      </ScrollableWorkspaceContent>
    </WorkspaceLayout>
  )
}

/* ============================================================================
 * SHARED CONTENT
 * ========================================================================== */

function ScrollableWorkspaceContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
        {children}
      </div>
    </div>
  )
}

function WorkspaceHero({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-3xl bg-[var(--surface)] p-8">
      <h1 className="text-4xl font-black tracking-tight">
        {title}
      </h1>

      <p className="mt-3 max-w-2xl text-base opacity-70">
        {description}
      </p>
    </div>
  )
}

function LargeScrollableSection() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 24 }).map((_, index) => {
        return (
          <div
            key={index}
            className="rounded-2xl bg-[var(--surface-container)] p-6"
          >
            <div className="text-lg font-semibold">
              Demo Block {index + 1}
            </div>

            <p className="mt-2 opacity-70">
              Independent scrollable workspace content.
            </p>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================================
 * VERTICAL RIBBON
 * ========================================================================== */

function VerticalRibbon({
  items,
  activeId,
  onSelect,
}: {
  items: LocalRibbonItem[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="w-52 border-l border-r border-black/10 dark:border-white/10">
      <div className="flex h-full flex-col gap-2 overflow-y-auto p-3">
        {items.map((item) => {
          const active = item.id === activeId

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={clsx(
                'rounded-xl px-4 py-3 text-left text-sm transition-all',
                active
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--surface-container)]'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
