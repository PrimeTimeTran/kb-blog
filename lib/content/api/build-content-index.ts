import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { createTrace } from '@/lib/trace';
import { isPublished, getAllFilesRecursively } from '@/lib/content';

// import getAllFilesRecursively from '@/lib/content/server/files';

type ContentIndexOptions = {
  rootDir: string;
  filter?: (file: string) => boolean;
  toKey?: (slug: string, file: string) => string;
};
const ALLOWED_EXTENSIONS = new Set(['.md', '.mdx']);

export async function buildContentIndex(options: ContentIndexOptions) {
  const trace = createTrace('content:index');

  let { rootDir, filter } = options;
  rootDir = path.join(rootDir, 'kb');

  trace.mark('START', { rootDir });

  const files = await getAllFilesRecursively(rootDir);

  trace.mark('FILES_FOUND', {
    count: files.length,
  });

  const registry: Record<string, any> = {};

  let skippedExt = 0;
  let skippedFilter = 0;
  let skippedPublished = 0;
  let failed = 0;

  for (const file of files) {
    try {
      const ext = path.extname(file).toLowerCase();

      if (!ALLOWED_EXTENSIONS.has(ext)) {
        skippedExt++;
        continue;
      }

      if (filter && !filter(file)) {
        skippedFilter++;
        continue;
      }

      const source = fs.readFileSync(file, 'utf8');
      const parsed = matter(source);

      const isPub = isPublished({ frontMatter: parsed.data });

      if (!isPub) {
        skippedPublished++;
        trace.mark('SKIP_UNPUBLISHED', {
          file,
          slug: file,
        });
        continue;
      }

      const slug = path
        .relative(rootDir, file)
        .replace(/\.mdx?$/, '')
        .replace(/\\/g, '/');

      registry[slug] = {
        mdxSource: parsed.content,
        frontMatter: parsed.data,
        slug,
      };

      trace.mark('INDEXED', {
        slug,
        file,
      });
    } catch (e) {
      failed++;

      trace.mark('INDEX_ERROR', {
        file,
        error: e instanceof Error ? e.message : String(e),
      });

      console.error('❌ CONTENT INDEX FAILED:', file);
      console.error(e);
    }
  }

  trace.mark('DONE', {
    total: files.length,
    indexed: Object.keys(registry).length,
    skippedExt,
    skippedFilter,
    skippedPublished,
    failed,
  });

  trace.end();

  return registry;
}
