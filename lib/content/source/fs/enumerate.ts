import { KB_DIR, BLOG_DIR, getAllFiles } from '@/lib/content';

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
