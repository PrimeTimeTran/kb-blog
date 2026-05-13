import { createTrace } from '../../debug/log'
import { isPublished } from '../core/is-published'

import { createPipelineContext } from '../pipeline/runtime'
import { buildParsePipeline } from '../pipeline/runtime/build-runtime-pipeline'
import type {
  ContentItem,
  ContentRegistry,
  ContentCollection,
  ContentListConfig,
  ContentClientConfig,
} from '../core/types'

// export async function listContent(
//   {
//     type,
//     collection,
//     filter,
//   }: {
//     type: string
//     collection: ContentCollection
//     filter?: (item: ContentItem) => boolean
//   },
//   registry: ContentRegistry
// ) {
//   const entries = await collection.list()
//   const results: ContentItem[] = []

//   for (const slug of entries) {
//     const raw = await collection.read(slug)

//     // NOTE:
//     // Works on
//     // http://localhost:3000/
//     // By returning null/undefined/no error
//     const ctx = createPipelineContext({
//       registry,
//       request: {
//         type,
//         slug,
//       },
//       raw,
//     })
//     const parsePipeline = buildParsePipeline(ctx)
//     const result = await parsePipeline.run(raw)

//     results.push({
//       slug,
//       type,
//       title: result.frontMatter?.title ?? '',
//       date: result.frontMatter?.date ?? '',
//       summary: result.frontMatter?.summary ?? '',
//     })
//   }

//   return filter ? results.filter(filter) : results
// }

export async function listContent(
  options: {
    registry: ContentRegistry
    collection: ContentCollection
    config?: ContentListConfig
  },
  query: {
    type: string
  } & Record<string, unknown>
) {
  const { collection, registry, config } = options

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
    console.log({ item })

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
