import type { FileRecord, ManifestOptions, TreeNode, VirtualFileSystem } from '@/lib/types';

import { assertInside } from '../paths';
import fs from 'fs';
import path from 'path';

type WalkInput = {
  dir: string;
  root?: string;
  include?: RegExp;
  ignoreDirs?: string[];
  includeExtensions?: string[];
};

export function walkFS<T>(
  input: WalkInput,
  map: (file: { absPath: string; relPath: string; name: string; ext: string; content: string }) => T,
): T[] {
  const root = input.root ?? input.dir;
  const out: T[] = [];

  const regex = input.include instanceof RegExp ? input.include : input.include ? new RegExp(input.include) : /.*/;

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const absPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (input.ignoreDirs?.some((d) => absPath.includes(d))) continue;
        walk(absPath);
        continue;
      }

      if (!entry.isFile()) continue;

      if (!regex.test(entry.name)) continue;

      const content = fs.readFileSync(absPath, 'utf8');

      // 🔥 CRITICAL FIX: match core behavior exactly
      const relPath = assertInside(root, absPath).replace(/\\/g, '/');
      const ext = path.extname(entry.name).replace('.', '');

      out.push(
        map({
          absPath,
          relPath,
          name: entry.name,
          ext,
          content,
        }),
      );
    }
  };

  walk(input.dir);

  return out;
}
export function walk<T>(
  dir: string,
  options: Omit<WalkInput, 'dir'> & {
    map: (file: FileRecord) => T;
  },
): T[] {
  return walkFS({ dir, ...options }, options.map);
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

export function buildManifestCore({ rootDir, include = /\.(tsx|ts|jsx|js|css|html|vue|md|mdx)$/ }: ManifestOptions) {
  const rawFiles: FileRecord[] = walk<FileRecord>(rootDir, { root: rootDir, map: (f) => f });
  const files: VirtualFileSystem = {};
  const entries: string[] = [];
  const extensions = new Set<string>();

  let packageJson: any = null;

  for (const file of rawFiles) {
    if (file.name === 'package.json') {
      try {
        packageJson = JSON.parse(file.content);
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    const normalized: FileRecord = {
      absPath: file.absPath,
      relPath: file.relPath,
      name: file.name,
      ext: file.ext,
      content: file.content,
    };

    files[file.relPath] = {
      kind: 'file',
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
