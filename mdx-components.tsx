import type { ComponentType } from 'react';
import type { MDXComponents } from 'mdx/types';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// import { sanitizeHeadings, extractTOC } from '../../../remark/extract-toc'
import { extractCodeMeta } from './lib/remark/extract-code-meta';
import { extractFrontMatter } from './lib/remark/extract-front-matter';
import { renderCodeBlocks } from './lib/remark/render-codeblocks';

import { renderEmbeds } from './lib/remark/render-embeds';
import { renderCallOuts } from './lib/remark/render-callouts';
import { renderTabGroups } from './lib/remark/render-tab-groups';

import { injectEmbedFlags } from './lib/remark/inject-embed-flags';
import { injectTermLinksAndPreviews } from './lib/remark/inject-term-links-and-preview';

import { terms } from './data/generated/terms';

import { preprocessEmbeds } from './lib/content/api/transformers';
import { preprocessObsidianLinks } from '@/lib/content/core/preprocess-obsidian-links';

import { Term } from './components/mdx/Term';
import { Image } from './components/mdx/Image';
import { Embed } from './components/mdx/Embed';
import { Callout } from './components/mdx/Callout';
import { Snippet } from './components/mdx/Snippet';
import { Pre, TabGroup } from './components/mdx/Code';
import { TOCInline } from './components/mdx/TOCInline';
import { OrderBook } from './components/mdx/OrderBook';
import { SafeLink as Link } from './components/mdx/Link';
import { TermPeekDefinition } from './components/mdx/TermPeekDefinition';
import { ProjectionChart } from './components/mdx/ProjectionChart';

import { BlogNewsletterForm } from './components/NewsletterForm';
import { H1, H2, H3, H4, H5, H6 } from './components/HeadingComponents';

const BlockQuote = (props) => (
  <blockquote
    className="
      /* 1. Layout & Shape */
      my-6 p-5 border-l-4 rounded-r-xl transition-all w-full

      /* 2. Border: Stronger anchor in light mode, clean fallback in dark */
      border-primary/50 dark:border-primary-container

      /* 3. Background: Thicker tint for light mode, soft glow for dark */
      bg-primary-container/40 dark:bg-primary-container/10

      /* 4. Muted, Highly Legible Typographic Scale */
      text-base md:text-lg italic font-medium leading-relaxed
      text-on-surface-variant dark:text-on-surface
    "
    {...props}
  />
);

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
  blockquote: BlockQuote,
  // a: A,
  a: Link,
  callout: Callout,
  Snippet,
  pre: Pre,
  TOCInline,
  OrderBook,
  TermPeekDefinition,
  TabGroup: TabGroup,
  BlogNewsletterForm,
  ProjectionChart,
};

/**
 * Normalizes component maps by cleanly stripping out default exports
 */
const cleanedComponents: MDXComponents = Object.fromEntries(
  Object.entries(rawComponents).map(([key, value]) => [
    key,
    value && typeof value === 'object' && 'default' in value ? value.default : value,
  ]),
) as MDXComponents;

/**
 * Compiles absolute raw markdown text down into executable runtime React Server Components
 */
export async function compileWikiMDX(
  source: string,
  context: WikiCompilerContext & { depth?: number; visited?: Set<string> },
): Promise<{ Content: ComponentType<{ components?: MDXComponents }> }> {
  const { slug = '', index = {} } = context;

  const currentDepth = context.depth ?? 0;
  const currentVisited = context.visited ?? new Set<string>();

  /*
   * 🚨 ARCHITECTURAL ORDER OF OPERATIONS WARNING:
   * 1. PREPROCESSORS FIRST: `preprocessEmbeds` converts custom Obsidian `![[wiki-links]]` syntax
   *    into multi-line string-level blockquotes wrapped around structural HTML tags.
   * 2. AST PLUGINS SECOND: `renderCallOuts` catches these pre-wrapped structures in the AST phase.
   *
   * Changing this execution balance or shifting preprocessors into unified plugins will break
   * nested callout processing loops due to the behavior of the markdown text-line consumer.
   */
  let normalized = preprocessEmbeds(source, index);
  normalized = preprocessObsidianLinks(normalized, index, slug);
  console.log({ normalized });

  // Pass tracking parameters down into the sub-component generator closure
  const instanceComponents = createDynamicComponents(context, currentDepth, currentVisited);

  const { default: Content } = await evaluate(normalized, {
    ...runtime,
    useMDXComponents: (): MDXComponents => instanceComponents,
    remarkPlugins: [
      extractCodeMeta,
      renderCodeBlocks,
      renderTabGroups,
      remarkGfm,
      remarkMath,
      extractFrontMatter,
      renderCallOuts,
      renderEmbeds,
      [injectTermLinksAndPreviews, { terms }],
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
  });

  return { Content };
}
export function useMDXComponents(incomingComponents: MDXComponents): MDXComponents {
  return {
    ...incomingComponents,
    ...cleanedComponents,
  };
}

export function createDynamicComponents(context: any, depth = 0, visited = new Set<string>()): MDXComponents {
  console.log('createDynamicComponents');
  return {
    ...cleanedComponents,

    Embed: (props: any) => {
      console.log({ props });
      return <Embed {...props} index={context.index} currentSlug={context.slug} depth={depth} visited={visited} />;
    },
  };
}
