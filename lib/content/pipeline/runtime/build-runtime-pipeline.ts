import matter from 'gray-matter'

import { bundle } from '../compile/bundle'
import { buildMDXContext } from '../compile/build-mdx-context'
import type { PipelineContext, RawContent } from '../../core/types'
import { createTrace } from '@/lib/debug'

export function buildParsePipeline(ctx: PipelineContext) {
  return {
    async run(raw: RawContent) {
      ctx.raw = raw

      const parsed = matter(raw.raw)

      ctx.frontMatter = parsed.data
      ctx.content = parsed.content

      return ctx
    },
  }
}

export function buildCompilePipeline(ctx: PipelineContext) {
  return {
    async run() {
      const mdxContext = await buildMDXContext({
        slug: ctx.request.slug!,
      })

      const result = await bundle(ctx.content, ctx.request.slug!, mdxContext)

      ctx.compile = {
        code: result.code,
        Content: result.Content,
      }

      ctx.analysis.toc = result.toc ?? []

      return ctx
    },
  }
}

export function buildRuntimePipeline(ctx: PipelineContext) {
  return {
    async run(raw: RawContent): Promise<PipelineContext> {
      const trace = createTrace('content:get')
      // attach raw content to ctx
      ctx.raw = raw

      // ─────────────────────────────
      // 1. FRONTMATTER
      // ─────────────────────────────
      const parsed = matter(raw.raw)
      trace.event('MDX Build Context', { parsed })

      ctx.frontMatter = parsed.data

      // ─────────────────────────────
      // 2. MDX CONTEXT
      // ─────────────────────────────

      const mdxContext = await buildMDXContext({
        slug: ctx.request.slug,
      })
      trace.event('MDX Build Context', { slug })

      // ─────────────────────────────
      // 3. BUNDLE
      // ─────────────────────────────
      const result = await bundle(parsed.content, ctx.request.slug, mdxContext)
      trace.event('MDX Build Context', { result })

      ctx.compile = {
        code: result.code,
        Content: result.Content,
      }

      console.log({
        ctx,
      })

      ctx.analysis.toc = result.toc ?? []

      ctx.frontMatter = {
        ...ctx.frontMatter,
        ...result.frontMatter,
      }

      return ctx
    },
  }
}
