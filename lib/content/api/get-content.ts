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
  console.log('━━━━━━━━━━━━━━━━━━━━━━')
  console.log('GET CONTENT START')
  console.log(query)

  try {
    const trace = createTrace('content:get')

    const { collection, config } = options
    const { type, slug } = query

    console.log('STEP 1')

    if (!type || !slug) {
      trace.event('INVALID_INPUT', { type, slug })
      trace.end()
      return null
    }

    console.log('STEP 2')
    trace.event('valid', { type, slug })

    const raw = await collection.read(slug)

    console.log('STEP 3', !!raw)

    if (!raw) {
      trace.event('NOT_FOUND', { slug })
      trace.end()
      return null
    }

    console.log('STEP 4')

    const rootDir = collection.id?.replace(/^fs:/, '') ?? process.cwd()

    console.log('STEP 5')

    const typeIndex = process.env.NODE_ENV === 'test' ? {} : await buildContentIndex({ rootDir })

    console.log('STEP 6')

    const analysis = analyzeContent(raw.raw)

    console.log('STEP 7')

    const ctx = createPipelineContext({
      request: { type, slug },
      raw,
      index: typeIndex,
      source: raw.source,
      analysis,
    })

    console.log('STEP 8')

    const parsedCtx = await buildParsePipeline(ctx).run(raw)

    console.log('STEP 9')

    console.log(parsedCtx.analysis)

    // if (!parsedCtx.analysis.published) {
    //   console.log('NOT PUBLISHED')
    //   return null
    // }

    console.log('STEP 10')

    await buildCompilePipeline(ctx).run()

    console.log('STEP 11')

    const entity = toContentEntity(ctx)

    console.log('STEP 12')

    if (config?.includeDrafts) {
      trace.event('DRAFT_SKIPPED', { slug })
      trace.end()
      return null
    }

    const item = toContentItem(entity)

    console.log('STEP 13')

    if (config?.filter && !config.filter(item)) {
      trace.event('FILTERED_OUT', { slug })
      trace.end()
      return null
    }

    console.log('STEP 14 SUCCESS')
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
  } catch (err) {
    console.error('GET CONTENT CRASH')
    console.error(err)

    if (err instanceof Error) {
      console.error(err.stack)
    }

    throw err
  }
}
