import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ROOT } from '@/lib/content/core/constants'
import { bundle } from '@/lib/content/server/bundle'
import { log } from '@/lib/debug/logger'

import { getKbIndex } from '@/lib/content/core/kb'

export async function buildMDXContext(overrides = {}) {
  const kbIndex = await getKbIndex()

  return {
    slug: overrides.slug || '',
    terms: overrides.terms || {},
    registry: overrides.registry || {},
    kbIndex,
  }
}

export async function loadContent(type, slug) {
  if (Array.isArray(slug)) slug = slug.join('/')

  const base = path.join(ROOT, 'data', type)

  const mdxPath = path.join(base, `${slug}.mdx`)
  const mdPath = path.join(base, `${slug}.md`)

  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filePath) return null

  const source = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(source)

  const context = await buildMDXContext({ slug })
  const result = await bundle(parsed.content, slug, context)
  log.mdx('loadContent: ')
  log.mdx('loadContent content: ', parsed.content)
  log.mdx('loadContent result: ', result)
  return {
    type,
    slug,
    filePath,
    mdxSource: parsed.content,
    Content: result.Content,
    toc: result.toc || [],
    frontMatter: {
      ...parsed.data,
      ...result.frontMatter,
    },
  }
}
