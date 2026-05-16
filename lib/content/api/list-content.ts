import { slug as toSlug } from 'github-slugger'

import { isPublished } from '../core/is-published'

import { createPipelineContext } from '../pipeline/runtime'
import { buildParsePipeline } from '../pipeline/runtime/build-runtime-pipeline'

import type { ContentItem, ContentCollection, ContentListConfig } from '../core/types'

export async function listContent(
  options: {
    collection: ContentCollection
    config?: ContentListConfig
  },
  query: {
    type: string
    action: string
  } & Record<string, unknown>
) {
  const { collection, config } = options

  const entries = await collection.list()
  const results: ContentItem[] = []

  for (const slug of entries) {
    const raw = await collection.read(slug)

    const ctx = createPipelineContext({
      request: {
        type: query.type,
        slug,
      },
      source: raw.source,
      raw,
    })

    const pipeline = buildParsePipeline(ctx)
    const result = await pipeline.run(raw)

    // -----------------------
    // SYSTEM POLICY (drafts)
    // -----------------------
    const published = isPublished(result.frontMatter?.date)

    if (!published && !config?.includeDrafts) {
      continue
    }

    const item: ContentItem = {
      slug,
      type: query.type,
      title: result.frontMatter?.title ?? '',
      date: result.frontMatter?.date ?? '',
      summary: result.frontMatter?.summary ?? '',
      frontMatter: result.frontMatter,
    }

    if (!item.title.trim()) {
      continue
    }

    if (!item.summary.trim()) {
      continue
    }
    // -----------------------
    // USER FILTER
    // -----------------------
    if (config?.filter && !config.filter(item)) {
      continue
    }
    results.push(item)
  }

  if (query.action === 'countBy') {
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

  if (query.action === 'countBy') {
    return countTags(query, results)
  }

  if (query.action === 'filterBy') {
    return filterFor(query, results)
  }

  // -----------------------
  // SORTING
  // -----------------------
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
