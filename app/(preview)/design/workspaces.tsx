import { useState } from 'react'
import { WorkspaceDefinition } from './types'

import { WorkspaceLayout } from './page'
import {
  LocalRibbon,
  VerticalRibbon,
  WorkspaceHero,
  LargeScrollableSection,
  ScrollableWorkspaceContent,
} from './components'

export const workspaces: WorkspaceDefinition[] = [
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

export function MotionWorkspace(props) {
  const [activeTab, setActiveTab] = useState('springs')
  return (
    <WorkspaceLayout
      viewport={
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

export function FlexWorkspace() {
  const [activeTab, setActiveTab] = useState('rows')
  return (
    <WorkspaceLayout
      viewport={
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

export function ProjectWorkspace() {
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
