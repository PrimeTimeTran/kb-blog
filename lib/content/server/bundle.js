import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFootnotes from 'remark-footnotes'

import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { extractTOC } from '@/lib/remark/extract-toc'
import { extractCodeMeta } from '@/lib/remark/extract-code-meta'
import { extractFrontMatter } from '@/lib/remark/extract-front-matter'

import { renderEmbeds } from '@/lib/remark/render-embeds'
import { renderCallOuts } from '@/lib/remark/render-callouts'
import { renderImgInJSX } from '@/lib/remark/render-img-in-jsx'
import { renderTabGroups } from '@/lib/remark/render-tab-groups'
import { renderCodeBlocks } from '@/lib/remark/render-codeblocks'

import { injectEmbedFlags } from '@/lib/remark/inject-embed-flags'
import { injectTermLinksAndPreviews } from '@/lib/remark/inject-term-links-and-preview'

import { terms } from '@/data/generated/terms'
import { getKbIndex } from '@/lib/content/core/kb'
import { preprocessEmbeds, preprocessWikiLinks } from '@/lib/content/core/transformers'

import { ROOT } from '@/lib/content/core/constants'
import { log } from '@/lib/debug/logger'

export function debugAST() {
  return (tree) => {
    console.log(JSON.stringify(tree, null, 2))
  }
}

export async function bundle(source, slug) {
  log.bundle('🚨 7. BUNDLE FUNCTION CALLED: ', slug)
  if (typeof source !== 'string') {
    throw new Error(`[bundle] expected string, got ${typeof source}`)
  }

  const { data } = matter(source)
  let toc = []
  const kbIndex = await getKbIndex()
  source = preprocessEmbeds(source, kbIndex)
  source = source.replace(/<tabgroup/g, '<TabGroup')
  source = source.replace(/<\/tabgroup>/g, '</TabGroup>')
  log.bundle('RAW SOURCE HAS TABGROUP:', source.includes('<TabGroup'))

  const result = await bundleMDX({
    source: preprocessWikiLinks(source, kbIndex, slug),
    cwd: path.join(ROOT, 'components'),

    mdxOptions(options) {
      options.remarkPlugins = [
        extractCodeMeta,
        extractFrontMatter,
        extractTOC,
        remarkGfm,
        remarkMath,
        renderCallOuts,
        renderTabGroups,
        renderEmbeds,
        injectEmbedFlags,
        [injectTermLinksAndPreviews, terms],
      ]

      options.rehypePlugins = [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex, rehypePrismPlus]

      return options
    },
  })

  return {
    ...result,
    mdxSource: result.code,
    frontMatter: {
      ...data,
      ...result.frontmatter,
      date: data.date ? new Date(data.date).toISOString() : null,
    },
    toc,
  }
}
