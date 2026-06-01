import { ExhibitManifest, ExhibitProjectType } from '@/lib/types';
import { buildManifestCore, buildTreeFromFiles } from '@/lib/fs/collect-files';

import fs from 'fs';
import { getExhibitPath } from '@/lib/paths';
import { loadFrameworkSeeds } from '@/pkg/exhibit';
import { resolveRuntime } from '@/pkg/exhibit';

export function createExhibitManifest(slug: string[] = ['02-react']): ExhibitManifest {
  const folderPath = slug.length > 0 ? slug.join('/') : 'hello-world';
  const targetDir = getExhibitPath(folderPath);

  if (!fs.existsSync(targetDir)) {
    console.warn(`Directory not found at: ${targetDir}`);
    return {
      slug,
      root: folderPath,
      files: {},
      entries: [],
      extensions: [],

      hasApp: false,
      hasPage: false,

      projectType: 'vanilla',
    };
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

    // ✅ unified tree source (same model as KB system)
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

function detectProjectType(entries: string[], files: Record<string, any>, packageJson: any) {
  const signals = collectFrameworkSignals(entries, files);

  // -----------------------------
  // 1. dependency-based detection (strongest signal)
  // -----------------------------
  const fromDeps = detectFromDependencies(packageJson);

  if (fromDeps) return fromDeps;

  // -----------------------------
  // 2. heuristic fallback
  // -----------------------------
  if (signals.hasNextSignals) return 'next';
  if (signals.hasReactSignals) return 'react';
  if (signals.hasNuxtConfig) return 'nuxt';
  if (signals.hasVueFiles) return 'vue';

  return 'vanilla';
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

  return null;
}
