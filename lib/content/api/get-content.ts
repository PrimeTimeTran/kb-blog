import type { ContentCollection, ContentGetConfig } from '../core/types'

import { createTrace } from '../../debug/log'

import { createPipelineContext } from '../pipeline/runtime/create-pipeline-context'
import {
  buildParsePipeline,
  buildCompilePipeline,
} from '../pipeline/runtime/build-runtime-pipeline'
import { extractTOC } from '../core/extract-toc'
import { isPublished } from '../core/is-published'
import { buildContentIndex } from './build-content-index'
import { extractHeadings } from '@/lib/remark/extract-headings'

function analyzeContent(source) {
  return {
    toc: extractTOC(source),
    headings: extractHeadings(source),
  }
}

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

  // ─────────────────────────────
  // READ RAW CONTENT
  // ─────────────────────────────
  const raw = await collection.read(slug)

  if (!raw) {
    trace.event('NOT_FOUND', { slug })
    trace.end()
    return null
  }
  const rootDir = collection.id.replace(/^fs:/, '')
  const typeIndex = await buildContentIndex({
    rootDir: rootDir,
    toKey: (slug) => slug.toLowerCase(),
  })
  const analysis = analyzeContent(raw.raw)

  // ─────────────────────────────
  // CREATE PIPELINE CONTEXT
  // ─────────────────────────────
  const ctx = createPipelineContext({
    request: {
      type,
      slug,
    },
    raw,
    index: typeIndex,
    source: raw.source,
    analysis,
  })

  // ─────────────────────────────
  // PARSE PIPELINE
  // ─────────────────────────────
  const parsePipeline = buildParsePipeline(ctx)
  await parsePipeline.run(raw)
  // ─────────────────────────────
  // COMPILE PIPELINE
  // ─────────────────────────────
  //
  const compilePipeline = buildCompilePipeline(ctx)

  await compilePipeline.run()

  const item = {
    type,
    slug,
    mdxSource: raw.raw,
    // Note:
    // Passing the TOC this was prevent an infinite loop client-side.
    toc: extractTOC(raw.raw),
    filePath: raw.source.filePath,
    // This property is a React component/function
    Content: ctx.compile?.Content,
    frontMatter: ctx.frontMatter ?? {},
  }

  // ─────────────────────────────
  // DRAFT FILTERING
  // ─────────────────────────────
  const published = isPublished(item)

  if (!published && !config?.includeDrafts) {
    trace.event('DRAFT_SKIPPED', { slug })
    trace.end()
    return null
  }

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

  return item
}
