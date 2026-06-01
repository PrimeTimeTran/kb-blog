import { FrameworkSeeds, SeedFile } from '@/pkg/exhibit';

import { SEEDS_DIR } from '@/lib/paths';
import fs from 'fs';
import path from 'path';

function classifyFile(file: string): SeedFile['type'] {
  if (file.endsWith('.html')) return 'html';
  if (file.endsWith('.css')) return 'style';
  if (file.endsWith('.json')) return 'json';
  if (/\.(ts|tsx|js|jsx)$/.test(file)) return 'script';
  return 'asset';
}

export function loadFrameworkSeeds(framework: string): FrameworkSeeds {
  const root = path.join(SEEDS_DIR, framework);

  const files: Record<string, SeedFile> = {};
  const filesFlat: SeedFile[] = [];

  if (!fs.existsSync(root)) {
    console.warn(`Seed directory not found: ${root}`);
    return { framework, files, entry: null };
  }

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(full);
        continue;
      }

      const content = fs.readFileSync(full, 'utf-8');

      // 🔥 flatten to filename-only key (same VFS rule)
      const rel = path.relative(root, full).replace(/\\/g, '/').split('/').pop()!;

      files[rel] = {
        path: rel,
        content,
        type: classifyFile(entry.name),
      };
      filesFlat.push({
        path: rel,
        content,
        type: classifyFile(entry.name),
      });
    }
  };

  walk(root);

  const entry =
    files['main.tsx']?.path ??
    files['main.jsx']?.path ??
    Object.values(files).find((f) => f.type === 'html')?.path ??
    null;

  return {
    files,
    entry,
    framework,
    filesFlat,
  };
}
