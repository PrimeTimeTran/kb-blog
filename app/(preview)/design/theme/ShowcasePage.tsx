const ShowcasePage = () => {
  const navbar = (
    <nav className="fixed top-16 left-0 right-0 z-20 h-16 bg-white border-b border-gray-200 flex items-center px-12 shadow-sm">
      <h2 className="font-bold text-lg">Design System Documentation</h2>
      {/* Add internal links here */}
    </nav>
  );
  return (
    <main className="min-h-screen pt-32">
      {/* {navbar} */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 pt-16">
        {sections.map((section) => (
          <SectionWrapper key={section.id} section={section}>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-screen">
              <p>{section.body}</p>
            </div>
          </SectionWrapper>
        ))}
      </div>
    </main>
  );
};

const SectionWrapper = ({ section, children }) => {
  return (
    <section id={section.id} className="relative flex gap-12 mb-24 scroll-mt-32">
      <aside className="hidden md:block w-60 flex-shrink-0">
        <div className="sticky top-32 bg-level h-full p-8 rounded">
          <h4 className="font-bold text-gray-900">{section.title}</h4>
          <p className="text-xs text-gray-500 mt-2">{section.subtitle}</p>
        </div>
      </aside>

      <div className="flex-grow min-w-0">
        <div className="sticky top-32 z-10 bg-gray-50/95 backdrop-blur-sm py-4 border-b border-gray-200 mb-6">
          <h2 className="text-2xl font-bold">{section.title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
};

export default ShowcasePage;

const sections = [
  // LAYER 1: FOUNDATIONS (Tokens)
  {
    category: 'Foundations',
    id: 'tokens',
    title: 'Design Tokens',
    subtitle: 'The sub-atomic particles of our system.',
    body: 'Centralized variables for colors, spacing, typography, and motion that ensure a single source of truth across platforms.',
    icon: '⚛️',
  },
  {
    category: 'Foundations',
    id: 'color',
    title: 'Color Palette',
    subtitle: 'Semantic and functional color usage.',
    body: 'Beyond hex codes: we use a semantic color system that adapts to light/dark modes and component states.',
    icon: '🌈',
  },
  {
    category: 'Foundations',
    id: 'typography',
    title: 'Typography',
    subtitle: 'Hierarchy and readable scale.',
    body: 'Modular type scales, line heights, and font-weight specifications for clarity and consistency.',
    icon: '✍️',
  },
  {
    category: 'Foundations',
    id: 'spacing',
    title: 'Spacing & Grid',
    subtitle: 'Creating rhythm and balance.',
    body: 'Our 4px base-grid system ensures consistent spacing and alignment across all layouts.',
    icon: '📏',
  },

  // LAYER 2: VISUAL STYLE (Surface & Effects)
  {
    category: 'Visual Style',
    id: 'surfaces',
    title: 'Surfaces & Elevation',
    subtitle: 'Depth and hierarchy through layering.',
    body: 'Rules for z-index, background fills, and containers to define the spatial structure of the UI.',
    icon: '🧱',
  },
  {
    category: 'Visual Style',
    id: 'effects',
    title: 'Effects & Shadows',
    subtitle: 'Gradients, blurs, and drop shadows.',
    body: 'Standardized elevation levels (shadows) and background treatments (glassmorphism/blurs) for visual depth.',
    icon: '✨',
  },
  {
    category: 'Visual Style',
    id: 'icons',
    title: 'Iconography',
    subtitle: 'Visual communication.',
    body: 'Guidance on our icon set, stroke weight, and when to use filled vs. outlined styles.',
    icon: '🖼️',
  },

  // LAYER 3: COMPONENTS & UTILITIES
  {
    category: 'Components',
    id: 'utilities',
    title: 'Utilities',
    subtitle: 'Helper classes and functions.',
    body: 'Small, reusable snippets for common layout tasks, text alignment, and common responsive behaviors.',
    icon: '⚙️',
  },
  {
    category: 'Components',
    id: 'components',
    title: 'Core Components',
    subtitle: 'The building blocks.',
    body: 'Interactive elements like buttons, inputs, modals, and navigation bars built for performance and a11y.',
    icon: '🧩',
  },
];
