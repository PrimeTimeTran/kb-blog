import { Metadata } from 'next/dist/types';
import { PageClient } from '@/app/dsa/dsa-view';

export default function Page() {
  return <PageClient />;
}

export const metadata: Metadata = {
  title: 'Data Structures & Algorithms',
  description: 'Curated problems, explanations, and patterns for mastering DSA.',
  keywords: ['DSA', 'algorithms', 'data structures', 'coding problems', 'leetcode'],

  openGraph: {
    title: 'DSA',
    description: 'Curated DSA problems and patterns.',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DSA',
    description: 'Curated DSA problems and patterns.',
  },
};
