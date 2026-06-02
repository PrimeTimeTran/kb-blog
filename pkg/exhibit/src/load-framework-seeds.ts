import { FileDescriptor, FileRole, SeedConfig, SeedFile, SeedFileType } from '@/lib/types';

import { SEEDS_DIR } from '@/lib/paths';
import fs from 'fs';
import path from 'path';
import { walkFS } from '@/lib/fs/walk';

export function inferFileDescriptor(file: string): FileDescriptor {
  const lower = file.toLowerCase();

  const is = (ext: string) => lower.endsWith(ext);
  const has = (s: string) => lower.includes(s);

  // -------------------
  // TYPE
  // -------------------
  let type: SeedFileType = 'asset';

  if (is('.html')) type = 'html';
  else if (is('.css')) type = 'style';
  else if (is('.json')) type = 'json';
  else if (/\.(ts|tsx|js|jsx)$/.test(lower)) type = 'script';

  // -------------------
  // ROLE
  // -------------------
  let role: FileRole = 'seed';

  if (has('runtime/') || has('mount') || has('bootstrap')) {
    role = 'runtime';
  }

  if (has('.vfs') || has('temp')) {
    role = 'vfs';
  }

  return { type, role };
}
function classifyFile(file: string): SeedFile['type'] {
  const lower = file.toLowerCase();

  if (lower.endsWith('.html')) return 'html';
  if (lower.endsWith('.css')) return 'style';
  if (lower.endsWith('.json')) return 'json';
  if (/\.(ts|tsx|js|jsx)$/.test(lower)) return 'script';

  return 'asset';
}

export function loadFrameworkSeeds(framework: string): SeedConfig {
  const root = path.join(SEEDS_DIR, framework);

  if (!fs.existsSync(root)) {
    console.warn(`Seed directory not found: ${root}`);
    return {
      framework,
      files: {},
      filesFlat: [],
      entry: null,
    };
  }

  const filesFlat = walkFS<SeedFile>({ dir: root }, (f) => ({
    kind: 'seed',
    path: f.relPath,
    relPath: f.relPath,
    absPath: f.absPath,
    content: f.content,
    type: classifyFile(f.name),
  }));

  // const filesFlat = walk<SeedFile>(root, {
  //   include: /\.(ts|tsx|js|jsx|html|css|json)$/,

  //   map: (file) => ({
  //     kind: 'seed',
  //     path: file.relPath,
  //     content: file.content,
  //     type: classifyFile(file.name),
  //   }),
  // });

  const files: Record<string, SeedFile> = {};

  for (const file of filesFlat) {
    files[file.relPath] = file;
  }

  const entry =
    files['main.tsx']?.path ?? files['main.jsx']?.path ?? filesFlat.find((f) => f.type === 'html')?.path ?? null;

  return {
    framework,
    files,
    filesFlat,
    entry,
  };
}
