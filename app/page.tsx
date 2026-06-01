import { Metadata } from 'next/types';
import PageClient from './PageClient';
import { content } from '@/lib/content/api/client';

export default async function Page() {
  const posts = (await content.list({ type: 'blog' })) || [];
  if (!posts) return null;
  return <PageClient posts={posts || []} />;
}

export const metadata: Metadata = {
  title: {
    default: 'Loi Tran',
    template: '%s | Loi Tran',
  },
  description: 'Articles, thoughts, and engineering notes on web development, systems, and design.',
  keywords: ['blog', 'web development', 'engineering', 'notes', 'articles'],

  openGraph: {
    title: 'Blog',
    description: 'Articles and engineering notes.',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Articles and engineering notes.',
  },
};
