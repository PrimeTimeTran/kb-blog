import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ROOT } from '../../content/core/constants'
import { bundle } from '../../content/server/bundle'
import { log } from '../../debug/logger'

import { getKbIndex } from '../../content/core/kb'

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

  const normalizedSlug = slug.replace(/\/+$/, '')

  const candidates = [
    path.join(base, normalizedSlug, 'index.mdx'),
    path.join(base, normalizedSlug, 'index.md'),
    path.join(base, `${normalizedSlug}.mdx`),
    path.join(base, `${normalizedSlug}.md`),
  ]

  const filePath = candidates.find((p) => fs.existsSync(p)) ?? null

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
