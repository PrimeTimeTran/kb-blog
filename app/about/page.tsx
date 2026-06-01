import AboutLayout from '@/layouts/About';
import { Metadata } from 'next/dist/types';
import { content } from '@/lib/content/api/client';

export default async function Page() {
  const About = await content.get({ type: 'authors', slug: 'default' });
  if (!About) return null;

  return (
    <AboutLayout>
      <About.Content />
    </AboutLayout>
  );
}

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about this project, its goals, and its architecture.',
  keywords: ['about', 'project', 'developer', 'portfolio'],

  openGraph: {
    title: 'About',
    description: 'About this project and its goals.',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'About',
    description: 'About this project and its goals.',
  },
};
