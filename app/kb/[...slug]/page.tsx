import { notFound } from 'next/navigation';
import { PageClient } from '../PageClient';
import { content } from '@/lib/content/api/client';
import TableOfContents from '@/components/TableOfContents';
import { getKbTree } from '@/lib/content/domain/kb/kb.server';

export default async function Page({ params }) {
  let { slug } = await params;
  slug = await (Array.isArray(slug) ? slug.join('/') : slug);

  const tree = await getKbTree();

  const KBItem = await content.get({ type: 'kb', slug });
  if (!KBItem) notFound();
  return <PageClient tree={tree} slug={slug} content={<KBItem.Content />} toc={<TableOfContents toc={KBItem.toc} />} />;
}
