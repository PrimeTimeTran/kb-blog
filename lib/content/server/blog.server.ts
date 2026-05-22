import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { isPublished } from '../core/is-published';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (entry.isFile() && /\.(mdx?|md)$/.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

export async function getAllFrontMatter(type) {
  const base = path.join(process.cwd(), 'data', type);

  const files = walk(base);

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
