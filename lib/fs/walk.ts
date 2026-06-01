import type { FileRecord, ManifestOptions, TreeNode, VirtualFile } from '@/lib/types';

import { assertInside } from '../paths';
import fs from 'fs';
import path from 'path';

export function walkFilesCore(rootDir: string, include: RegExp | string = /.*/): FileRecord[] {
  const out: FileRecord[] = [];

  const regex = include instanceof RegExp ? include : new RegExp(include);

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(full);
        continue;
      }

      if (!entry.isFile()) continue;

      if (!regex.test(entry.name)) continue;

      const content = fs.readFileSync(full, 'utf8');

      const rel = assertInside(rootDir, full).replace(/\\/g, '/');

      out.push({
        absPath: full,
        relPath: rel,
        name: entry.name,
        ext: path.extname(entry.name).replace('.', ''),
        content,
      });
    }
  };

  walk(rootDir);

  return out;
}

export function walk<T>(
  dir: string,
  options: {
    includeExtensions?: string[];
    include?: RegExp | string;
    ignoreDirs?: string[];
    root?: string;
    map: (file: FileRecord) => T;
  },
): T[] {
  const { includeExtensions, include, ignoreDirs = [], root = dir, map } = options;

  // ----------------------------
  // normalize filter (SAFE)
  // ----------------------------

  let regex: RegExp = /.*/;

  if (include instanceof RegExp) {
    regex = include;
  } else if (typeof include === 'string') {
    regex = new RegExp(include);
  } else if (includeExtensions?.length) {
    regex = new RegExp(includeExtensions.map((e) => e.replace('.', '\\.')).join('|'));
  }

  // ----------------------------
  // reuse core walker
  // ----------------------------

  const files = walkFilesCore(dir, regex);

  // ----------------------------
  // optional ignoreDirs filter (post-pass)
  // ----------------------------

  const filtered = ignoreDirs.length ? files.filter((f) => !ignoreDirs.some((d) => f.absPath.includes(d))) : files;

  // ----------------------------
  // pure projection
  // ----------------------------

  return filtered.map(map);
}

export function buildTreeFromFiles(files: FileRecord[] | Record<string, FileRecord>): TreeNode[] {
  const list = Array.isArray(files) ? files : Object.values(files);

  const root: Record<string, any> = {};

  for (const file of list) {
    if (!file?.relPath) {
      console.warn('Invalid file in buildTreeFromFiles:', file);
      continue;
    }

    const parts = file.relPath.split('/');

    let cursor = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      const path = '/' + parts.slice(0, i + 1).join('/');

      if (!cursor[part]) {
        cursor[part] = {
          id: path,
          name: part,
          path,
          kind: isFile ? 'file' : 'folder',
          children: {},
        };
      }

      cursor = cursor[part].children;
    }
  }

  const toArray = (map: any): TreeNode[] =>
    Object.values(map).map((node: any) => ({
      ...node,
      children: node.children ? toArray(node.children) : [],
    }));

  return toArray(root);
}

export function walkFiles(rootDir: string, include: RegExp) {
  const results: VirtualFile[] = [];

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
  const rawFiles = walkFilesCore(rootDir, include);

  const files: Record<string, FileRecord> = {};
  const entries: string[] = [];
  const extensions = new Set<string>();

  let packageJson: any = null;

  for (const file of rawFiles) {
    if (file.name === 'package.json') {
      try {
        packageJson = JSON.parse(file.content);
      } catch {}
    }

    const normalized: FileRecord = {
      absPath: file.absPath,
      relPath: file.relPath,
      name: file.name,
      ext: file.ext,
      content: file.content,
    };

    files[file.relPath] = {
      ...normalized,
      language: inferLanguage(file.ext),
    };

    entries.push(file.relPath);
    extensions.add(file.ext);
  }

  return {
    files,
    entries,
    extensions,
    packageJson,
    rawFiles,
  };
}

export function createManifest(rootDir: string) {
  const core = buildManifestCore({ rootDir });

  return {
    files: core.files,
    entries: core.entries,
    extensions: core.extensions,
    packageJson: core.packageJson,

    tree: buildTreeFromFiles(core.rawFiles), // 🔥 no recomputation
  };
}

export function inferLanguage(ext: string): string {
  switch (ext.toLowerCase()) {
    case 'ts':
      return 'typescript';

    case 'tsx':
      return 'tsx';

    case 'js':
      return 'javascript';

    case 'jsx':
      return 'jsx';

    case 'css':
      return 'css';

    case 'html':
      return 'html';

    case 'json':
      return 'json';

    case 'md':
    case 'mdx':
      return 'markdown';

    case 'vue':
      return 'vue';

    case 'dart':
      return 'dart';

    case 'yaml':
    case 'yml':
      return 'yaml';

    default:
      return 'text';
  }
}
