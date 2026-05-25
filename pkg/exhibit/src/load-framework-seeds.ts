import fs from 'fs';
import path from 'path';
import { SeedFile, FrameworkSeeds } from '../types';

function classifyFile(file: string): SeedFile['type'] {
  if (file.endsWith('.html')) return 'html';
  if (file.endsWith('.css')) return 'style';
  if (file.endsWith('.json')) return 'json';
  if (/\.(ts|tsx|js|jsx)$/.test(file)) return 'script';
  return 'asset';
}

export function loadFrameworkSeeds(framework: string): FrameworkSeeds {
  const root = path.join(process.cwd(), 'pkg/exhibit/seeds', framework);

  const files: SeedFile[] = [];

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

      const rel = path.relative(root, full).replace(/\\/g, '/');

      files.push({
        path: rel,
        content,
        type: classifyFile(entry.name),
      });
    }
  };

  walk(root);

  // pick entry intelligently (optional)
  const entry =
    files.find((f) => f.path.endsWith('main.tsx'))?.path ??
    files.find((f) => f.path.endsWith('main.jsx'))?.path ??
    files.find((f) => f.type === 'html')?.path ??
    null;

  return {
    framework,
    files,
    entry,
  };
}
