import { slug as toSlug } from 'github-slugger'

import { isPublished } from '../core/is-published'

import { createPipelineContext } from '../pipeline/runtime'
import { buildParsePipeline } from '../pipeline/runtime/build-runtime-pipeline'

import type { ContentItem, ContentCollection, ContentListConfig } from '../core/types'
import { toContentEntity, toContentItem } from '../core/content'

export async function listContent(
  options: {
    collection: ContentCollection
    config?: ContentListConfig
  },
  query: {
    type: string
    action?: string
  } & Record<string, unknown>
) {
  const { collection, config } = options

  const entries = await collection.list()
  const results: ContentItem[] = []

  // -----------------------
  // BUILD PIPELINE RESULTS
  // -----------------------
  for (const slug of entries) {
    const raw = await collection.read(slug)
    if (!raw) continue

    const ctx = createPipelineContext({
      request: {
        type: query.type,
        slug,
      },
      source: raw.source,
      raw,
    })

    // ─────────────────────────────
    // 1. PARSE
    // ─────────────────────────────
    const result = await buildParsePipeline(ctx).run(raw)
    const entity = Object.freeze(toContentEntity(result))

    // ─────────────────────────────
    // 4. PUBLISH FILTER
    // ─────────────────────────────
    const published = isPublished(entity)
    if (entity.frontMatter?.title == 'DEV: Code blocks') {
      console.log(`process.env.NODE_ENV === 'development'`, process.env.NODE_ENV === 'development')
      console.log('entity', entity.frontMatter.title)
      console.log('entity', entity.frontMatter)
      console.log('shouldShow', published)
    }
    if (!published) continue
    // purpose of checking the same field twice is that config.includeDrafts is a SYSTEM config whereas the first is USER
    // if (config?.includeDrafts) continue

    // ─────────────────────────────
    // 5. UI PROJECTION
    // ─────────────────────────────
    const item = toContentItem(entity)

    if (item.title && !item.title.trim()) continue
    if (item.summary && !item.summary.trim()) continue
    // if (config?.filter && !config.filter(item)) continue

    results.push(item)
  }

  // =========================================================
  // 1. TAG INDEX ROUTE → /tags
  // =========================================================
  if (query.action === 'countBy') {
    const by = query.by as string

    const counts: Record<string, number> = {}

    for (const item of results) {
      const values = item.frontMatter?.[by]

      if (!Array.isArray(values)) continue

      for (const v of values) {
        const key = toSlug(String(v))
        counts[key] = (counts[key] || 0) + 1
      }
    }

    return counts
  }

  // =========================================================
  // 2. FILTERED ROUTE → /tags/react-native
  // =========================================================
  if (query.action === 'filterBy') {
    return filterFor(query, results)
  }

  // =========================================================
  // 3. DEFAULT → full list (optional fallback)
  // =========================================================
  if (config?.sort) {
    results.sort(config.sort)
  }

  return results
}

function countTags(
  query: { type: string; action: string } & Record<string, unknown>,
  results: ContentItem[]
) {
  const by = query.by as string

  const counts: Record<string, number> = {}

  for (const item of results) {
    const values = item.frontMatter?.[by]

    if (!Array.isArray(values)) continue

    for (const v of values) {
      const key = toSlug(v)
      counts[key] = (counts[key] || 0) + 1
    }
  }

  return counts
}

function filterFor(
  query: { type: string; action: string } & Record<string, unknown>,
  results: ContentItem[]
) {
  const items: ContentItem[] = []

  const by = query.by as string
  const match = query.match as string
  const value = toSlug(String(query.value ?? ''))

  for (const item of results) {
    const fieldValue = item.frontMatter?.[by]

    // Array fields (tags, authors, categories, etc)
    if (Array.isArray(fieldValue)) {
      const normalized = fieldValue.map((v) => toSlug(String(v)))

      if (match === 'includes' && normalized.includes(value)) {
        items.push(item)
      }

      continue
    }

    if (typeof fieldValue === 'string') {
      const normalized = toSlug(fieldValue)

      if (match === 'equals' && normalized === value) {
        items.push(item)
      }

      continue
    }
  }

  return items
}
