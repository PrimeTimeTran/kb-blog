import { BLOG_DIR } from '@/lib/paths';
import fs from 'fs';
import { isPublished } from '@/lib/content/core';
import matter from 'gray-matter';
import { walk } from '@/lib/fs';

export async function getAllFrontMatter(type) {
  const files = walk(BLOG_DIR, { includeExtensions: ['.md', '.mdx'] });

  return (files ?? [])
    .map((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(source);

      return {
        ...data,
        filePath,
        slug: filePath
          .replace(BLOG_DIR, '')
          .replace(/\.mdx?$/, '')
          .replace(/\\/g, '/')
          .replace(/^\/|\/$/g, ''),
      };
    })
    ?.filter(isPublished);
}
