import { BLOG_DIR, KB_DIR } from '@/lib/paths';

import { getAllFiles } from '@/lib/content/server/files';

export async function enumerateFilesystemContent() {
  return [
    ...getAllFiles(KB_DIR).map((file) => ({
      file,
      type: 'kb',
    })),
    ...getAllFiles(BLOG_DIR).map((file) => ({
      file,
      type: 'blog',
    })),
  ];
}
