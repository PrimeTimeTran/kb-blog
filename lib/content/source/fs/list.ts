import { ROOT } from '@/lib/paths';
import path from 'path';
import { walk } from '@/lib/fs';

export async function list(input: { type: string }): Promise<string[]> {
  const dir = path.join(ROOT, 'data', input.type);

  const slugs: string[] = [];

  await walk(dir, { includeExtensions: ['.md', '.mdx'] });

  return slugs;
}
