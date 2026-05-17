import { slug } from 'github-slugger'

import ListLayout from '../../../layouts/ListLayout'
import siteMetadata from '../../../data/site-metadata'
import { content } from '@/lib/content/api/client'

import { BasePage } from '@/components/BasePage'
import { ABBREVIATIONS } from '@/data/abbreviations'

export async function generateStaticParams() {
  const tags = await content.list({ type: 'blog', by: 'tags', action: 'countBy' })

  return Object.keys(tags).map((tag) => ({
    tag,
  }))
}

export default async function Page({ params }) {
  const { tag } = await params

  const allPosts = await content.list({
    by: 'tags',
    value: tag,
    type: 'blog',
    match: 'includes',
    action: 'filterBy',
  })

  let title = ''
  if (ABBREVIATIONS[slug(tag).toUpperCase()]) {
    title = tag.toUpperCase()
  }

  return (
    <BasePage>
      <ListLayout posts={allPosts} title={'Tagged - ' + tag} />
    </BasePage>
  )
}
