// app/kb/layout.jsx
import KBSidebar from '@/components/KBSidebar'
import { getKbTree } from '@/lib/content/server/kb.server'
import { DockLayout, Dock } from '../../packages/docksystem/src'

// route: dock-system 2.a DockLayout wraps client
export default async function Layout({ children }) {
  const kbIndex = await getKbTree()

  return (
    <DockLayout>
      <Dock name="left">
        <KBSidebar index={kbIndex} />
      </Dock>
      <article className="prose p-3 dark:prose-invert prose-md">{children}</article>
    </DockLayout>
  )
}

export const metadata = {
  title: {
    default: 'Knowledge Base',
    template: '%s | Knowledge Base',
  },

  description:
    'A structured knowledge base for technical notes, documentation, and system design explorations.',

  keywords: ['knowledge base', 'docs', 'system design', 'notes', 'engineering', 'nextjs'],
  metadataBase: new URL('https://kb-blog-primetimetran.vercel.app'),
  openGraph: {
    title: 'Knowledge Base',
    description:
      'Explore structured engineering notes, system design breakdowns, and technical deep dives.',
    url: '/kb',
    siteName: 'My Knowledge Base',
    images: [
      {
        url: '/og/kb-default.png',
        width: 1200,
        height: 630,
        alt: 'Knowledge Base Overview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Base',
    description: 'Structured engineering notes and system design breakdowns.',
    images: ['/og/kb-default.png'],
  },
}
