import PageClient from './PageClient';
import { content } from '@/lib/content/api/client';

export default async function Page() {
  const tags = await content.list({ type: 'blog', by: 'tags', action: 'countBy' });
  return <PageClient tags={tags || {}} />;
}

export const metadata = {
  title: 'Tags',
  description: 'Browse content organized by topics and tags.',
  keywords: ['tags', 'topics', 'categories', 'index'],

  openGraph: {
    title: 'Tags',
    description: 'Browse content by topic.',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Tags',
    description: 'Browse content by topic.',
  },
};
