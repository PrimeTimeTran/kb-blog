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
import { Layout3ColumnCenter, Layout3ColumnRight } from '@/components/layout/ThreeColumnLayout'

import { getContentBySlug } from '../../../lib/content/core/get-content-by-slug'

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
    <Layout3ColumnRight rightCol={KBItem.toc && <TableOfContents toc={KBItem.toc} />}>
      <Layout3ColumnCenter>
        <div className="w-full max-w-none mx-0 px-3">
          <div className="prose dark:prose-invert">
            <KBItem.Content />
          </div>
        </div>
      </Layout3ColumnCenter>
    </Layout3ColumnRight>
  )
}
