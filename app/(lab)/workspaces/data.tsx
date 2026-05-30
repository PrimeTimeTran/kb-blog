import { LargeScrollableSection, WorkspaceHero } from './components';

import Material from '@/app/(preview)/design/material/page';
import Product from '@/app/(preview)/design/product/page';
import { ProductPageShell } from '@/app/(preview)/design/Shell';
import Tailwind from '@/app/(preview)/design/design/page';
import TailwindUtilities from '@/app/(preview)/design/theme/TailwindUtilities';
import { Workspace } from './types';

export const workspaces3: Workspace[] = [
  {
    id: 'ocean',
    title: 'Ocean',
    persist: true,
    theme: 'ocean',
    component: ProductPageShell,
  },
  {
    id: 'neon',
    title: 'Neon dark',
    persist: true,

    theme: 'neon',

    // component: FlexWorkspace,
    component: ProductPageShell,
  },
  {
    id: 'zen',
    title: 'Zen',
    persist: true,

    theme: 'zen',

    component: ProductPageShell,
  },
  {
    id: 'editorial',
    title: 'Editorial',
    persist: true,

    theme: 'editorial',

    component: ProductPageShell,
  },
  {
    id: 'light',
    title: 'Sass',
    persist: true,

    theme: 'sass',

    // component: MotionWorkspace,
    component: ProductPageShell,
  },
];
export const workspaces: Workspace[] = [
  {
    id: 'application',
    title: 'Application',
    persist: true,
    component: Product,
  },
  {
    id: 'design-system',
    title: 'Design System',
    persist: true,
    component: Tailwind,
  },
  {
    id: 'material',
    title: 'Material',
    persist: true,
    component: Material,
  },
  {
    id: 'text-utilities',
    title: 'Text Utilities',
    persist: true,
    component: TailwindUtilities,
  },
];

type WorkspaceId = string;

export const workspaceRegistry = Object.fromEntries(
  workspaces.map((workspace) => [workspace.id, workspace]),
) as unknown as Record<WorkspaceId, Workspace>;

export function MotionWorkspace() {
  return (
    <div>
      <WorkspaceHero title="Motion Lab" description="Animation experiments, viewport motion, interaction studies." />

      <LargeScrollableSection />
    </div>
  );
}
export function FlexWorkspace() {
  return (
    <div>
      <WorkspaceHero title="Flex Gallery" description="Layout experiments and responsive composition patterns." />

      <LargeScrollableSection />
    </div>
  );
}
export function AlphaWorkspace() {
  return (
    <div>
      <WorkspaceHero title="Project Alpha" description="Case study workspace with nested navigation regions." />

      <LargeScrollableSection />
    </div>
  );
}
