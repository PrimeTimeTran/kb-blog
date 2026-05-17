import { PageClient } from '@/app/dsa/PageClient'

// import siteMetadata from '@/data/site-metadata.js'

export default function Page() {
  return <PageClient />
}

export const metadata = {
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
}
