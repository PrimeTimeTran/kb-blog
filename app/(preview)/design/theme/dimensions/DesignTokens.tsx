export function DesignToken() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <section className="border-b border-outline/20 bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-outline/20 bg-primary-container px-3 py-1 text-xs font-semibold tracking-wide text-on-primary-container">
              Loi Tran Design System
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-tight">Design Tokens</h1>

              <p className="text-lg leading-8 text-on-surface-variant">
                Design tokens are the foundational language of the Omni UI system. They provide semantic meaning for
                color, typography, spacing, elevation, motion, and interaction states.
              </p>

              <p className="text-base leading-7 text-on-surface-variant">
                Instead of styling components with raw values like{' '}
                <code className="rounded bg-level px-2 py-1 text-sm">#ffffff</code> or{' '}
                <code className="rounded bg-level px-2 py-1 text-sm">text-gray-700</code>, Omni uses semantic tokens
                such as <code className="rounded bg-level px-2 py-1 text-sm">bg-surface</code> and{' '}
                <code className="rounded bg-level px-2 py-1 text-sm">text-on-surface</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────── */}
      {/* PAGE LAYOUT */}
      {/* ───────────────────────────────────────────── */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row">
        {/* SIDEBAR */}
        <aside className="lg:w-72 lg:flex-shrink-0">
          <div className="sticky top-6 rounded-3xl border border-outline/20 bg-level p-5 shadow-sm">
            <div className="mb-4 text-sm font-bold uppercase tracking-wide text-on-surface-variant">On this page</div>

            <nav className="space-y-2 text-sm">
              {[
                'Introduction',
                'Token Philosophy',
                'Color Roles',
                'Surface Hierarchy',
                'Typography',
                'Spacing',
                'Elevation',
                'States',
                'Accessibility',
                'Examples',
                'Guidelines',
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block rounded-xl px-3 py-2 text-on-surface-variant transition hover:bg-surface hover:text-on-surface"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="min-w-0 flex-1 space-y-12">
          {/* INTRODUCTION */}
          <section id="introduction" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-5">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Foundation</div>
                <h2 className="text-3xl font-black tracking-tight">Introduction</h2>
              </div>

              <p className="max-w-4xl text-base leading-8 text-on-surface-variant">
                Tokens are the abstraction layer between design intent and UI implementation. Components should never
                depend on hardcoded visual values. Instead, components consume semantic roles that adapt automatically
                across themes, density systems, brand modes, and accessibility contexts.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: 'Semantic',
                    body: 'Tokens describe purpose instead of raw appearance.',
                  },
                  {
                    title: 'Scalable',
                    body: 'The system grows consistently across products.',
                  },
                  {
                    title: 'Themeable',
                    body: 'Dark mode and branding become automatic.',
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

          {/* TOKEN PHILOSOPHY */}
          <section id="token-philosophy" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Architecture</div>
                <h2 className="text-3xl font-black tracking-tight">Token Philosophy</h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-outline/20">
                <table className="w-full text-left text-sm">
                  <thead className="bg-high">
                    <tr>
                      <th className="px-5 py-4 font-bold">Layer</th>
                      <th className="px-5 py-4 font-bold">Purpose</th>
                      <th className="px-5 py-4 font-bold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        layer: 'Primitive',
                        purpose: 'Raw palette and scales',
                        example: 'neutral-100, blue-500',
                      },
                      {
                        layer: 'Semantic',
                        purpose: 'Intent and meaning',
                        example: 'surface, primary, error',
                      },
                      {
                        layer: 'Component',
                        purpose: 'Usage inside components',
                        example: 'button-filled-bg',
                      },
                    ].map((row) => (
                      <tr key={row.layer} className="border-t border-outline/10">
                        <td className="px-5 py-4 font-semibold">{row.layer}</td>
                        <td className="px-5 py-4 text-on-surface-variant">{row.purpose}</td>
                        <td className="px-5 py-4">
                          <code>{row.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary-container/30 p-6">
                <div className="mb-3 text-lg font-bold text-on-primary-container">Key Principle</div>

                <p className="leading-8 text-on-primary-container/90">
                  Components should express intent, not color choices. A component asking for <code>bg-white</code> is
                  tightly coupled to appearance. A component asking for <code>bg-surface</code>
                  is describing semantic purpose.
                </p>
              </div>
            </div>
          </section>

          {/* COLOR ROLES */}
          <section id="color-roles" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Color System</div>
                <h2 className="text-3xl font-black tracking-tight">Semantic Color Roles</h2>
              </div>

              <p className="max-w-4xl leading-8 text-on-surface-variant">
                Omni follows a Material-inspired semantic role structure where every color has a contextual purpose and
                an associated foreground role.
              </p>

              <div className="grid gap-5 lg:grid-cols-2">
                {[
                  {
                    name: 'Primary',
                    bg: 'bg-primary',
                    text: 'text-on-primary',
                    role: 'Primary actions and emphasis',
                  },
                  {
                    name: 'Secondary',
                    bg: 'bg-secondary',
                    text: 'tex-on-secondary',
                    role: 'Supporting emphasis',
                  },
                  {
                    name: 'Tertiary',
                    bg: 'bg-tertiary',
                    text: 'text-on-tertiary',
                    role: 'Accent differentiation',
                  },
                  {
                    name: 'Error',
                    bg: 'bg-error',
                    text: 'text-on-error',
                    role: 'Destructive and validation states',
                  },
                ].map((item) => (
                  <div key={item.name} className="overflow-hidden rounded-2xl border border-outline/20">
                    <div className={`${item.bg} ${item.text} p-6`}>
                      <div className="text-xl font-black">{item.name}</div>
                      <div className="mt-2 text-sm opacity-90">{item.role}</div>
                    </div>

                    <div className="space-y-3 bg-level p-5 text-sm">
                      <div>
                        <span className="font-semibold">Background:</span> <code>{item.bg}</code>
                      </div>
                      <div>
                        <span className="font-semibold">Foreground:</span> <code>{item.text}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SURFACE HIERARCHY */}
          <section id="surface-hierarchy" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Depth System</div>
                <h2 className="text-3xl font-black tracking-tight">Surface Hierarchy</h2>
              </div>

              <p className="leading-8 text-on-surface-variant">
                Surface tokens establish visual elevation and layout structure. Text roles such as{' '}
                <code>text-on-surface</code> assume they are rendered on an actual semantic surface.
              </p>

              <div className="space-y-4 rounded-3xl border border-outline/20 bg-low p-6">
                <div className="rounded-2xl border border-outline/10 bg-surface p-6 shadow-sm">
                  <div className="font-bold">surface</div>
                  <div className="mt-2 text-sm text-on-surface-variant">Primary application canvas.</div>

                  <div className="mt-5 rounded-xl border border-outline/10 bg-level p-5">
                    <div className="font-bold">surface-container</div>
                    <div className="mt-2 text-sm text-on-surface-variant">Grouped regions and cards.</div>

                    <div className="mt-5 rounded-xl border border-outline/10 bg-high p-5">
                      <div className="font-bold">surface-container-high</div>
                      <div className="mt-2 text-sm text-on-surface-variant">Elevated interactive regions.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-warning/20 bg-warning-container/40 p-6">
                <div className="mb-3 text-lg font-bold text-on-warning-container">Common Mistake</div>

                <p className="leading-8 text-on-warning-container/90">
                  Using <code>text-on-surface</code> directly on transparent layouts can create contrast issues. The
                  token assumes the content sits on a semantic surface background.
                </p>
              </div>
            </div>
          </section>

          {/* TYPOGRAPHY */}
          <section id="typography" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Typography</div>
                <h2 className="text-3xl font-black tracking-tight">Type Scale</h2>
              </div>

              <div className="space-y-5">
                {[
                  ['Display', 'text-6xl font-black'],
                  ['Headline', 'text-4xl font-black'],
                  ['Title', 'text-2xl font-bold'],
                  ['Body', 'text-base'],
                  ['Label', 'text-sm font-medium uppercase tracking-wide'],
                ].map(([label, classes]) => (
                  <div key={label} className="rounded-2xl border border-outline/20 bg-level p-5">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                      {label}
                    </div>
                    <div className={classes}>The quick brown fox jumps over the lazy dog.</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SPACING */}
          <section id="spacing" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Layout Rhythm</div>
                <h2 className="text-3xl font-black tracking-tight">Spacing Scale</h2>
              </div>

              <div className="space-y-4">
                {[2, 4, 6, 8, 12, 16].map((size) => (
                  <div key={size} className="flex items-center gap-5 rounded-2xl border border-outline/20 bg-level p-4">
                    <div className="w-20 text-sm font-semibold">{size}</div>
                    <div className="h-6 rounded bg-primary" style={{ width: `${size * 12}px` }} />
                    <code className="text-sm">space-{size}</code>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ELEVATION */}
          <section id="elevation" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Depth & Shadows</div>
                <h2 className="text-3xl font-black tracking-tight">Elevation</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: 'Level 0',
                    className: 'shadow-none',
                  },
                  {
                    title: 'Level 1',
                    className: 'shadow-sm',
                  },
                  {
                    title: 'Level 2',
                    className: 'shadow-xl',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-3xl border border-outline/20 bg-level p-8 ${item.className}`}
                  >
                    <div className="text-xl font-bold">{item.title}</div>
                    <div className="mt-2 text-sm leading-7 text-on-surface-variant">
                      Use elevation intentionally to reinforce interaction and hierarchy.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STATES */}
          <section id="states" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Interaction States</div>
                <h2 className="text-3xl font-black tracking-tight">State Layers</h2>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="rounded-2xl bg-primary px-5 py-3 font-semibold text-on-primary transition hover:opacity-90 active:scale-[0.98]">
                  Default
                </button>

                <button className="rounded-2xl border border-outline bg-surface px-5 py-3 font-semibold text-on-surface transition hover:bg-high">
                  Hover
                </button>

                <button className="cursor-not-allowed rounded-2xl bg-level px-5 py-3 font-semibold text-on-surface-variant opacity-50">
                  Disabled
                </button>
              </div>

              <div className="rounded-2xl border border-outline/20 bg-level p-6">
                <p className="leading-8 text-on-surface-variant">
                  State feedback should be subtle and consistent. Prefer opacity, tonal overlays, elevation changes, and
                  motion over abrupt color shifts.
                </p>
              </div>
            </div>
          </section>

          {/* ACCESSIBILITY */}
          <section id="accessibility" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Accessibility</div>
                <h2 className="text-3xl font-black tracking-tight">Inclusive Design</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {[
                  'Maintain semantic foreground/background relationships.',
                  'Do not rely solely on color for communication.',
                  'Respect motion reduction preferences.',
                  'Use consistent focus states across interactive elements.',
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

          {/* EXAMPLES */}
          <section id="examples" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Composition</div>
                <h2 className="text-3xl font-black tracking-tight">Example UI Composition</h2>
              </div>

              <div className="rounded-3xl border border-outline/20 bg-low p-6">
                <div className="rounded-3xl border border-outline/10 bg-surface p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-2xl font-black">Analytics Dashboard</div>
                      <div className="mt-2 text-on-surface-variant">Semantic layout using Omni surfaces.</div>
                    </div>

                    <button className="rounded-2xl bg-primary px-4 py-3 font-semibold text-on-primary">
                      Create Report
                    </button>
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="rounded-2xl border border-outline/10 bg-level p-5">
                        <div className="text-sm text-on-surface-variant">Revenue</div>
                        <div className="mt-2 text-3xl font-black">$24.5k</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GUIDELINES */}
          <section id="guidelines" className="rounded-3xl border border-outline/20 bg-surface p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">Best Practices</div>
                <h2 className="text-3xl font-black tracking-tight">Guidelines</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-outline/20 bg-level p-6">
                  <div className="mb-4 text-lg font-bold text-primary">Do</div>

                  <ul className="space-y-3 text-sm leading-7 text-on-surface-variant">
                    <li>• Use semantic roles instead of hardcoded colors.</li>
                    <li>• Build components from reusable surface patterns.</li>
                    <li>• Keep elevation minimal and intentional.</li>
                    <li>• Ensure text roles match their background roles.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-outline/20 bg-level p-6">
                  <div className="mb-4 text-lg font-bold text-error">Avoid</div>

                  <ul className="space-y-3 text-sm leading-7 text-on-surface-variant">
                    <li>• Mixing raw Tailwind colors with semantic tokens.</li>
                    <li>• Using transparent layouts without surface context.</li>
                    <li>• Overusing shadows and nested containers.</li>
                    <li>• Creating one-off component styling rules.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
