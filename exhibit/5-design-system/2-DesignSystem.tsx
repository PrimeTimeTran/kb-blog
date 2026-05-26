export function DesignSystem() {
  return (
    <div className="min-h-0 bg-background text-on-background w-full overflow-y-scroll">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 p-8">
        {/* HEADER */}
        <header className="space-y-4">
          <div className="inline-flex items-center rounded-full bg-primary text-on-primary px-3 py-1 text-sm font-medium ">
            Material 3 Theme Preview
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight">Design System Surface Lab</h1>

            <p className="max-w-3xl text-lg leading-relaxed text-on-surface-variant">
              A comprehensive visual reference for your Material-inspired token system, semantic surfaces, elevation
              hierarchy, interaction states, chips, controls, and typography behavior.
            </p>
          </div>
        </header>

        {/* COLOR TOKENS */}
        <Section title="Color Roles">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ColorCard title="Primary" className="bg-primary text-on-primary" />

            <ColorCard title="Primary Container" className="bg-primary-container text-on-primary-container" />

            <ColorCard title="Secondary" className="bg-secondary tex-on-secondary" />

            <ColorCard title="Secondary Container" className="bg-secondary-container tex-on-secondary" />

            <ColorCard title="Tertiary" className="bg-tertiary text-on-tertiary" />

            <ColorCard title="Error" className="bg-error text-on-error" />

            <ColorCard title="Surface" className="bg-surface text-on-surface border border-outline-variant" />

            <ColorCard title="Surface Variant" className="bg-surface-variant text-on-surface-variant" />
          </div>
        </Section>

        {/* SURFACE HIERARCHY */}
        <Section title="Surface Hierarchy">
          <div className="grid gap-6 lg:grid-cols-2">
            <SurfaceCard className="bg-lowest">surface-container-lowest</SurfaceCard>

            <SurfaceCard className="bg-low">surface-container-low</SurfaceCard>

            <SurfaceCard className="bg-level">surface-container</SurfaceCard>

            <SurfaceCard className="bg-high">surface-container-high</SurfaceCard>

            <SurfaceCard className="bg-highest">surface-container-highest</SurfaceCard>
          </div>
        </Section>

        {/* TYPOGRAPHY */}
        <Section title="Typography">
          <div className="space-y-4">
            <h1 className="text-6xl font-black">Display Large</h1>
            <h2 className="text-5xl font-bold">Headline Large</h2>
            <h3 className="text-4xl font-bold">Headline Medium</h3>
            <h4 className="text-3xl font-semibold">Title Large</h4>

            <p className="max-w-4xl text-lg leading-relaxed text-on-surface-variant">
              Material typography should maintain strong readability and clear visual hierarchy while adapting
              gracefully to both light and dark surfaces.
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="rounded-full bg-level px-3 py-1 text-sm">Label Small</span>

              <span className="rounded-full bg-high px-4 py-2 text-base">Label Medium</span>

              <span className="rounded-full bg-primary-container px-5 py-2 font-medium text-on-primary">
                Emphasized Label
              </span>
            </div>
          </div>
        </Section>

        {/* BUTTONS */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-primary px-5 py-2 font-medium text-on-primary transition hover:opacity-90">
              Filled
            </button>

            <button className="rounded-full bg-secondary-container px-5 py-2 font-medium tex-on-secondary transition hover:opacity-90">
              Tonal
            </button>

            <button className="rounded-full border border-outline px-5 py-2 font-medium text-on-surface transition hover:bg-level">
              Outlined
            </button>

            <button className="rounded-full px-5 py-2 font-medium text-primary transition hover:bg-primary-container/40">
              Text
            </button>

            <button disabled className="cursor-not-allowed rounded-full bg-high px-5 py-2 text-on-surface opacity-40">
              Disabled
            </button>
          </div>
        </Section>

        {/* CHIPS */}
        <Section title="Chip System">
          <div className="flex flex-wrap gap-3">
            <Chip label="React" active count={12} />
            <Chip label="Next.js" count={4} />
            <Chip label="TypeScript" count={28} />
            <Chip label="Disabled" disabled count={0} />
          </div>

          <div className="rounded-2xl bg-level p-6">
            <p className="mb-4 text-sm text-on-surface-variant">Chips acting as page-state controls:</p>

            <div className="flex flex-wrap gap-3">
              <Chip label="Architecture" active count={9} />
              <Chip label="UI" count={14} />
              <Chip label="Animations" count={2} />
              <Chip label="Tailwind" count={7} />
            </div>
          </div>
        </Section>

        {/* INPUTS */}
        <Section title="Inputs / Forms">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-3xl bg-level p-6">
              <label className="text-sm font-medium text-on-surface-variant">Search</label>

              <input
                className="
                  w-full rounded-xl border border-outline-variant
                  bg-background px-4 py-3
                  text-on-background outline-none
                  transition
                  focus:border-primary
                  focus:ring-4 focus:ring-primary/20
                "
                placeholder="Search posts..."
              />
            </div>

            <div className="space-y-4 rounded-3xl bg-high p-6">
              <label className="text-sm font-medium text-on-surface-variant">Message</label>

              <textarea
                className="
                  min-h-[140px] w-full rounded-xl border border-outline-variant
                  bg-background px-4 py-3
                  text-on-background outline-none
                  transition
                  focus:border-primary
                  focus:ring-4 focus:ring-primary/20
                "
                placeholder="Write something..."
              />
            </div>
          </div>
        </Section>

        {/* CARDS */}
        <Section title="Cards / Elevation">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-outline-variant bg-surface p-6">
              <h3 className="text-xl font-semibold">Flat Card</h3>

              <p className="mt-3 text-on-surface-variant">Minimal emphasis surface.</p>
            </article>

            <article className="rounded-3xl bg-level p-6 shadow-md">
              <h3 className="text-xl font-semibold">Elevated Card</h3>

              <p className="mt-3 text-on-surface-variant">Elevated with subtle shadow hierarchy.</p>
            </article>

            <article className="rounded-3xl bg-primary-container p-6 text-on-primary">
              <h3 className="text-xl font-semibold">Emphasized Card</h3>

              <p className="mt-3 opacity-90">Used for featured or focused content.</p>
            </article>
          </div>
        </Section>

        {/* NAV / LISTS */}
        <Section title="Lists / Navigation">
          <div className="overflow-hidden rounded-3xl border border-outline-variant bg-surface">
            {['Design Systems', 'Tailwind Architecture', 'Animation Tokens', 'Material Surfaces'].map((item) => (
              <button
                key={item}
                className="
                  flex w-full items-center justify-between
                  border-b border-outline-variant
                  px-6 py-4 text-left
                  transition hover:bg-level
                  last:border-none
                "
              >
                <span>{item}</span>

                <span className="text-sm text-on-surface-variant">Open</span>
              </button>
            ))}
          </div>
        </Section>

        {/* STATES */}
        <InteractionTestingSuite />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="border-b border-outline-variant pb-3">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function ColorCard({ title, className }: { title: string; className?: string }) {
  return (
    <div className={`rounded-3xl p-6 shadow-sm ${className}`}>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-sm opacity-90">Material semantic color role</p>
      </div>
    </div>
  );
}

function SurfaceCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`
        rounded-3xl border border-outline-variant
        p-8 text-on-surface shadow-sm
        ${className}
      `}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{children}</h3>

        <p className="text-on-surface-variant">Surface elevation and containment preview.</p>
      </div>
    </div>
  );
}

function Chip({
  label,
  count,
  active,
  disabled,
}: {
  label: string;
  count?: number;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center gap-2
        rounded-full px-3 py-1.5
        text-sm font-medium
        transition

        ${active ? 'bg-primary-container text-on-primary' : 'bg-high text-on-surface hover:bg-highest'}

        ${disabled ? 'cursor-not-allowed opacity-40' : ''}
      `}
    >
      <span>{label}</span>

      {count !== undefined && (
        <span
          className="
            rounded-full border border-outline-variant
            px-2 py-0.5 text-xs
            text-on-surface-variant
          "
        >
          {count}
        </span>
      )}
    </button>
  );
}
export function InteractionTestingSuite() {
  const roles = [
    { name: 'Primary', bg: 'bg-primary', text: 'text-on-primary', hover: 'hover:bg-primary/90' },
    { name: 'Secondary', bg: 'bg-secondary', text: 'tex-on-secondary', hover: 'hover:bg-secondary/90' },
    { name: 'Tertiary', bg: 'bg-tertiary', text: 'text-on-tertiary', hover: 'hover:bg-tertiary/90' },
    { name: 'Error', bg: 'bg-error', text: 'text-on-error', hover: 'hover:bg-error/90' },
    { name: 'Success', bg: 'bg-success', text: 'text-on-success', hover: 'hover:bg-success/90' },
    { name: 'Warning', bg: 'bg-warning', text: 'text-on-warning', hover: 'hover:bg-warning/90' },
    { name: 'Info', bg: 'bg-info', text: 'text-on-info', hover: 'hover:bg-info/90' },
  ];

  return (
    <div className="p-8 bg-lowest rounded-3xl space-y-12">
      {roles.map((role) => (
        <div key={role.name} className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{role.name} Role</h3>

          <div className="flex flex-wrap gap-4">
            {/* Base State */}
            <button className={`${role.bg} ${role.text} px-6 py-3 rounded-xl font-bold`}>Base</button>

            {/* Hover State */}
            <button className={`${role.bg} ${role.text} ${role.hover} px-6 py-3 rounded-xl font-bold transition`}>
              Hover
            </button>

            {/* Container State (Using your primary-container logic) */}
            <button
              className={`bg-${role.name.toLowerCase()}-container text-on-${role.name.toLowerCase()}-container px-6 py-3 rounded-xl font-bold`}
            >
              Container
            </button>

            {/* Focus/Active State */}
            <button className={`${role.bg} ${role.text} ring-4 ring-on-surface/20 active:scale-95 transition`}>
              Focus/Active
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
function StateBox({ label, className }: { label: string; className?: string }) {
  return (
    <button
      className={`
        rounded-2xl border border-outline-variant
        bg-level px-8 py-6
        transition
        ${className}
      `}
    >
      {label}
    </button>
  );
}
