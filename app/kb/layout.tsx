export default async function Layout({ left, children, right }) {
  return (
    <div className="w-full">
      {left}
      {children}
      {right}
    </div>
  );
}

export const metadata = {
  title: 'Knowledge Base',
  description: 'A structured collection of notes, explanations, and concepts for learning and reference.',
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
};
