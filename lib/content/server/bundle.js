import path from 'path'

// import { compile, run } from '@mdx-js/mdx'
// import * as runtime from 'react/jsx-runtime'
import matter from 'gray-matter'
// import { bundleMDX } from 'mdx-bundler'

import { run, compile, evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

// import { compile, evaluate } from '@mdx-js/mdx'
// import * as runtime from 'react/jsx-runtime'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFootnotes from 'remark-footnotes'

import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism'

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

import { log } from '@/lib/debug/logger'

import { createMDXComponents } from '@/mdx'

export function debugAST() {
  return (tree) => {
    console.log(JSON.stringify(tree, null, 2))
  }
}
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
  let { slug = '', kbIndex = {} } = context

  // Embeds currently broken
  let normalized = preprocessWikiLinks(source, kbIndex, slug)
  normalized = preprocessEmbeds(normalized, kbIndex)
  normalized = normalized.replace(/<tabgroup/g, '<TabGroup')
  let processed = normalized.replace(/<\/tabgroup>/g, '</TabGroup>')

  const { default: Content } = await evaluate(processed, {
    ...runtime,
    useMDXComponents: () => createMDXComponents(),
    remarkPlugins: [
      extractCodeMeta,
      extractFrontMatter,
      extractTOC,
      remarkGfm,
      remarkMath,
      renderCodeBlocks,
      [renderEmbeds],
      renderCallOuts,
      renderTabGroups,
      injectEmbedFlags,
      // [injectTermLinksAndPreviews, { terms }], // 👈 here
    ],
    rehypePlugins: [
      // rehypeSlug,
      // [
      //   rehypeAutolinkHeadings,
      //   {
      //     behavior: 'wrap',
      //   },
      // ],
      // rehypeKatex,
      // rehypePrism,
      // rehypePrismPlus,
      // rehypePresetMinify,
    ],
  })

  return { Content }
}

export async function bundle(source = '', slug, options = {}) {
  const { data } = matter(source)
  // <<<<<<< HEAD
  const kbIndex = options.kbIndex || {}
  const { Content } = await compileWikiMDX(source, {
    slug,
    kbIndex,
    terms: options.terms || {},
    // =======
    //   let toc = []
    //   const kbIndex = await getKbIndex()
    //   source = preprocessEmbeds(source, kbIndex)
    //   source = source.replace(/<tabgroup/g, '<TabGroup')
    //   source = source.replace(/<\/tabgroup>/g, '</TabGroup>')
    //   log.bundle('RAW SOURCE HAS TABGROUP:', source.includes('<TabGroup'))

    //   const result = await bundleMDX({
    //     source: preprocessWikiLinks(source, kbIndex, slug),
    //     cwd: path.join(ROOT, 'components'),

    //     mdxOptions(options) {
    //       options.remarkPlugins = [
    //         extractCodeMeta,
    // extractFrontMatter,
    // extractTOC,
    //         remarkGfm,
    //         remarkMath,
    //         renderCallOuts,
    //         renderTabGroups,
    //         renderEmbeds,
    //         injectEmbedFlags,
    //         [injectTermLinksAndPreviews, terms],
    //       ]

    //       options.rehypePlugins = [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex, rehypePrismPlus]

    //       return options
    //     },
    // >>>>>>> fixed-author-layout
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

function isPromise(v) {
  return !!v && typeof v?.then === 'function'
}

function isFunction(v) {
  return typeof v === 'function'
}

export function buildRegistrySnapshot(registry = {}) {
  const snapshot = {}

  for (const [key, value] of Object.entries(registry)) {
    if (isPromise(value)) continue
    if (value instanceof Promise) continue

    if (isFunction(value)) {
      snapshot[key] = {
        type: 'component',
        name: value.name || key,
      }
      continue
    }

    snapshot[key] = {
      type: 'data',
      value,
    }
  }

  return snapshot
}
