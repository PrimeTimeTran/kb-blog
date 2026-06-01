import { Metadata } from 'next/dist/types';
import { TagView } from './tag-view';
import { content } from '@/lib/content/api/client';

export default async function TagPage() {
  const tags = await content.list({ type: 'blog', by: 'tags', action: 'countBy' });
  return <TagView tags={tags || {}} />;
}

export const metadata: Metadata = {
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
