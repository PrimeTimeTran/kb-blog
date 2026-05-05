// import generateRss from '@/lib/generate-rss'

import MDXRenderer from '@/mdx/Renderer'
import { getAllBlogPosts } from '@/lib/content/server/blog.server'
import { getContentBySlug } from '@/lib/content/core/get-content-by-slug'

import { log } from '@/lib/debug/logger'

const sanitize = (post) => ({
  ...post,
  frontMatter: {
    ...post.frontMatter,
    date: post.frontMatter?.date ? new Date(post.frontMatter.date).toISOString() : null,
  },
})

const SKIP_STATIC_PATHS = false
const SKIP_STATIC_PROPS = false

export async function getStaticPaths() {
  if (SKIP_STATIC_PATHS) {
    return { paths: [], fallback: false }
  } else {
    const posts = await getAllBlogPosts()
    return {
      paths: ((posts ?? []).filter((p) => !p.draft) ?? []).map((p) => ({
        params: {
          slug: p.slug.split('/'),
        },
      })),
      fallback: false,
    }
  }
}

export async function getStaticProps({ params }) {
  if (SKIP_STATIC_PROPS) {
    return {}
  } else {
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
    log.bundle('5. Loading individual blog post from slug: ', slug)
    const post = await getContentBySlug('blog', slug)

    if (!post) return { notFound: true }

    const posts = await getAllBlogPosts()
    const index = posts.findIndex((p) => p.slug === slug)
    const prev = posts[index + 1] || null
    const next = posts[index - 1] || null

    return {
      props: {
        post: sanitize(post),
        prev: prev ? sanitize(prev) : null,
        next: next ? sanitize(next) : null,
        authorDetails: [await getContentBySlug('authors', 'default')],
      },
    }
  }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post
  return (
    <MDXRenderer
      toc={toc}
      prev={prev}
      next={next}
      mdxSource={mdxSource}
      layout={'BlogLayout'}
      frontMatter={frontMatter}
      authorDetails={authorDetails}
      layoutProps={{
        frontMatter,
        toc,
        prev,
        next,
        authorDetails,
        post,
      }}
    />
  )
}
