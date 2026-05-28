import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { isPublished } from '@/lib/content';
import { walk } from '@/lib/fs';

export async function getAllFrontMatter(type) {
  const base = path.join(process.cwd(), 'data', type);

  const files = walk(base, { includeExtensions: ['.md', '.mdx'] });

  return (files ?? [])
    .map((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(source);

      return {
        ...data,
        filePath,
        slug: filePath
          .replace(base, '')
          .replace(/\.mdx?$/, '')
          .replace(/\\/g, '/')
          .replace(/^\/|\/$/g, ''),
      };
    })
    ?.filter(isPublished);
}
