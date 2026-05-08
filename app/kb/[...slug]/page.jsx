// Architecture 1:
// page -> layout(sidebar) -> docklayout
// because sidebar state is persistent.
// app/kb/[...slug]/page.jsx
// Success: Renders content(MDX) from data fetching
// app/kb/layout.jsx
// Success: Renders layout using DockerLayout successfully.
//  Failure: Does not have initial sidebar left outline/index....

import { notFound } from 'next/navigation'
import { getContentBySlug } from '@/lib/content/core/get-content-by-slug'

import TOC from './client'
// route: dock-system 3.a Dock component docks client content to layout
export default async function Page({ params }) {
  const { slug } = await params
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug

  const kbItem = await getContentBySlug('kb', slugPath)
  if (!kbItem) notFound()

  return (
    <>
      <kbItem.Content />
      <TOC toc={kbItem.toc} />
    </>
  )
}
