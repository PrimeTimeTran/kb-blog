import { ExhibitManifest, ExhibitProjectType } from '@/lib/types';
import { buildManifestCore, buildTreeFromFiles } from '@/lib/fs/walk';

import fs from 'fs';
import { getExhibitPath } from '@/lib/paths';
import { loadFrameworkSeeds } from '@/pkg/exhibit';
import { resolveRuntime } from '@/pkg/exhibit';

export function createExhibitManifest(slug: string[] = ['02-react']): ExhibitManifest {
  const folderPath = slug.length > 0 ? slug.join('/') : 'hello-world';
  const targetDir = getExhibitPath(folderPath);

  if (isVirtualProject(targetDir)) {
    return createEmptyManifest(slug);
  }

  const core = buildManifestCore({
    rootDir: targetDir,
  });

  const projectType = detectProjectType(core.entries, core.files, core.packageJson);

  const runtime = resolveRuntime(projectType, core.entries);
  const seeds = loadFrameworkSeeds(projectType);

  const signals = collectFrameworkSignals(core.entries, core.files);

  return {
    slug,
    root: folderPath,
    files: core.files,
    tree: buildTreeFromFiles(core.files),
    entries: core.entries,
    extensions: [...core.extensions],
    hasApp: signals.hasApp,
    hasPage: signals.hasPage,
    projectType,
    runtime,
    seeds,
  };
}
function collectFrameworkSignals(entries: string[], files: Record<string, any>) {
  const normalize = (p: string) => p.replace(/^\.\//, '');

  const normalizedEntries = entries.map(normalize);

  const hasApp = normalizedEntries.some((p) => /(^|\/)app\.(tsx|jsx|ts|js)$/.test(p));

  const hasPage = normalizedEntries.some((p) => p === 'page.tsx' || /(^|\/)page\.(tsx|jsx|ts|js)$/.test(p));

  const hasVueFiles = normalizedEntries.some((p) => p.endsWith('.vue'));

  const hasNuxtConfig = normalizedEntries.some((p) => /nuxt\.config\.(ts|js)$/.test(p));

  const hasNextSignals = hasApp || hasPage || normalizedEntries.some((p) => /(^|\/)layout\.(tsx|jsx|ts|js)$/.test(p));

  const hasReactSignals =
    normalizedEntries.some((p) => /(main|index|app)\.(tsx|jsx)$/.test(p.split('/').pop() ?? '')) ||
    Object.values(files).some((f: any) => {
      const content = f?.content ?? '';
      return content.includes('react') || content.includes('ReactDOM') || content.includes('createRoot');
    });

  return {
    hasApp,
    hasPage,
    hasVueFiles,
    hasNuxtConfig,
    hasNextSignals,
    hasReactSignals,
  };
}
function detectProjectType(entries: string[], files: Record<string, any>, packageJson: any) {
  const signals = collectFrameworkSignals(entries, files);

  // 1. JS ecosystem deps first
  const fromDeps = detectFromDependencies(packageJson);
  if (fromDeps) return fromDeps;

  // 2. Flutter (NOT npm-based)
  if (detectFlutterFromFiles(entries, files)) return 'flutter';

  // 3. heuristics fallback
  if (signals.hasNextSignals) return 'next';
  if (signals.hasReactSignals) return 'react';
  if (signals.hasNuxtConfig) return 'nuxt';
  if (signals.hasVueFiles) return 'vue';

  return 'vanilla';
}
function detectFromDependencies(packageJson: any): ExhibitProjectType | null {
  if (!packageJson) return null;

  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  if (deps?.next) return 'next';
  if (deps?.react || deps?.['react-dom']) return 'react';
  if (deps?.vue) return 'vue';
  if (deps?.nuxt) return 'nuxt';
  if (deps?.['react-native']) return 'react-native';

  return null;
}
function detectFlutterFromFiles(entries: string[], files: Record<string, any>) {
  const hasPubspec = entries.some((p) => p === 'pubspec.yaml');

  if (!hasPubspec) return false;

  const hasDartFiles = entries.some((p) => p.endsWith('.dart'));

  const hasFlutterImports = Object.values(files).some((f: any) => {
    const c = f?.content ?? '';
    return c.includes('package:flutter') || c.includes('WidgetsFlutterBinding') || c.includes('runApp(');
  });

  return hasPubspec && (hasDartFiles || hasFlutterImports);
}
function isVirtualProject(targetDir: string) {
  return !fs.existsSync(targetDir);
}
function createEmptyManifest(slug: string[]): ExhibitManifest {
  const folderPath = slug.length > 0 ? slug.join('/') : 'hello-world';

  return {
    slug,
    root: folderPath,
    files: {},
    entries: [],
    extensions: [],

    tree: {},

    hasApp: false,
    hasPage: false,

    projectType: 'vanilla',
  };
}
