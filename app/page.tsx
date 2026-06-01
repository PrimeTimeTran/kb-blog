import { Metadata } from 'next/dist/types';
import { PostsView } from './posts-view';
import { content } from '@/lib/content/api/client';

export default async function Page() {
  const posts = (await content.list({ type: 'blog' })) || [];
  if (!posts) return null;
  return <PostsView posts={posts || []} />;
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
