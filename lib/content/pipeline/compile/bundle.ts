import matter from 'gray-matter'

import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
// import rehypePresetMinify from 'rehype-preset-minify'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// import { sanitizeHeadings, extractTOC } from '../../../remark/extract-toc'
import { extractCodeMeta } from '../../../remark/extract-code-meta'
import { extractFrontMatter } from '../../../remark/extract-front-matter'

import { renderEmbeds } from '../../../remark/render-embeds'
import { renderCallOuts } from '../../../remark/render-callouts'
import { renderTabGroups } from '../../../remark/render-tab-groups'
import { renderCodeBlocks } from '../../../remark/render-codeblocks'

import { injectEmbedFlags } from '../../../remark/inject-embed-flags'
import { injectTermLinksAndPreviews } from '../../../remark/inject-term-links-and-preview'

import { terms } from '../../../../data/generated/terms'

import { preprocessEmbeds, preprocessWikiLinks } from '../../api/transformers'

import { createMDXComponents } from '@/mdx/createMDXComponents.jsx'

// https://mdxjs.com/docs/
// | feature                     | works |
// | --------------------------- | ----- |
// | MDX v3 components           | ✅     |
// | React 18 runtime            | ✅     |
// | dynamic component injection | ✅     |
// | registry-based rendering    | ✅     |
// | no string runtime hacks     | ✅     |
// https://mdxjs.com/docs/

async function compileWikiMDX(source, context) {
  let { slug = '', index = {} } = context
  let normalized = preprocessWikiLinks(source, index, slug)
  normalized = preprocessEmbeds(normalized, index)
  const { default: Content } = await evaluate(normalized, {
    ...runtime,
    useMDXComponents: () => createMDXComponents(),
    remarkPlugins: [
      extractCodeMeta,
      extractFrontMatter,
      remarkGfm,
      remarkMath,
      renderCodeBlocks,
      [renderEmbeds],
      renderCallOuts,
      renderTabGroups,
      injectEmbedFlags,
      [injectTermLinksAndPreviews, { terms }],
      // sanitizeHeadings,
      // extractTOC,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
        },
      ],
      rehypeKatex,
      rehypePrism,
      rehypePrismPlus,
      // rehypePresetMinify,
    ],
  })

  return { Content }
}

export async function bundle(source = '', slug, options) {
  const { data } = matter(source)
  const { index, headings } = options
  const { Content } = await compileWikiMDX(source, {
    slug,
    index,
    terms: options.terms || {},
  })

  return {
    Content,
    frontMatter: {
      ...data,
      date: data.date ? new Date(data.date).toISOString() : null,
    },
    toc: [],
  }
}
