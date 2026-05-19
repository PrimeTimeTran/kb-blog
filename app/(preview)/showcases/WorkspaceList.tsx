import { WorkspaceDefinition } from './types'

import { WorkspaceHero, LargeScrollableSection, ScrollableWorkspaceContent } from './components'
import { Page3 } from '@/app/(preview)/design/tailwind/animated-hover-icons'
import Tailwind from '@/app/(preview)/design/tailwind/page'
import Material from '@/app/(preview)/design/system/page'
import Product from '@/app/(preview)/design/product/page'
// import { Space1 } from './Space1'

// https://prismic.io/blog/css-background-effects

// I want to load
// ./Space1.css
// ./Space1.html
// how to lload both together?
export function RawHtml({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
export const workspaces: WorkspaceDefinition[] = [
  {
    id: 'Space1',
    title: 'Space1',
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
    id: 'Product',
    title: 'Product',
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
    id: 'Material',
    title: 'Material',
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
    id: 'Animation',
    title: 'Animation',
    persist: true,

    theme: {
      ['--background' as any]: '#09090b',
      ['--surface' as any]: '#18181b',
      ['--surface-container' as any]: '#27272a',
      ['--primary' as any]: '#8b5cf6',
      ['--on-background' as any]: '#fafafa',
    },

    component: Page3,
  },
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
