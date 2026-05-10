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
