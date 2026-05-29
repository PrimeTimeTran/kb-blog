import type { ContentRequest, ResolvedContentSource } from '../../types';

import { ROOT } from '@/lib/paths';
import fs from 'fs';
import path from 'path';

export async function resolve({ type, slug }: ContentRequest): Promise<ResolvedContentSource | null> {
  const base = path.join(ROOT, 'data', type);

  const normalizedSlug = slug.replace(/\/+$/, '');

  const candidates = [
    path.join(base, normalizedSlug, 'index.mdx'),
    path.join(base, normalizedSlug, 'index.md'),
    path.join(base, `${normalizedSlug}.mdx`),
    path.join(base, `${normalizedSlug}.md`),
  ];

  const filePath = candidates.find(fs.existsSync);

  if (!filePath) return null;

  return {
    id: `${type}:${normalizedSlug}`,
    type,
    slug: normalizedSlug,
    filePath,
    extension: path.extname(filePath),
    source: 'filesystem',
  };
}
