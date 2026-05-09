// Architecture 1:
// page -> layout(sidebar) -> docklayout
// because sidebar state is persistent.
// app/kb/[...slug]/page.jsx
// Success: Renders content(MDX) from data fetching
// app/kb/layout.jsx
// Success: Renders layout using DockerLayout successfully.
//  Failure: Does not have initial sidebar left outline/index....

import { notFound } from 'next/navigation'
import { getContentBySlug } from '../../../lib/content/core/get-content-by-slug'

import TOC from './client'
import { RouteSync } from './router-sync'

export default async function Page({ params }) {
  const { slug } = await params
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug

  const KBItem = await getContentBySlug('kb', slugPath)
  if (!KBItem) notFound()

  return (
    <>
      <RouteSync slug={slugPath} toc={KBItem.toc} />
      <KBItem.Content />
      {/* <TOC toc={KBItem.toc} /> */}
    </>
  )
}
