import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// import { sanitizeHeadings, extractTOC } from '../../../remark/extract-toc'
import { extractCodeMeta } from './lib/remark/extract-code-meta'
import { extractFrontMatter } from './lib/remark/extract-front-matter'
import { renderCodeBlocks } from './lib/remark/render-codeblocks'

import { renderEmbeds } from './lib/remark/render-embeds'
import { renderCallOuts } from './lib/remark/render-callouts'
import { renderTabGroups } from './lib/remark/render-tab-groups'

import { injectEmbedFlags } from './lib/remark/inject-embed-flags'
import { injectTermLinksAndPreviews } from './lib/remark/inject-term-links-and-preview'

import { terms } from './data/generated/terms'

import { preprocessEmbeds } from './lib/content/api/transformers'
import { preprocessObsidianLinks } from '@/lib/content/core/preprocess-obsidian-links'

import { Term } from './components/mdx/Term'
import { Image } from './components/mdx/Image'
import { Embed } from './components/mdx/Embed'
import { CallOut } from './components/mdx/CallOut'
import { Snippet } from './components/mdx/Snippet'
import { TabGroup } from './components/mdx/Code'
import { Pre } from './components/mdx/Pre'
import { TOCInline } from './components/mdx/TOCInline'
import { OrderBook } from './components/mdx/OrderBook'
import { SafeLink as Link } from './components/mdx/Link'
import { TermPeekDefinition } from './components/mdx/TermPeekDefinition'
import { ProjectionChart } from './components/mdx/ProjectionChart'

import { BlogNewsletterForm } from './components/NewsletterForm'
import { H1, H2, H3, H4, H5, H6 } from './components/HeadingComponents'

const rawComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Term,
  Image,
  Embed,
  a: Link,
  CallOut,
  Snippet,
  pre: Pre,
  TOCInline,
  OrderBook,
  TermPeekDefinition,
  TabGroup: TabGroup,
  BlogNewsletterForm,
  ProjectionChart,
}

const cleanedComponents = Object.fromEntries(
  Object.entries(rawComponents).map(([key, value]) => [key, (value as any)?.default ?? value])
)

export async function compileWikiMDX(source, context) {
  const { slug = '', index = {} } = context
  let normalized = preprocessObsidianLinks(source, index, slug)
  normalized = preprocessEmbeds(normalized, index)

  const { default: Content } = await evaluate(normalized, {
    ...runtime,

    // MDX is flaky because we have runtime vs build time definitions of Components and they need to agree
    // extractCodeMeta,renderCodeBlocks, renderTabGroups work flawlessly from here.

    // ✓ CORRECT: Provide a functional evaluator that returns your custom design components
    useMDXComponents: () => cleanedComponents,

    remarkPlugins: [
      extractCodeMeta,
      renderCodeBlocks,
      renderTabGroups,
      remarkGfm,
      remarkMath,
      extractFrontMatter,
      [renderEmbeds],
      renderCallOuts,
      // injectEmbedFlags,
      // [injectTermLinksAndPreviews, { terms }],
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
    ],
  })

  // Returns the actual React rendering function safely wrapped
  return { Content }
}

// 2. Export the required wrapper function that Next.js expects
export function useMDXComponents(incomingComponents: MDXComponents): MDXComponents {
  return {
    ...incomingComponents, // Retains default HTML tags provided by Next.js
    ...cleanedComponents, // Injects your custom overrides and design tokens
  }
}
