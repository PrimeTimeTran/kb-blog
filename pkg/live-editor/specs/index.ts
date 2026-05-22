import { nextVfs } from '../generated/next-vfs';
import { ProjectSpec } from '../lib/types';

export const nextSpec: ProjectSpec = {
  id: 'next-basic',
  entry: '/app/page.tsx',
  files: nextVfs,
  focus: '/app/page.tsx',
};

export const infiniteScrollSpec: ProjectSpec = {
  id: 'infinite-scroll-variants',

  entry: '/variant-1.tsx',

  files: {
    '/variant-1.tsx': '...',
    '/variant-2.tsx': '...',
    '/variant-3.tsx': '...',
    '/variant-4.tsx': '...',
    '/variant-5.tsx': '...',
    '/shared/utils.ts': '...',
  },

  modules: {
    react: {
      entry: '/variant-1.tsx',
      files: ['/variant-1.tsx', '/variant-2.tsx', '/variant-3.tsx', '/variant-4.tsx', '/variant-5.tsx'],
    },
  },

  focus: '/variant-1.tsx',
};

export const specs = {
  next: nextSpec,
} as const;

export type SpecKey = keyof typeof specs;

export function getSpec(key: SpecKey): ProjectSpec {
  return specs[key];
}
