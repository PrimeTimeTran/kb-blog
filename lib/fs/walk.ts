import fs from 'fs';
import path from 'path';

type WalkOptions = {
  includeExtensions?: string[];
  ignoreDirs?: string[];
  root?: string;
};

export function walk(dir: string, options: WalkOptions = {}) {
  const { includeExtensions, ignoreDirs = [], root = dir } = options;

  const out: Record<string, string> = {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (ignoreDirs.some((ignored) => full.startsWith(ignored))) {
        continue;
      }

      Object.assign(out, walk(full, options));
      continue;
    }

    if (!entry.isFile()) continue;

    // optional extension filter (default = include all)
    if (includeExtensions?.length) {
      const ext = path.extname(entry.name);
      if (!includeExtensions.includes(ext)) continue;
    }

    const relative = '/' + path.relative(root, full).replace(/\\/g, '/');

    const content = fs.readFileSync(full, 'utf8');
    out[relative] = content;
  }

  return out;
}
