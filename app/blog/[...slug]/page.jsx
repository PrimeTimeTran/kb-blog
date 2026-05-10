// import generateRss from '@/lib/generate-rss'
import TableOfContents from '../../../components/TableOfContents'
import { getAllBlogPosts } from '../../../lib/content/server/blog.server'
import { BlogContent } from '../../../components/blog'
import { getContentBySlug } from '../../../lib/content/core/get-content-by-slug'

import { log } from '../../../lib/debug/logger'

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
  console.log({ toc })
  return (
    <div>
      <BlogContent
        toc={toc}
        frontMatter={frontMatter}
      >
        <post.Content />
      </BlogContent>
      <TableOfContents toc={toc} className="h-full overflow-y-auto theme-border-l p-3" />
    </div>
  )
}
