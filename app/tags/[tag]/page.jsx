import fs from 'fs'
import path from 'path'

import ListLayout from '../../../layouts/ListLayout'
import siteMetadata from '../../../data/site-metadata'
import generateRss from '../../../lib/generate-rss'
import kebabCase from '../../../lib/utils/kebab-case'
import { ROOT } from '../../../lib/content/core/constants.js'
import { content } from '../../../lib/content/api/client'
import { getAllTags } from '../../../lib/content/server/tag/getAllTags'

// optional: keep if you still want dynamic RSS generation at build/runtime
export async function generateStaticParams() {
  const tags = await getAllTags('blog')

  return Object.keys(tags).map((tag) => ({
    tag,
  }))
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

export async function generateMetadata({ params }) {
  const raw = params.tag

  let title = raw[0].toUpperCase() + raw.slice(1)

  if (abbreviations[raw.toUpperCase()]) {
    title = title.toUpperCase()
  }

  return {
    title: `${title} - ${siteMetadata.author}`,
    description: `${title} tags - ${siteMetadata.author}`,
  }
}

export default async function Page({ params }) {
  // const allPosts = await getAllBlogPosts('blog')
  const allPosts = await content.get({ type: 'blog' })
  const filteredPosts = (allPosts ?? []).filter((post) => {
    if (post.draft) return false
    if (!Array.isArray(post.tags)) return false

    return post.tags.map((t) => kebabCase(t)).includes(params.tag)
  })

  // ⚠️ side-effect (kept from your original logic)
  if (filteredPosts.length > 0) {
    const rss = await generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)

    const rssPath = path.join(ROOT, 'public', 'tags', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  let title = params.tag[0].toUpperCase() + params.tag.slice(1)

  if (abbreviations[params.tag.toUpperCase()]) {
    title = title.toUpperCase()
  }

  return <ListLayout posts={filteredPosts} title={title} />
}
