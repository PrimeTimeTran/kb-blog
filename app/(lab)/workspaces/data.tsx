import { Workspace } from './types'

import Product from '@/app/(preview)/design/product/page'
import Material from '@/app/(preview)/design/system/page'
import Tailwind from '@/app/(preview)/design/tailwind/page'
import TailwindUtilities from '@/app/(preview)/design/theme/TailwindUtilities'
import { ProductPageShell } from '@/app/(preview)/design/Shell'
import { WorkspaceHero, LargeScrollableSection } from './components'
import { themes } from './theme'
// https://prismic.io/blog/css-background-effects

// export function RawHtml({ html }: { html: string }) {
//   return <div dangerouslySetInnerHTML={{ __html: html }} />
// }

export const workspaces: Workspace[] = [
  // {
  //   id: 'Tailwind',
  //   title: 'Tailwind',
  //   persist: true,

  //   theme: {
  //     ['--background' as any]: '#09090b',
  //     ['--surface' as any]: '#18181b',
  //     ['--surface-container' as any]: '#27272a',
  //     ['--primary' as any]: '#8b5cf6',
  //     ['--on-background' as any]: '#fafafa',
  //   },

  //   component: Tailwind,
  // },
  // {
  //   id: 'Design System',
  //   title: 'Design System',
  //   persist: true,

  //   theme: {
  //     ['--background' as any]: '#09090b',
  //     ['--surface' as any]: '#18181b',
  //     ['--surface-container' as any]: '#27272a',
  //     ['--primary' as any]: '#8b5cf6',
  //     ['--on-background' as any]: '#fafafa',
  //   },
  //   component: Material,
  // },
  // {
  //   id: 'Space1',
  //   title: 'Material',
  //   persist: true,

  //   theme: {
  //     ['--background' as any]: '#09090b',
  //     ['--surface' as any]: '#18181b',
  //     ['--surface-container' as any]: '#27272a',
  //     ['--primary' as any]: '#8b5cf6',
  //     ['--on-background' as any]: '#fafafa',
  //   },

  //   component: Product,
  // },

  // {
  //   id: 'theme',
  //   title: 'Theme Preview',
  //   persist: true,

  //   theme: {
  //     '--background': '#0a0a0f',
  //     '--surface': '#14141c',
  //     '--surface-container': '#1d1d29',
  //     '--primary': '#a78bfa',
  //     '--on-background': '#f5f5f7',
  //     '--on-surface': '#e4e4e7',
  //   },

  //   component: TailwindUtilities,
  // },
  {
    id: 'theme',
    title: 'Theme Shell',
    persist: true,

    theme: themes.themeEditorial,

    component: ProductPageShell,
  },
  {
    id: 'motion-lab',
    title: 'Motion Lab',
    persist: true,

    theme: themes.themeLightSaaS,

    // component: MotionWorkspace,
    component: ProductPageShell,
  },

  {
    id: 'flex-gallery',
    title: 'Flex Gallery',
    persist: true,

    theme: themes.themeNeonDark,

    // component: FlexWorkspace,
    component: ProductPageShell,
  },

  {
    id: 'project-alpha',
    title: 'Project Alpha',
    persist: true,

    theme: themes.themeOcean,

    // component: AlphaWorkspace,
    component: ProductPageShell,
  },
]
type WorkspaceId = string
export const workspaceRegistry = Object.fromEntries(
  workspaces.map((workspace) => [workspace.id, workspace])
) as Record<WorkspaceId, Workspace>

export function MotionWorkspace() {
  return (
    <div>
      <WorkspaceHero
        title="Motion Lab"
        description="Animation experiments, viewport motion, interaction studies."
      />

      <LargeScrollableSection />
    </div>
  )
}
export function FlexWorkspace() {
  return (
    <div>
      <WorkspaceHero
        title="Flex Gallery"
        description="Layout experiments and responsive composition patterns."
      />

      <LargeScrollableSection />
    </div>
  )
}
export function AlphaWorkspace() {
  return (
    <div>
      <WorkspaceHero
        title="Project Alpha"
        description="Case study workspace with nested navigation regions."
      />

      <LargeScrollableSection />
    </div>
  )
}
