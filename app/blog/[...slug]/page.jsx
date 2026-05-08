// import generateRss from '@/lib/generate-rss'
import TOCBubbler from '@/components/providers/TOCBubbler'

import TableOfContents from '@/components/TableOfContents'
import { getAllBlogPosts } from '@/lib/content/server/blog.server'
import { BlogContent } from '@/components/blog'
import { getContentBySlug } from '@/lib/content/core/get-content-by-slug'

import { log } from '@/lib/debug/logger'

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()

  return (posts ?? [])
    .filter((p) => !p.draft)
    .map((p) => ({
      slug: p.slug.split('/'),
    }))
}

export default async function BlogPage({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  log.bundle('Loading blog post:', slug)

  const post = await getContentBySlug('blog', slug)

  if (!post) return null // or notFound()

  const posts = await getAllBlogPosts()
  const index = posts.findIndex((p) => p.slug === slug)

  const prev = posts[index + 1] || null
  const next = posts[index - 1] || null

  const authorDetails = await getContentBySlug('authors', 'default')
  const { mdxSource, toc, frontMatter } = post

  return (
    <div
      left={<div>left sidebar</div>}
      right={<TableOfContents toc={toc} className="h-full overflow-y-auto theme-border-l p-3" />}
    >
      <BlogContent
        toc={toc}
        frontMatter={frontMatter}
        // className="flex-6 min-w-0 h-full overflow-y-auto p-3 scrollbar"
      >
        <post.Content />
      </BlogContent>
      <TOCBubbler toc={toc} />
    </div>
    // <MDXRenderer
    //   mdxSource={mdxSource}
    //   layout={'BlogLayout'}
    //   layoutProps={{
    //     toc,
    //     prev,
    //     next,
    //     post,
    //     frontMatter,
    //     authorDetails,
    //   }}
    // />
  )
}
