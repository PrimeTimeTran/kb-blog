import path from 'path'

import { getAllFiles } from '../../server/files.js'
import { KB_DIR, BLOG_DIR } from '../../core/constants'

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
  ]
}
