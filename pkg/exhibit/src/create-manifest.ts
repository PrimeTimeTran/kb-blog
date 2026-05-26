import fs from 'fs';
import path from 'path';
import { VirtualFS, ExhibitProjectType, ExhibitManifest } from '../types';
import { resolveRuntime } from './resolve-runtime';
import { loadFrameworkSeeds } from '@/pkg/exhibit/src/load-framework-seeds';

export function createExhibitManifest(slug: string[] = ['hello-world']): ExhibitManifest {
  let packageJson: any = null;
  const files: VirtualFS = {};
  const entries: string[] = [];
  const extensions = new Set<string>();

  const folderPath = slug.length > 0 ? slug.join('/') : 'hello-world';

  const exhibitRoot = path.join(process.cwd(), 'exhibit');
  const targetDir = path.join(exhibitRoot, folderPath);

  try {
    if (!fs.existsSync(targetDir)) {
      console.warn(`Directory not found at: ${targetDir}`);

      return {
        slug,
        root: folderPath,

        files,
        entries,
        extensions: [],

        hasApp: false,
        hasPage: false,

        projectType: 'vanilla',
      };
    }

    const readDirectoryRecursive = (currentDir: string) => {
      const entriesInDir = fs.readdirSync(currentDir, {
        withFileTypes: true,
      });

      for (const entry of entriesInDir) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          readDirectoryRecursive(fullPath);
          continue;
        }

        if (!entry.isFile()) continue;

        if (!/\.(tsx|ts|jsx|js|css|html|vue)$/.test(entry.name)) {
          continue;
        }

        const content = fs.readFileSync(fullPath, 'utf-8');
        if (entry.name === 'package.json') {
          try {
            packageJson = JSON.parse(content);
          } catch (e) {
            console.warn('Invalid package.json', e);
          }
        }

        const relativePath = './' + path.relative(exhibitRoot, fullPath).replace(/\\/g, '/');

        const ext = entry.name.split('.').pop() ?? 'js';

        const language = ext === 'tsx' || ext === 'jsx' ? 'jsx' : ext === 'ts' ? 'typescript' : ext;

        files[relativePath] = {
          content,
          language,
        };

        entries.push(relativePath);
        extensions.add(ext);
      }
    };

    readDirectoryRecursive(targetDir);
  } catch (error) {
    console.error('Error compiling exhibit manifest:', error);
  }

  // =========================================================================
  // PROJECT DETECTION
  // =========================================================================

  const hasApp = entries.some((p) => /\/app\.(tsx|jsx|ts|js)$/.test(p));

  const hasPage = entries.some((p) => /\/page\.(tsx|jsx|ts|js)$/.test(p));

  const hasVueFiles = entries.some((p) => p.endsWith('.vue'));

  const hasNuxtConfig = entries.some((p) => /nuxt\.config\.(ts|js)$/.test(p));

  const hasNextSignals = hasApp || hasPage || entries.some((p) => /\/layout\.(tsx|jsx|ts|js)$/.test(p));

  const hasReactSignals =
    entries.some((p) => /(main|index|app)\.(tsx|jsx)$/.test(p)) ||
    entries.some((p) => {
      const file = files[p];

      return (
        file?.content.includes('react') || file?.content.includes('ReactDOM') || file?.content.includes('createRoot')
      );
    });

  let projectType: ExhibitProjectType = 'vanilla';

  if (packageJson) {
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (deps?.next) projectType = 'next';
    else if (deps?.react || deps?.['react-dom']) projectType = 'react';
    else if (deps?.vue) projectType = 'vue';
    else if (deps?.nuxt) projectType = 'nuxt';
  }
  // ----------------------------------------
  // 2. HEURISTICS (FALLBACK ONLY)
  // ----------------------------------------
  if (projectType === 'vanilla') {
    if (hasNextSignals) projectType = 'next';
    else if (hasReactSignals) projectType = 'react';
    else if (hasNuxtConfig) projectType = 'nuxt';
    else if (hasVueFiles) projectType = 'vue';
  }

  const runtime = resolveRuntime(projectType, entries);

  const seeds = loadFrameworkSeeds(projectType);

  const exhibitManifest = {
    slug,
    root: folderPath,
    files,
    entries,
    runtime,
    seeds,
    extensions: [...extensions],

    hasApp,
    hasPage,

    projectType,
  };
  return exhibitManifest;
}
