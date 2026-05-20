import type { ContentCollection, ContentGetConfig } from '../core/types'

import { createTrace } from '../../debug/log'

import { createPipelineContext } from '../pipeline/runtime/create-pipeline-context'
import {
  buildParsePipeline,
  buildCompilePipeline,
} from '../pipeline/runtime/build-runtime-pipeline'
import { buildContentIndex } from './build-content-index'
import { analyzeContent, toContentEntity, toContentItem } from '../core/content'
import { extractTOC } from '../core/extract-toc'

export async function getContent(
  options: {
    collection: ContentCollection
    config?: ContentGetConfig
  },
  query: {
    type: string
    slug: string
  } & Record<string, unknown>
) {
  const { collection, config } = options

  const trace = createTrace('content:get')

  const { type, slug } = query

  if (!type || !slug) {
    trace.event('INVALID_INPUT', { type, slug })
    trace.end()
    return null
  }
  trace.event('valid', { type, slug })

  // ─────────────────────────────
  // READ RAW CONTENT
  // ─────────────────────────────
  const raw = await collection.read(slug)
  if (!raw) {
    trace.event('NOT_FOUND', { slug })
    trace.end()
    return null
  }
  const rootDir = collection.id?.replace(/^fs:/, '') ?? process.cwd()
  const typeIndex = process.env.NODE_ENV === 'test' ? {} : await buildContentIndex({ rootDir })
  const analysis = analyzeContent(raw.raw)

  // ─────────────────────────────
  // CREATE PIPELINE CONTEXT
  // ─────────────────────────────
  const ctx = createPipelineContext({
    request: { type, slug },
    raw,
    index: typeIndex,
    source: raw.source,
    analysis,
  })

  const parsedCtx = await buildParsePipeline(ctx).run(raw)
  if (!parsedCtx.analysis.published) {
    return null
  }
  await buildCompilePipeline(ctx).run()

  const entity = toContentEntity(ctx)
  if (config?.includeDrafts) {
    trace.event('DRAFT_SKIPPED', { slug })
    trace.end()
    return null
  }

  const item = toContentItem(entity)

  // ─────────────────────────────
  // USER FILTER
  // ─────────────────────────────
  if (config?.filter && !config.filter(item)) {
    trace.event('FILTERED_OUT', { slug })
    trace.end()
    return null
  }

  trace.event('RESULT', {
    type,
    slug,
  })

  trace.end()
  return {
    ...item,
    mdxSource: raw.raw,
    toc: extractTOC(raw.raw),
    Content: ctx.compile?.Content,
  }
}
