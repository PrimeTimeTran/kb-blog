import AboutLayout from '@/layouts/About';

import { content } from '@/lib/content/api/client';

export default async function Page() {
  const about = await content.get({ type: 'authors', slug: 'default' });
  if (!about) return null;

  return (
    <AboutLayout>
      <about.Content />
    </AboutLayout>
  );
}

export const metadata = {
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
