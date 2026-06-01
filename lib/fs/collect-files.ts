import type { ManifestOptions, VFSFile, VFSNode } from '@/lib/types';

import { assertInside } from '../paths';
import fs from 'fs';
import path from 'path';

export function buildTreeFromFiles(files: Record<string, any>): VFSNode[] {
  const root: Record<string, any> = {};

  for (const fullPath of Object.keys(files)) {
    const cleanPath = fullPath.replace(/^\.\//, '');
    const parts = cleanPath.split('/');

    let cursor = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      const nodePath = `./${parts.slice(0, i + 1).join('/')}`;

      if (!cursor[part]) {
        cursor[part] = {
          id: nodePath,
          name: part,
          path: nodePath,
          kind: isFile ? 'file' : 'folder',
          children: {},
        };
      } else if (!isFile) {
        cursor[part].kind = 'folder';
      }

      cursor = cursor[part].children;
    }
  }

  const toArray = (map: Record<string, any>): VFSNode[] =>
    Object.values(map)
      .map((node: any) => ({
        ...node,
        children: node.children ? toArray(node.children) : [],
      }))
      .sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });

  return toArray(root);
}
export function walkFiles(rootDir: string, include: RegExp) {
  const results: VFSFile[] = [];

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile()) continue;

      if (!include.test(entry.name)) continue;

      const content = fs.readFileSync(fullPath, 'utf-8');

      const rel = assertInside(rootDir, fullPath);
      const relPath = rel.replace(/\\/g, '/');

      const ext = entry.name.split('.').pop() ?? 'js';

      results.push({
        ext,
        content,
        relPath,
        absPath: fullPath,
        name: entry.name,
      });
    }
  };

  walk(rootDir);

  return results;
}
export function buildManifestCore({ rootDir, include = /\.(tsx|ts|jsx|js|css|html|vue|md|mdx)$/ }: ManifestOptions) {
  const files: Record<string, any> = {};
  const entries: string[] = [];
  const extensions = new Set<string>();
  let packageJson: any = null;

  const rawFiles = walkFiles(rootDir, include);

  for (const file of rawFiles) {
    if (file.name === 'package.json') {
      try {
        packageJson = JSON.parse(file.content);
      } catch (error) {
        console.log('Error', error);
      }
    }

    files[file.relPath] = {
      content: file.content,
      language: file.ext === 'tsx' || file.ext === 'jsx' ? 'jsx' : file.ext === 'ts' ? 'typescript' : file.ext,
    };

    entries.push(file.relPath);
    extensions.add(file.ext);
  }

  return { files, entries, extensions, packageJson };
}
