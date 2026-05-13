import type { ContentCollection, ContentRegistry } from '../core/types'

import { createTrace } from '../../debug/log'

import { createPipelineContext } from '../pipeline/runtime/create-pipeline-context'
import {
  buildParsePipeline,
  buildCompilePipeline,
} from '../pipeline/runtime/build-runtime-pipeline'
import { extractTOC } from '../core/extract-toc'

export async function getContent(
  {
    type,
    slug,
    collection,
  }: {
    type: string
    slug: string
    collection: ContentCollection
  },
  registry: ContentRegistry
) {
  const trace = createTrace('content:get')

  if (!type || !slug) {
    trace.event('INVALID_INPUT', { type, slug })
    trace.end()
    return null
  }

  // ─────────────────────────────
  // READ RAW CONTENT
  // ─────────────────────────────
  const raw = await collection.read(slug)

  // ─────────────────────────────
  // CREATE PIPELINE CONTEXT
  // ─────────────────────────────
  const ctx = createPipelineContext({
    registry,
    request: {
      type,
      slug,
    },
    raw,
  })

  // ─────────────────────────────
  // PARSE PIPELINE
  // ─────────────────────────────
  const parsePipeline = buildParsePipeline(ctx)

  await parsePipeline.run(raw)

  // ─────────────────────────────
  // COMPILE PIPELINE
  // ─────────────────────────────
  const compilePipeline = buildCompilePipeline(ctx)

  await compilePipeline.run()

  trace.event('RESULT', {
    type,
    slug,
  })

  trace.end()

  return {
    type,
    slug,
    filePath: raw.source.filePath,
    mdxSource: raw.raw,
    Content: ctx.compile?.Content,
    toc: extractTOC(raw.raw),
    frontMatter: ctx.frontMatter ?? {},
  }
}
