import { buildTreeFromFiles, walkFiles } from '@/lib/fs/collect-files';

import { KB_DIR } from '@/lib/paths';

export async function getKbTree() {
  const rawFiles = walkFiles(KB_DIR, /\.(md|mdx)$/);

  const vfs = {
    files: Object.fromEntries(rawFiles.map((f) => [f.relPath.replace(/^\.\//, ''), f])),
  };

  return buildTreeFromFiles(vfs.files);
}
