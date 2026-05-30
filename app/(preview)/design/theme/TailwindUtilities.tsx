import type { JSX, PropsWithChildren } from 'react';

const fontSizes = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
];

const fontWeights = [
  'font-thin',
  'font-extralight',
  'font-light',
  'font-normal',
  'font-medium',
  'font-semibold',
  'font-bold',
  'font-extrabold',
  'font-black',
];
const textAlignments = ['text-left', 'text-center', 'text-right', 'text-justify'];

export default function TailwindUtilities({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Hero />
      <Body />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-outline/20 bg-surface px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-outline/20 bg-secondary-container px-3 py-1 text-xs font-bold tracking-wide tex-on-secondary">
            Typography System
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight">Design System Text Utilities</h1>

            <p className="text-lg leading-8 text-on-surface-variant">
              Typography utilities define readability, hierarchy, rhythm, and communication across the Omni design
              system. Tailwind text classes provide low-level primitives that map into semantic UI composition.
            </p>

            <p className="max-w-3xl leading-8 text-on-surface-variant">
              This page documents how typography utilities should be used within a semantic design system architecture
              rather than as isolated styling shortcuts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Body() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row">
      {renderSidebar()}

      {/* CONTENT */}
      <main className="min-w-0 flex-1 space-y-12">
        {/* OVERVIEW */}
        <section id="overview" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Foundation</div>
              <h2 className="text-3xl font-black tracking-tight">Typography Overview</h2>
            </div>

            <p className="max-w-4xl leading-8 text-on-surface-variant">
              Typography is one of the most important systems in UI design. Strong typography establishes hierarchy,
              improves scanning, reinforces accessibility, and creates visual rhythm.
            </p>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  title: 'Hierarchy',
                  body: 'Guide attention through scale and weight.',
                },
                {
                  title: 'Readability',
                  body: 'Improve comprehension and scanning.',
                },
                {
                  title: 'Consistency',
                  body: 'Create predictable visual structure.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-outline/20 bg-level p-5">
                  <div className="mb-2 text-lg font-bold">{item.title}</div>
                  <p className="text-sm leading-7 text-on-surface-variant">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FONT SIZES */}
        <section id="font-sizes" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Scale</div>
              <h2 className="text-3xl font-black tracking-tight">Font Sizes</h2>
            </div>

            <p className="leading-8 text-on-surface-variant">
              Tailwind provides a consistent type scale ranging from compact labels to large display headings.
            </p>

            <div className="space-y-4">
              {fontSizes.map((size) => (
                <div key={size} className="rounded-2xl border border-outline/20 bg-level p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">{size}</div>

                  <div className={`${size} font-semibold`}>The quick brown fox jumps over the lazy dog.</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FONT WEIGHTS */}
        <section id="font-weights" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Emphasis</div>
              <h2 className="text-3xl font-black tracking-tight">Font Weights</h2>
            </div>

            <div className="space-y-4">
              {fontWeights.map((weight) => (
                <div key={weight} className="rounded-2xl border border-outline/20 bg-level p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">{weight}</div>

                  <div className={`${weight} text-2xl`}>Typography creates visual hierarchy.</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LINE HEIGHT */}
        <section id="line-height" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Readability</div>
              <h2 className="text-3xl font-black tracking-tight">Line Height</h2>
            </div>

            <div className="space-y-5">
              {['leading-none', 'leading-tight', 'leading-normal', 'leading-relaxed', 'leading-loose'].map(
                (leading) => (
                  <div key={leading} className="rounded-2xl border border-outline/20 bg-level p-6">
                    <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                      {leading}
                    </div>

                    <p className={`${leading} max-w-3xl text-base`}>
                      Good typography balances readability, rhythm, and information density. Line height strongly
                      impacts how easy content is to scan and understand.
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* LETTER SPACING */}
        <section id="letter-spacing" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Rhythm</div>
              <h2 className="text-3xl font-black tracking-tight">Letter Spacing</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                'tracking-tighter',
                'tracking-tight',
                'tracking-normal',
                'tracking-wide',
                'tracking-wider',
                'tracking-widest',
              ].map((tracking) => (
                <div key={tracking} className="rounded-2xl border border-outline/20 bg-level p-5">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                    {tracking}
                  </div>

                  <div className={`${tracking} text-xl font-semibold`}>Omni Design System</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEXT COLORS */}
        <section id="text-colors" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Semantic Roles</div>
              <h2 className="text-3xl font-black tracking-tight">Text Colors</h2>
            </div>

            <p className="leading-8 text-on-surface-variant">
              In Omni, text colors should remain semantic. Avoid directly using raw palette colors like{' '}
              <code>text-gray-500</code> in application UI.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: 'Primary Foreground',
                  cls: 'text-on-surface',
                  bg: 'bg-surface',
                },
                {
                  title: 'Secondary Foreground',
                  cls: 'text-on-surface-variant',
                  bg: 'bg-surface',
                },
                {
                  title: 'Primary Action',
                  cls: 'text-primary',
                  bg: 'bg-surface',
                },
                {
                  title: 'Destructive',
                  cls: 'text-error',
                  bg: 'bg-surface',
                },
              ].map((item) => (
                <div key={item.title} className={`rounded-2xl border border-outline/20 ${item.bg} p-6`}>
                  <div className="mb-2 text-sm font-bold uppercase tracking-wide text-on-surface-variant">
                    {item.title}
                  </div>

                  <div className={`${item.cls} text-2xl font-bold`}>Semantic typography matters.</div>

                  <div className="mt-4 text-sm text-on-surface-variant">
                    <code>{item.cls}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALIGNMENT */}
        <section id="alignment" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Layout</div>
              <h2 className="text-3xl font-black tracking-tight">Text Alignment</h2>
            </div>

            <div className="space-y-5">
              {textAlignments.map((alignment) => (
                <div key={alignment} className="rounded-2xl border border-outline/20 bg-level p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                    {alignment}
                  </div>

                  <p className={`${alignment} leading-8`}>
                    Good alignment creates stronger layout structure and improves readability across responsive
                    interfaces.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSFORMATIONS */}
        <section id="transformations" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Formatting</div>
              <h2 className="text-3xl font-black tracking-tight">Text Transformations</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                ['uppercase', 'Uppercase labels and metadata'],
                ['lowercase', 'LOWERCASE STYLING EXAMPLE'],
                ['capitalize', 'capitalize every important word'],
                ['normal-case', 'NORMAL CASE RESET'],
              ].map(([transform, text]) => (
                <div key={transform} className="rounded-2xl border border-outline/20 bg-level p-6">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                    {transform}
                  </div>

                  <div className={`${transform} text-xl font-semibold`}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUNCATION */}
        <section id="truncation" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Overflow Handling</div>
              <h2 className="text-3xl font-black tracking-tight">Truncation & Clamping</h2>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-outline/20 bg-level p-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">truncate</div>

                <div className="max-w-sm truncate text-lg font-medium">
                  This is a very long title that will truncate elegantly.
                </div>
              </div>

              <div className="rounded-2xl border border-outline/20 bg-level p-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  line-clamp-3
                </div>

                <p className="line-clamp-3 max-w-xl leading-8 text-on-surface-variant">
                  Typography truncation should preserve readability and layout consistency. Long-form content often
                  needs line clamping in cards, feeds, dashboards, and compact mobile layouts where vertical space is
                  constrained.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RESPONSIVE */}
        <section id="responsive-typography" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Adaptability</div>
              <h2 className="text-3xl font-black tracking-tight">Responsive Typography</h2>
            </div>

            <div className="rounded-3xl border border-outline/20 bg-level p-8">
              <div className="mb-4 text-xs font-bold uppercase tracking-wide text-on-surface-variant">Example</div>

              <h3 className="text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl">Responsive Headline</h3>

              <p className="mt-6 max-w-3xl leading-8 text-on-surface-variant">
                Responsive typography allows layouts to scale naturally across mobile, tablet, desktop, and ultra-wide
                interfaces.
              </p>

              <div className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm text-on-surface-variant">
                <code>text-3xl sm:text-4xl md:text-5xl lg:text-6xl</code>
              </div>
            </div>
          </div>
        </section>

        {/* ACCESSIBILITY */}
        <section id="accessibility" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Inclusive Design</div>
              <h2 className="text-3xl font-black tracking-tight">Accessibility Guidelines</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                'Maintain sufficient contrast ratios.',
                'Avoid tiny body text below readable thresholds.',
                'Use semantic heading structure consistently.',
                'Do not rely on font weight alone for hierarchy.',
                'Ensure line lengths remain readable.',
                'Prefer relaxed spacing for long-form content.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-outline/20 bg-level p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />

                    <p className="leading-7 text-on-surface-variant">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GUIDELINES */}
        <section id="guidelines" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Best Practices</div>
              <h2 className="text-3xl font-black tracking-tight">Typography Guidelines</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-outline/20 bg-level p-6">
                <div className="mb-4 text-lg font-bold text-primary">Recommended</div>

                <ul className="space-y-3 text-sm leading-7 text-on-surface-variant">
                  <li>• Use semantic text colors.</li>
                  <li>• Create consistent heading scales.</li>
                  <li>• Maintain predictable spacing rhythm.</li>
                  <li>• Use responsive typography thoughtfully.</li>
                  <li>• Keep body text highly readable.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-outline/20 bg-level p-6">
                <div className="mb-4 text-lg font-bold text-error">Avoid</div>

                <ul className="space-y-3 text-sm leading-7 text-on-surface-variant">
                  <li>• Mixing arbitrary font sizes everywhere.</li>
                  <li>• Using low contrast text on surfaces.</li>
                  <li>• Excessive uppercase body content.</li>
                  <li>• Dense line heights in long-form reading.</li>
                  <li>• Overusing bold weights for emphasis.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

  function renderSidebar() {
    return (
      <aside className="lg:w-72 lg:shrink-0">
        <div className="sticky top-6 rounded-3xl border border-outline/20 bg-level p-5 shadow-sm">
          <div className="mb-4 text-sm font-bold uppercase tracking-wide text-on-surface-variant">Typography Docs</div>

          <nav className="space-y-2 text-sm">
            {[
              'Overview',
              'Font Sizes',
              'Font Weights',
              'Line Height',
              'Letter Spacing',
              'Text Colors',
              'Alignment',
              'Transformations',
              'Truncation',
              'Responsive Typography',
              'Accessibility',
              'Guidelines',
            ].map((item) => {
              function resolveScrollRoot() {
                return window.__workspaceScrollRef?.current ?? window;
              }

              function scrollToHash(hash: string) {
                const root = resolveScrollRoot();
                const el = document.getElementById(hash);
                if (!el) return;

                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    if (root === window) {
                      const top = el.getBoundingClientRect().top + window.scrollY;

                      window.scrollTo({
                        top,
                        behavior: 'smooth',
                      });
                    } else {
                      root.scrollTo({
                        top: el.offsetTop,
                        behavior: 'smooth',
                      });
                    }
                  });
                });
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    const id = item.toLowerCase().replace(/\s+/g, '-');
                    history.pushState(null, '', `#${id}`);
                    scrollToHash(id);
                  }}
                  className="
                    block w-full rounded-xl px-3 py-2 text-left
                    text-on-surface-variant transition
                    hover:bg-surface hover:text-on-surface
                  "
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    );
  }
}
