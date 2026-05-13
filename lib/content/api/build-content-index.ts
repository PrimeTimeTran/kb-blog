import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import getAllFilesRecursively from '../server/files'

type ContentIndexOptions = {
  rootDir: string
  filter?: (file: string) => boolean
  toKey?: (slug: string, file: string) => string
}

export async function buildContentIndex(options: ContentIndexOptions) {
  const { rootDir, filter } = options

  const files = await getAllFilesRecursively(rootDir)

  const registry: Record<string, any> = {}

  for (const file of files) {
    try {
      if (filter && !filter(file)) continue

      const source = fs.readFileSync(file, 'utf8')
      const parsed = matter(source)

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
