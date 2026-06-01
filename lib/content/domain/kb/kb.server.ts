import { buildTreeFromFiles, walkFiles } from '@/lib/fs/walk';

import { KB_DIR } from '@/lib/paths';

export async function getKbTree() {
  const rawFiles = walkFiles(KB_DIR, /\.(md|mdx)$/);

  const files = Object.fromEntries(rawFiles.map((f) => [f.relPath.replace(/^\.\//, ''), f]));

  return buildTreeFromFiles(Object.values(files));
}
