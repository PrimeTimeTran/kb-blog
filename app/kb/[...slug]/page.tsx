// app/kb/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { content } from '@/lib/content/api/client';
import { ResizableColumn } from '@/components/layout/ResizableColumn';
import TableOfContents from '@/components/TableOfContents';
import { BaseScroll } from '@/components/BaseScroll';

export default async function Page({ params }) {
  let { slug } = await params;
  slug = await (Array.isArray(slug) ? slug.join('/') : slug);

  const KBItem = await content.get({ type: 'kb', slug });

  if (!KBItem) notFound();
  return (
    <div className="flex h-full min-h-0 min-w-0 w-full overflow-hidden">
      {/* CENTER */}
      <BaseScroll>
        <div className="prose dark:prose-invert px-3 no-scrollbar suppressHydrationWarning">
          <KBItem.Content />
        </div>
      </BaseScroll>

      {/* RIGHT */}
      <ResizableColumn side="right">
        <TableOfContents toc={KBItem.toc} />
      </ResizableColumn>
    </div>
  );
}
