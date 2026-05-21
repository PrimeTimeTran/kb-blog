import { WorkspaceDefinition } from './types'

import Product from '@/app/(preview)/design/product/page'
import Material from '@/app/(preview)/design/system/page'
import Tailwind from '@/app/(preview)/design/tailwind/page'
import { Page3 } from '@/app/(preview)/design/tailwind/animated-hover-icons'

import { WorkspaceHero, LargeScrollableSection, ScrollableWorkspaceContent } from './components'

// https://prismic.io/blog/css-background-effects

export function RawHtml({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

// REQUIRED
// Wrapping for components in order to not break scroll
// export function WorkspaceShell({ children }) {
//   return (
//     <div className="h-full w-full min-h-0 overflow-hidden">
//       <div className="h-full w-full min-h-0 overflow-y-auto">
//         {children}
//       </div>
//     </div>
//   )
// }
export const workspaces: WorkspaceDefinition[] = [
  {
    id: 'Design System',
    title: 'Design System',
    persist: true,

    theme: {
      ['--background' as any]: '#09090b',
      ['--surface' as any]: '#18181b',
      ['--surface-container' as any]: '#27272a',
      ['--primary' as any]: '#8b5cf6',
      ['--on-background' as any]: '#fafafa',
    },

    component: Material,
  },
  {
    id: 'Space1',
    title: 'Material',
    persist: true,

    theme: {
      ['--background' as any]: '#09090b',
      ['--surface' as any]: '#18181b',
      ['--surface-container' as any]: '#27272a',
      ['--primary' as any]: '#8b5cf6',
      ['--on-background' as any]: '#fafafa',
    },

    component: Product,
  },
  {
    id: 'Tailwind',
    title: 'Tailwind',
    persist: true,

    theme: {
      ['--background' as any]: '#09090b',
      ['--surface' as any]: '#18181b',
      ['--surface-container' as any]: '#27272a',
      ['--primary' as any]: '#8b5cf6',
      ['--on-background' as any]: '#fafafa',
    },

    component: Tailwind,
  },
  {
    id: 'motion-lab',
    title: 'Motion Lab',
    persist: true,

    theme: {
      '--background': '#0a0a0f',
      '--surface': '#14141c',
      '--surface-container': '#1d1d29',
      '--primary': '#a78bfa',
      '--on-background': '#f5f5f7',
      '--on-surface': '#e4e4e7',
    },

    component: MotionWorkspace,
  },

  {
    id: 'flex-gallery',
    title: 'Flex Gallery',
    persist: true,

    theme: {
      '--background': '#ffffff',
      '--surface': '#f8fafc',
      '--surface-container': '#eef2f7',

      '--primary': '#2563eb',

      '--on-background': '#0f172a',
      '--on-surface': '#1e293b',
    },

    component: FlexWorkspace,
  },

  {
    id: 'project-alpha',
    title: 'Project Alpha',
    persist: true,

    theme: {
      '--background': '#050b10',
      '--surface': '#0b1220',
      '--surface-container': '#111c2e',

      '--primary': '#22d3ee',

      '--on-background': '#e2e8f0',
      '--on-surface': '#cbd5e1',
    },

    component: ProjectWorkspace,
  },
]
type WorkspaceId = string
export const workspaceRegistry = Object.fromEntries(
  workspaces.map((workspace) => [workspace.id, workspace])
) as Record<WorkspaceId, WorkspaceDefinition>

export function MotionWorkspace() {
  return (
    <ScrollableWorkspaceContent>
      <WorkspaceHero
        title="Motion Lab"
        description="Animation experiments, viewport motion, interaction studies."
      />

      <LargeScrollableSection />
    </ScrollableWorkspaceContent>
  )
}
export function FlexWorkspace() {
  return (
    <ScrollableWorkspaceContent>
      <WorkspaceHero
        title="Flex Gallery"
        description="Layout experiments and responsive composition patterns."
      />

      <LargeScrollableSection />
    </ScrollableWorkspaceContent>
  )
}
export function ProjectWorkspace() {
  return (
    <ScrollableWorkspaceContent>
      <WorkspaceHero
        title="Project Alpha"
        description="Case study workspace with nested navigation regions."
      />

      <LargeScrollableSection />
    </ScrollableWorkspaceContent>
  )
}
