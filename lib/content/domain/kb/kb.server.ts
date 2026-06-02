import { buildTreeFromFiles, walk, walkFS } from '@/lib/fs/walk';

import { FileRecord } from '@/lib/types';
import { KB_DIR } from '@/lib/paths';

export async function getKbTree() {
  // walkFS({ dir: KB_DIR, ignoreDirs }, map);
  // walkFS({ dir: KB_DIR, includeExtensions: ['.md', '.mdx'] });
  // walkFS({ dir: KB_DIR }, map);
  // const rawFiles = walk(KB_DIR, {
  //   includeExtensions: ['.md', '.mdx'],
  //   map: function (file: FileRecord): unknown {
  //     return file;
  //   },
  // });

  const rawFiles = walk(KB_DIR, { ignoreDirs: ['.md', '.mdx'], map: (f) => f });

  const files = Object.fromEntries(rawFiles.map((f) => [f.relPath.replace(/^\.\//, ''), f]));

  return buildTreeFromFiles(Object.values(files));
}
