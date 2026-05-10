// NOTE:
// This page participates in an implicit layout contract defined by Next.js App Router.
//
// It assumes a surrounding layout (LayoutClient + Layout.tsx) that provides:
// - shared structural shell (left sidebar, global layout constraints)
// - scroll containment and sizing rules (flex/min-h-0 behavior)
// - consistent width management via ResizableColumn + LayoutProvider
//
// This component only defines the *route-specific content region* plus an optional
// right-side enhancement (Table of Contents).
//
// In practice, it does not stand alone — it relies on the parent layout system
// to provide structure, state, and interaction boundaries that are not explicitly
// visible in this file but are guaranteed by the route segment architecture.

import { notFound } from 'next/navigation'
import { getContentBySlug } from '../../../lib/content/core/get-content-by-slug'

import { ResizableColumn } from '../ResizableColumn'
import TableOfContents from '../../../components/TableOfContents'

type PageProps = {
  params: {
    slug: string[]
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug

  const KBItem = await getContentBySlug('kb', slugPath)
  if (!KBItem) notFound()
  return (
    <div className="flex h-full min-h-0 w-full">
      <div className="flex-1 min-w-0 min-h-0 overflow-y-auto no-scrollbar">
        <div className="prose dark:prose-invert mx-16">
          <KBItem.Content />
        </div>
      </div>

      <ResizableColumn side="right">
        <TableOfContents toc={KBItem.toc} />
      </ResizableColumn>
    </div>
  )
}
