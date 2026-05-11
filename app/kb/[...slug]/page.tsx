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

// import { TocSchema } from '@repo/core'

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

  // TODO: Type this and throw an error.
  // "Handling it" is like ignoring fire alarms.
  // const toc = TocSchema.parse(KBItem.toc)

  if (!KBItem) notFound()
  return (
    <div className="flex h-full w-full min-h-0">
      {/* CENTER */}
      <div className="flex-1 min-w-0 overflow-y-auto no-scrollbar prose dark:prose-invert">
        <KBItem.Content />
      </div>

      {/* RIGHT */}
      {KBItem.toc && (
        <ResizableColumn side="right">
          <div className="h-full w-64 shrink-0 overflow-y-auto">
            <TableOfContents toc={KBItem.toc} />
          </div>
        </ResizableColumn>
      )}
    </div>
  )
}
