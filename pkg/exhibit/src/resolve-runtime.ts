import { ExhibitProjectType, ExhibitRuntime } from '@/pkg/exhibit';

export function resolveRuntime(projectType: ExhibitProjectType, entries: string[]): ExhibitRuntime {
  switch (projectType) {
    // =========================================================================
    // NEXT
    // =========================================================================

    case 'next':
      return {
        framework: 'next',

        entry: entries.find((p) => p.endsWith('/page.tsx')) ?? entries.find((p) => p.endsWith('/app.tsx')) ?? null,

        assets: [
          {
            type: 'html',
            path: '@/pkg/exhibit/templates/next/shell.html',
          },

          {
            type: 'script',
            path: '@/pkg/exhibit/templates/next/runtime.js',
          },

          {
            type: 'script',
            path: '@/pkg/exhibit/templates/next/mount.js',
          },
        ],
      };

    // =========================================================================
    // REACT
    // =========================================================================

    case 'react':
      return {
        framework: 'react',

        entry:
          entries.find((p) => /main\.(tsx|jsx)$/.test(p)) ??
          entries.find((p) => /index\.(tsx|jsx)$/.test(p)) ??
          entries.find((p) => /app\.(tsx|jsx)$/.test(p)) ??
          null,

        assets: [
          {
            type: 'html',
            path: '@/pkg/exhibit/templates/react/shell.html',
          },

          {
            type: 'script',
            path: '@/pkg/exhibit/templates/react/runtime.js',
          },

          {
            type: 'script',
            path: '@/pkg/exhibit/templates/react/mount.js',
          },
        ],
      };

    // =========================================================================
    // VUE
    // =========================================================================

    case 'vue':
    case 'nuxt':
      return {
        framework: projectType,

        entry: entries.find((p) => p.endsWith('/main.ts')) ?? entries.find((p) => p.endsWith('/main.js')) ?? null,

        assets: [
          {
            type: 'html',
            path: `@/pkg/exhibit/templates/${projectType}/shell.html`,
          },

          {
            type: 'script',
            path: `@/pkg/exhibit/templates/${projectType}/runtime.js`,
          },

          {
            type: 'script',
            path: `@/pkg/exhibit/templates/${projectType}/mount.js`,
          },
        ],
      };

    // =========================================================================
    // VANILLA
    // =========================================================================

    default:
      return {
        framework: 'vanilla',

        entry: entries.find((p) => p.endsWith('/index.html')) ?? entries.find((p) => p.endsWith('/main.js')) ?? null,

        assets: [
          {
            type: 'html',
            path: '@/pkg/exhibit/templates/vanilla/shell.html',
          },

          {
            type: 'script',
            path: '@/pkg/exhibit/templates/vanilla/runtime.js',
          },
        ],
      };
  }
}
