import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { KB_DIR } from '../../core/constants'
import { normalizeTree } from '../../core/normalize'
import getAllFilesRecursively from '../../server/files'

export async function getKbTree() {
  const files = await getAllFilesRecursively(KB_DIR)

  const tree = {}

  for (const filePath of files) {
    const relative = filePath
      .replace(/\\/g, '/')
      .replace(KB_DIR.replace(/\\/g, '/'), '')
      .replace(/\.(md|mdx)$/, '')
      .replace(/^\//, '')

    const parts = relative.split('/')

    let current = tree
    let pathSoFar = ''

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1

      pathSoFar = pathSoFar ? `${pathSoFar}/${part}` : part

      if (!current[part]) {
        current[part] = {
          name: part,
          children: {},
          file: null,
          slug: pathSoFar,
        }
      }

      if (isFile) {
        current[part].file = pathSoFar
      }

      current = current[part].children
    }
  }

  return normalizeTree(tree)
}

export async function buildKbRegistry() {
  const files = await getAllFilesRecursively(KB_DIR)

  const registry = {}
  for (const file of files) {
    try {
      const source = fs.readFileSync(file, 'utf8')
      const parsed = matter(source)

      const slug = file
        .replace(KB_DIR, '')
        .replace(/\.mdx?$/, '')
        .replace(/^\/+/, '')

      const key = path.basename(slug)

      // const Content = await compileToComponent(parsed.content)

      registry[key] = {
        // Content,
        mdxSource: parsed.content,
        frontMatter: parsed.data,
      }
    } catch (e) {
      console.error('❌ MDX FAILED:', file)
      console.error(e)
    }
  }

  return registry
}
