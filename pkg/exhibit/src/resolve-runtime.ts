import { ExhibitProjectType, ExhibitRuntime } from '@/pkg/exhibit';

type FileMap = Record<string, { content: string; language: string }>;

function pickFirst(files: FileMap, matchers: ((name: string) => boolean)[]) {
  const keys = Object.keys(files);

  for (const matcher of matchers) {
    for (const key of keys) {
      if (matcher(key)) return key;
    }
  }

  return null;
}

export function resolveRuntime(projectType: ExhibitProjectType, files: FileMap): ExhibitRuntime {
  const assetMap = {
    next: {
      framework: 'next',
      entryMatchers: [
        (f: string) => f === 'page.tsx',
        (f: string) => f === 'app.tsx',
        (f: string) => /page\.(tsx|ts|jsx|js)$/.test(f),
        (f: string) => /app\.(tsx|ts|jsx|js)$/.test(f),
      ],
    },

    react: {
      framework: 'react',
      entryMatchers: [
        (f: string) => f === 'main.tsx',
        (f: string) => f === 'main.jsx',
        (f: string) => f === 'index.tsx',
        (f: string) => f === 'index.jsx',
        (f: string) => f === 'app.tsx',
        (f: string) => f === 'app.jsx',
      ],
    },

    vue: {
      framework: 'vue',
      entryMatchers: [(f: string) => f === 'main.ts'],
    },

    nuxt: {
      framework: 'nuxt',
      entryMatchers: [(f: string) => f === 'main.ts'],
    },

    vanilla: {
      framework: 'vanilla',
      entryMatchers: [(f: string) => f === 'index.html', (f: string) => f === 'main.js'],
    },
  } as const;

  const config = assetMap[projectType] ?? assetMap.vanilla;

  const entry = pickFirst(files, config.entryMatchers);

  return {
    framework: config.framework as any,
    entry,
    assets: [
      {
        type: 'html',
        path: `@/pkg/exhibit/templates/${config.framework}/shell.html`,
      },
      {
        type: 'script',
        path: `@/pkg/exhibit/templates/${config.framework}/runtime.js`,
      },
      ...(config.framework !== 'vanilla'
        ? [
            {
              type: 'script',
              path: `@/pkg/exhibit/templates/${config.framework}/mount.js`,
            },
          ]
        : []),
    ],
  };
}
