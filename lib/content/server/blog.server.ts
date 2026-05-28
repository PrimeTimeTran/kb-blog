import fs from 'fs';
import { getRootPath } from '@/lib/paths';
import { isPublished } from '@/lib/content';
import matter from 'gray-matter';
import { walk } from '@/lib/fs';

export async function getAllFrontMatter(type) {
  const base = getRootPath('data', type);

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
