import { notFound } from 'next/navigation'
import { getAllKbSlugs } from '@/lib/content/core/kb'
import { getContentBySlug } from '@/lib/content/core/get-content-by-slug'
import { getKbTree } from '@/lib/content/server/kb.server'

import KBLayout from '@/layouts/KBLayout'

export async function generateStaticParams() {
  const slugs = await getAllKbSlugs()

  return (slugs ?? []).map((slug) => ({
    slug: slug.split('/'),
  }))
}

export default async function Page({ params }) {
  const { slug } = await params

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug
  const kbItem = await getContentBySlug('kb', slugPath)

  if (!kbItem) notFound()

  const outline = await getKbTree()

  const { frontMatter, toc } = kbItem
  return (
    <KBLayout outline={outline} toc={toc} frontMatter={frontMatter}>
      <kbItem.Content />
    </KBLayout>
  )
}
