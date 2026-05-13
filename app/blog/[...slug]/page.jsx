// import generateRss from '@/lib/generate-rss'
import { BlogContent } from '../../../components/blog'
import TableOfContents from '../../../components/TableOfContents'

import {
  Layout3ColumnLeft,
  Layout3ColumnRight,
  Layout3ColumnCenter,
} from '@/components/layout/ThreeColumnLayout'

import { content } from '../../../lib/content/api/client'

export async function generateStaticParams(props) {
  const posts = await content.list({ type: 'blog' })

  return (posts ?? [])
    .filter((p) => !p.draft)
    .map((p) => ({
      slug: p.slug.split('/'),
    }))
}

export default async function BlogPage({ params, posts }) {
  const { slug } = await params

  const normalizedSlug = Array.isArray(slug) ? slug.join('/') : slug

  const Post = await content.get({ type: 'blog', slug: normalizedSlug })

  if (!Post) return null
  
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
