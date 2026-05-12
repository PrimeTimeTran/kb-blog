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

    const item: ContentItem = {
      slug,
      type: query.type,
      title: result.frontMatter?.title ?? '',
      date: result.frontMatter?.date ?? '',
      summary: result.frontMatter?.summary ?? '',
      frontMatter: result.frontMatter,
    }

    // -----------------------
    // SYSTEM POLICY (drafts)
    // -----------------------
    const published = isPublished(item)

    if (!published || !config?.includeDrafts) {
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

  // -----------------------
  // SORTING
  // -----------------------
  if (config?.sort) {
    results.sort(config.sort)
  }

  return results
}
