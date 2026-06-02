import { ExhibitManifest, ExhibitProjectType, SeedFile } from '@/lib/types';

type FileMap = Record<string, { content: string; language: string }>;

export function resolveRuntime(
  projectType: ExhibitProjectType,
  entries: string[],
  // files: FileMap,
): ExhibitManifest['runtime'] {
  return {
    framework: projectType,
    entry: findEntryByProjectType(projectType, entries),
    assets: buildAssets(projectType),
  };
}

function findWebEntry(entries: string[]) {
  return entries.find((e) => /(^|\/)(main|index|app)\.(tsx|ts|jsx|js)$/.test(e)) || null;
}

function findRNEntry(entries: string[]) {
  return entries.find((e) => /index\.(js|ts|tsx)$/.test(e)) || null;
}

function findFlutterEntry(entries: string[]) {
  return entries.find((e) => e === 'lib/main.dart') || entries.find((e) => e.endsWith('main.dart')) || null;
}

function findEntryByProjectType(projectType: ExhibitProjectType, entries: string[]) {
  switch (projectType) {
    case 'react-native':
      return findRNEntry(entries);

    case 'flutter':
      return findFlutterEntry(entries);

    case 'next':
      return entries.find((e) => /(^|\/)(page|app)\.(tsx|ts|jsx|js)$/.test(e)) || null;

    case 'react':
      return findWebEntry(entries);

    case 'vue':
    case 'nuxt':
      return entries.find((e) => e === 'main.ts') || null;

    default:
      return findWebEntry(entries);
  }
}

function buildAssets(projectType: ExhibitProjectType): SeedFile[] {
  const base = [
    {
      type: 'html',
      path: `@/pkg/exhibit/templates/${projectType}/shell.html`,
    },
    {
      type: 'script',
      path: `@/pkg/exhibit/templates/${projectType}/runtime.js`,
    },
  ] as SeedFile[];

  const needsMount = projectType !== 'vanilla';

  if (!needsMount) return base;

  return [
    ...base,
    {
      type: 'script',
      path: `@/pkg/exhibit/templates/${projectType}/mount.js`,
    },
  ];
}
