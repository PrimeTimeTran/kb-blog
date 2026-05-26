import { Copy } from 'lucide-react';

const COLOR_GROUPS = [
  {
    title: 'Primary',
    description: 'Primary brand actions and emphasis.',
    tokens: [
      ['bg-primary', 'text-on-primary'],
      ['bg-primary-container', 'text-on-primary-container'],
      ['text-primary', 'bg-surface'],
    ],
  },
  {
    title: 'Secondary',
    description: 'Supporting accents and complementary emphasis.',
    tokens: [
      ['bg-secondary', 'tex-on-secondary'],
      ['bg-secondary-container', 'tex-on-secondary'],
      ['text-secondary', 'bg-surface'],
    ],
  },
  {
    title: 'Tertiary',
    description: 'Visual differentiation and accents.',
    tokens: [
      ['bg-tertiary', 'text-on-tertiary'],
      ['bg-tertiary-container', 'text-on-tertiary-container'],
      ['text-tertiary', 'bg-surface'],
    ],
  },
  {
    title: 'Error',
    description: 'Destructive actions and validation feedback.',
    tokens: [
      ['bg-error', 'text-on-error'],
      ['bg-error-container', 'text-on-error-container'],
      ['text-error', 'bg-surface'],
    ],
  },
];

const SURFACES = [
  'bg-surface',
  'bg-surface-dim',
  'bg-surface-bright',
  'bg-lowest',
  'bg-low',
  'bg-level',
  'bg-high',
  'bg-highest',
];

function CopyButton({ value }: { value: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(value)}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-outline/20 bg-surface text-on-surface-variant transition hover:bg-high hover:text-on-surface"
    >
      <Copy className="h-4 w-4" />
    </button>
  );
}

function TokenCard({ bg, fg }: { bg: string; fg: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-outline/20 bg-surface shadow-sm">
      <div className={`${bg} ${fg} p-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-bold uppercase tracking-wide opacity-80">Example</div>

            <div className="mt-2 text-xl font-black">Semantic Token</div>

            <div className="mt-2 text-sm opacity-90">Material-style role pairing.</div>
          </div>

          <div className="flex gap-2">
            <CopyButton value={bg} />
            <CopyButton value={fg} />
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-level p-4 text-sm">
        <div className="flex items-center justify-between gap-4 rounded-xl bg-surface px-3 py-2">
          <code>{bg}</code>
          <CopyButton value={bg} />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl bg-surface px-3 py-2">
          <code>{fg}</code>
          <CopyButton value={fg} />
        </div>
      </div>
    </div>
  );
}

// 1. Make the token container have a hover effect to indicator we've entered
// copy able box
// 2. Enable click anywhere on the in the container holding the copy button copy to clipboard.
// 3. Show a notification when copied.
// 4. Add a sideback
export default function MaterialTokenPalette() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* HERO */}
      <section className="border-b border-outline/20 bg-surface px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center rounded-full border border-outline/20 bg-primary-container px-3 py-1 text-xs font-bold tracking-wide text-on-primary-container">
                Omni Material Tokens
              </div>

              <div>
                <h1 className="text-4xl font-black tracking-tight">Color Palette Reference</h1>

                <p className="mt-4 max-w-3xl leading-8 text-on-surface-variant">
                  Compact semantic token reference for developers. Quickly find role pairings, surface variants, and
                  foreground/background relationships.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-outline/20 bg-level px-5 py-4 text-sm text-on-surface-variant">
              <div>
                Use semantic pairs like <code>bg-surface + text-on-surface</code>
              </div>
              <div className="mt-2">Avoid raw palette colors in app UI.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        {/* QUICK REFERENCE */}
        <section className="rounded-3xl border border-outline/20 bg-surface p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold uppercase tracking-wide text-primary">Quick Reference</div>
              <h2 className="mt-2 text-2xl font-black">Common Semantic Pairs</h2>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {[
              ['bg-surface', 'text-on-surface'],
              ['bg-level', 'text-on-surface'],
              ['bg-primary', 'text-on-primary'],
              ['bg-primary-container', 'text-on-primary-container'],
              ['bg-secondary', 'tex-on-secondary'],
              ['bg-tertiary', 'text-on-tertiary'],
              ['bg-error', 'text-on-error'],
              ['bg-background', 'text-on-background'],
            ].map(([bg, fg]) => (
              <div key={bg} className="overflow-hidden rounded-2xl border border-outline/20">
                <div className={`${bg} ${fg} p-5`}>
                  <div className="text-lg font-bold">Preview</div>
                  <div className="mt-2 text-sm opacity-90">Semantic foreground pairing.</div>
                </div>

                <div className="space-y-2 bg-level p-3 text-xs">
                  {[bg, fg].map((token) => (
                    <div
                      key={token}
                      className="flex items-center justify-between gap-2 rounded-lg bg-surface px-3 py-2"
                    >
                      <code>{token}</code>
                      <CopyButton value={token} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLOR GROUPS */}
        <section className="space-y-8">
          <div>
            <div className="text-sm font-bold uppercase tracking-wide text-primary">Token Groups</div>
            <h2 className="mt-2 text-3xl font-black">Semantic Color Roles</h2>
          </div>

          <div className="space-y-8">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title} className="rounded-3xl border border-outline/20 bg-surface p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h3 className="text-2xl font-black">{group.title}</h3>
                    <p className="mt-2 text-on-surface-variant">{group.description}</p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {group.tokens.map(([bg, fg]) => (
                    <TokenCard key={bg} bg={bg} fg={fg} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SURFACES */}
        <section className="rounded-3xl border border-outline/20 bg-surface p-6 shadow-sm">
          <div className="mb-8">
            <div className="text-sm font-bold uppercase tracking-wide text-primary">Layout Foundations</div>

            <h2 className="mt-2 text-3xl font-black">Surface Hierarchy</h2>

            <p className="mt-4 max-w-3xl leading-8 text-on-surface-variant">
              Surface tokens establish elevation, grouping, and visual depth. Text tokens like{' '}
              <code>text-on-surface</code> assume they are placed on semantic surfaces.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {SURFACES.map((surface) => (
              <div key={surface} className="overflow-hidden rounded-2xl border border-outline/20">
                <div className={`${surface} p-5 text-on-surface`}>
                  <div className="text-lg font-bold">Surface</div>
                  <div className="mt-2 text-sm text-on-surface-variant">Example semantic content.</div>

                  <div className="mt-5 rounded-xl border border-outline/10 bg-primary px-4 py-3 text-sm font-semibold text-on-primary">
                    Action
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 bg-level p-3 text-xs">
                  <code>{surface}</code>
                  <CopyButton value={surface} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOREGROUND TOKENS */}
        <section className="rounded-3xl border border-outline/20 bg-surface p-6 shadow-sm">
          <div className="mb-8">
            <div className="text-sm font-bold uppercase tracking-wide text-primary">Foreground Roles</div>

            <h2 className="mt-2 text-3xl font-black">Text & Foreground Tokens</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {[
              'text-on-background',
              'text-on-surface',
              'text-on-surface-variant',
              'text-on-primary',
              'tex-on-secondary',
              'text-on-tertiary',
              'text-on-error',
              'text-primary',
              'text-secondary',
              'text-tertiary',
              'text-error',
            ].map((token) => (
              <div key={token} className="rounded-2xl border border-outline/20 bg-level p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">Token</div>

                    <div className={`${token} text-xl font-bold`}>Typography Example</div>
                  </div>

                  <CopyButton value={token} />
                </div>

                <div className="mt-5 rounded-xl bg-surface px-3 py-2 text-xs">
                  <code>{token}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-outline/20 bg-surface p-6 shadow-sm">
            <div className="mb-4 text-lg font-bold text-primary">Recommended</div>

            <ul className="space-y-3 text-sm leading-7 text-on-surface-variant">
              <li>• Use semantic foreground/background pairs.</li>
              <li>• Prefer surface hierarchy over arbitrary containers.</li>
              <li>• Keep elevation subtle and meaningful.</li>
              <li>• Maintain consistent token usage across components.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-outline/20 bg-surface p-6 shadow-sm">
            <div className="mb-4 text-lg font-bold text-error">Avoid</div>

            <ul className="space-y-3 text-sm leading-7 text-on-surface-variant">
              <li>• Mixing raw Tailwind palette colors with semantic tokens.</li>
              <li>• Using on-surface text without semantic surfaces.</li>
              <li>• Creating one-off custom token variants unnecessarily.</li>
              <li>• Overusing nested containers and tonal layers.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
