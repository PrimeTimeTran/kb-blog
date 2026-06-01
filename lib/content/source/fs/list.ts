import { CONTENT_DIR } from '@/lib/paths';
import path from 'path';
import { walk } from '@/lib/fs';

export async function list(input: { type: string }): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, input.type);
  const slugs: string[] = [];

  await walk(dir, { includeExtensions: ['.md', '.mdx'] });

  return slugs;
}
