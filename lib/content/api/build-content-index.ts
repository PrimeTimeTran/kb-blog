import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import getAllFilesRecursively from '../server/files'
import { isPublished } from '../core/is-published'

type ContentIndexOptions = {
  rootDir: string
  filter?: (file: string) => boolean
  toKey?: (slug: string, file: string) => string
}
const ALLOWED_EXTENSIONS = new Set(['.md', '.mdx'])

export async function buildContentIndex(options: ContentIndexOptions) {
  let { rootDir, filter } = options

  rootDir = path.join(rootDir, 'kb')

  const files = await getAllFilesRecursively(rootDir)

  const registry: Record<string, any> = {}
  for (const file of files) {
    try {
      const ext = path.extname(file).toLowerCase()
      if (!ALLOWED_EXTENSIONS.has(ext)) continue
      if (filter && !filter(file)) continue
      const source = fs.readFileSync(file, 'utf8')
      const parsed = matter(source)
      const shouldIndex = isPublished({ frontMatter: parsed.data })
      if (!shouldIndex) continue

      const slug = path
        .relative(rootDir, file)
        .replace(/\.mdx?$/, '')
        .replace(/\\/g, '/')

      // 🔥 IMPORTANT: slug IS the key now
      registry[slug] = {
        mdxSource: parsed.content,
        frontMatter: parsed.data,
        slug,
      }
    } catch (e) {
      console.error('❌ CONTENT INDEX FAILED:', file)
      console.error(e)
    }
  }

  return registry
}
