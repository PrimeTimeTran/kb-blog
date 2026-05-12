// import generateRss from '@/lib/generate-rss'
import TableOfContents from '../../../components/TableOfContents'
import { getAllBlogPosts } from '../../../lib/content/server/blog.server'
import { BlogContent } from '../../../components/blog'
import { getContentBySlug } from '../../../lib/content/core/get-content-by-slug'

import {
  Layout3ColumnLeft,
  Layout3ColumnRight,
  Layout3ColumnCenter,
} from '@/components/layout/ThreeColumnLayout'

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

  const Post = await getContentBySlug('blog', slug)

  if (!Post) return null // or notFound()

  const posts = await getAllBlogPosts()
  const index = posts.findIndex((p) => p.slug === slug)

  const prev = posts[index + 1] || null
  const next = posts[index - 1] || null

  const authorDetails = await getContentBySlug('authors', 'default')
  const { mdxSource, toc, frontMatter } = Post

  return (
    <Layout3ColumnLeft
      leftCol={
        // NOTE:
        // Proves left column is scrollable if content is large enough
        false ? (
          <div className=" w-128">
            <div className=" w-128">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="h-20 border">
                  item {i}
                </div>
              ))}
            </div>
          </div>
        ) : null
      }
    >
      <Layout3ColumnRight
        rightCol={
          <TableOfContents toc={toc} className="h-full overflow-y-auto theme-border-l p-3" />
        }
      >
        <Layout3ColumnCenter>
          <BlogContent toc={toc} frontMatter={frontMatter}>
            <Post.Content />
          </BlogContent>
        </Layout3ColumnCenter>
      </Layout3ColumnRight>
    </Layout3ColumnLeft>
  )
}
