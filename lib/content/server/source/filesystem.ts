import fs from 'fs/promises';
import path from 'path';
import { toSlug } from '../files';
import { ContentSource } from '../../core/types';

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function scanDirForSlugs(dir: string, baseDir: string = dir): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const slugs: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    // ─────────────────────────────
    // DIRECTORY → RECURSE
    // ─────────────────────────────
    if (entry.isDirectory()) {
      const childSlugs = await scanDirForSlugs(full, baseDir);
      slugs.push(...childSlugs);
      continue;
    }

    // ─────────────────────────────
    // FILES
    // ─────────────────────────────
    if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      slugs.push(toSlug(full, baseDir));
    }
  }

  return slugs;
}

export function createFilesystemSource(config: { rootDir: string }): ContentSource {
  return {
    id: `fs:${config.rootDir}`,
    source: 'filesystem',

    async resolve({ type, slug }) {
      const basePath = path.join(config.rootDir, type, slug);

      const mdPath = `${basePath}.md`;
      const mdxPath = `${basePath}.mdx`;

      const resolvedPath = (await fileExists(mdPath)) ? mdPath : (await fileExists(mdxPath)) ? mdxPath : null;

      if (!resolvedPath) return null;

      return {
        id: resolvedPath,
        type,
        slug,
        filePath: resolvedPath,
        extension: path.extname(resolvedPath),
        source: 'filesystem',
      };
    },

    async read(source) {
      const raw = await fs.readFile(source.filePath, 'utf-8');

      return {
        source,
        raw,
      };
    },

    async list(type: string) {
      const dir = path.join(config.rootDir, type);
      const result = scanDirForSlugs(dir);
      return result;
    },
  };
}
