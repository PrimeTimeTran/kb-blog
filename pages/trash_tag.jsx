import fs from 'fs'
import path from 'path'

import { TagSEO } from '@/components/SEO'
import generateRss from '@/lib/generate-rss'
import kebabCase from '@/lib/utils/kebab-case'
import ListLayout from '@/layouts/ListLayout'
import siteMetadata from '@/data/site-metadata'
import { getAllBlogPosts } from '@/lib/content/server/blog.server'
import { ROOT } from '@/lib/content/core/constants.js'

export async function getStaticPaths() {
  const { getAllTags } = await import('@/lib/content/server/tag/getAllTags')
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

const abbreviations = {
  GCP: 'GCP',
  VPC: 'VPC',
  SQL: 'SQL',
  AI: 'AI',
  CICD: 'CICD',
  XSS: 'XSS',
  CSRF: 'CSRF',
  IPO: 'IPO',
  RDO: 'RDO',
  VMS: 'VMS',
}

export async function getStaticProps({ params }) {
  // const { getAllBlogPosts } = await import('@/lib/content/server/blog.server')
  const allPosts = await getAllBlogPosts('blog')
  const filteredPosts = (allPosts ?? [])?.filter((post) => {
    if (post.draft) return false
    if (!Array.isArray(post.tags)) return false

    return post.tags.map((t) => kebabCase(t)).includes(params.tag)
  })

  // rss
  if (filteredPosts.length > 0) {
    const rss = await generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)

    const rssPath = path.join(ROOT, 'public', 'tags', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })

    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  let title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  if (abbreviations[tag.toUpperCase()]) {
    title = title.toUpperCase()
  }
  return (
    <>
      <TagSEO
        title={`${title} - ${siteMetadata.author}`}
        description={`${title} tags - ${siteMetadata.author}`}
      />
      <ListLayout type="tag" posts={posts} title={title} />
    </>
  )
}
