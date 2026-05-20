import matter from 'gray-matter'

import { bundle } from '../compile/bundle'
import { buildMDXContext } from '../compile/build-mdx-context'
import type { PipelineContext, RawContent } from '../../core/types'
import { createTrace } from '@/lib/debug'
import { isPublished } from '../../core/is-published'

export function buildParsePipeline(ctx: PipelineContext) {
  return {
    async run(raw: RawContent) {
      const parsed = matter(raw.raw)

      const frontMatter = parsed.data
      const content = parsed.content

      const published = isPublished({ frontMatter })

      ctx.raw = raw
      ctx.frontMatter = frontMatter
      ctx.content = content
      ctx.analysis.published = published

      return {
        ...ctx,
        published, // 🔥 important
      }
    },
  }
}
export function buildCompilePipeline(ctx: PipelineContext) {
  return {
    async run() {
      if (!ctx.content) {
        throw new Error('Missing content. Run parse pipeline first.')
      }

      const mdxContext = await buildMDXContext({
        index: ctx.index,
        headings: ctx.headings,
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

      ctx.raw = raw

      // ─────────────────────────────
      // 1. FRONTMATTER
      // ─────────────────────────────
      const parsed = matter(raw.raw)
      ctx.frontMatter = parsed.data

      trace.event('frontmatter parsed', {
        hasFrontMatter: !!ctx.frontMatter,
      })

      // ─────────────────────────────
      // 2. MDX CONTEXT
      // ─────────────────────────────
      const mdxContext = await buildMDXContext({
        slug: ctx.request.slug,
      })

      trace.event('mdx context built', {
        slug: ctx.request.slug,
      })

      // ─────────────────────────────
      // 3. BUNDLE
      // ─────────────────────────────
      const result = await bundle(parsed.content, ctx.request.slug, mdxContext)

      ctx.compile = {
        code: result.code,
        Content: result.Content.default,
      }

      ctx.analysis.toc = result.toc ?? []

      ctx.frontMatter = {
        ...ctx.frontMatter,
        ...result.frontMatter,
      }

      return ctx
    },
  }
}
