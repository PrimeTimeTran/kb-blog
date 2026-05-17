// app/kb/layout.tsx
import { KBLayout } from '@/layouts/ThreeColumnLayout'
import { getKbTree } from '@/lib/content/domain/kb/kb.server'

export const metadata = {
  title: 'Knowledge Base',
  description:
    'A structured collection of notes, explanations, and concepts for learning and reference.',
  keywords: ['knowledge base', 'notes', 'learning', 'reference', 'documentation'],

  openGraph: {
    title: 'Knowledge Base',
    description: 'Structured learning and reference material.',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Knowledge Base',
    description: 'Structured learning and reference material.',
  },
}
export default async function Layout({ children }) {
  const tree = await getKbTree()
  return <KBLayout tree={tree}>{children}</KBLayout>
}
