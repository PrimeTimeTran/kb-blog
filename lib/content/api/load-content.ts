// Context:
// Runtime debugging engine
// - trace = execution lane
// - event = step
// - pick = array navigation
// - inspect = deep object drilldown
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { ROOT } from '../core/constants'
import { bundle } from '../server/keep.bundle'
import { createTrace } from '../../debug/log'

import { getKbIndex } from './kb'

export async function buildMDXContext(overrides = {}) {
  const kbIndex = await getKbIndex()

  return {
    slug: overrides.slug || '',
    terms: overrides.terms || {},
    registry: overrides.registry || {},
    kbIndex,
  }
}

// export async function loadContent(type, slug) {
//   const trace = createTrace('mdx')

//   // ─────────────────────────────
//   // INIT
//   // ─────────────────────────────
//   trace.event('LOAD_CONTENT_START', {
//     type,
//     slug,
//   })

//   if (Array.isArray(slug)) {
//     slug = slug.join('/')
//   }

//   const base = path.join(ROOT, 'data', type)
//   const normalizedSlug = slug.replace(/\/+$/, '')

//   // ─────────────────────────────
//   // FILE RESOLUTION
//   // ─────────────────────────────
//   const candidates = [
//     path.join(base, normalizedSlug, 'index.mdx'),
//     path.join(base, normalizedSlug, 'index.md'),
//     path.join(base, `${normalizedSlug}.mdx`),
//     path.join(base, `${normalizedSlug}.md`),
//   ]

//   const filePath = candidates.find((p) => fs.existsSync(p)) ?? null

//   trace.pick(candidates, 2)

//   if (!filePath) {
//     trace.warn('FILE_NOT_FOUND', { candidates })
//     return null
//   }

//   trace.event('FILE_RESOLVED', { resolved: true })

//   trace.setContext({ filePath })

//   // ─────────────────────────────
//   // READ + PARSE
//   // ─────────────────────────────
//   const source = fs.readFileSync(filePath, 'utf8')
//   const parsed = matter(source)

//   trace.event('FRONTMATTER_PARSED', {
//     keys: Object.keys(parsed.data),
//     contentLength: parsed.content.length,
//   })

//   // ─────────────────────────────
//   // MDX COMPILE CONTEXT
//   // ─────────────────────────────
//   const context = await buildMDXContext({ slug })

//   trace.event('MDX_CONTEXT_BUILT')

//   // ─────────────────────────────
//   // BUNDLE
//   // ─────────────────────────────
//   const result = await bundle(parsed.content, slug, context)

//   trace.event('MDX_BUNDLED', {
//     resultKeys: Object.keys(result),
//     frontMatterKeys: Object.keys(result.frontMatter || {}),
//   })

//   // ─────────────────────────────
//   // RETURN
//   // ─────────────────────────────
//   const finalResult = {
//     type,
//     slug,
//     filePath,
//     mdxSource: parsed.content,
//     Content: result.Content,
//     toc: result.toc || [],
//     frontMatter: {
//       ...parsed.data,
//       ...result.frontMatter,
//     },
//   }

//   trace.event('LOAD_CONTENT_DONE', {
//     hasToc: !!result.toc?.length,
//     hasFrontMatter: !!result.frontMatter,
//   })

//   trace.end()

//   return finalResult
// }

export async function loadContent(type, slug) {
  const trace = createTrace('mdx')

  trace.event('LOAD_CONTENT_START', {
    type,
    slug,
  })

  if (Array.isArray(slug)) {
    slug = slug.join('/')
  }

  const normalizedSlug = slug.replace(/\/+$/, '')

  const filePath = await trace.span('resolve-file', async () => {
    const base = path.join(ROOT, 'data', type)

    const candidates = [
      path.join(base, normalizedSlug, 'index.mdx'),
      path.join(base, normalizedSlug, 'index.md'),
      path.join(base, `${normalizedSlug}.mdx`),
      path.join(base, `${normalizedSlug}.md`),
    ]

    trace.event('RESOLVE_CANDIDATES', candidates)

    return candidates.find((p) => fs.existsSync(p)) ?? null
  })

  if (!filePath) {
    trace.event('FILE_NOT_FOUND')
    trace.end()
    return null
  }

  trace.setContext({ filePath })

  const source = await trace.span('read-file', () => fs.readFileSync(filePath, 'utf8'))

  const parsed = await trace.span('parse-frontmatter', () => matter(source))

  const context = await trace.span('build-context', () => buildMDXContext({ slug }))

  const result = await trace.span('bundle-mdx', () => bundle(parsed.content, slug, context))

  trace.end()

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
