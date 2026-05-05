export default function PreviewDesignSystem() {
  return (
    <div className="p-10 space-y-12 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* ===================== */}
      {/* COLOR SYSTEM */}
      {/* ===================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Color System (Material Roles)</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* PRIMARY */}
          <div className="space-y-2">
            <div className="h-12 rounded bg-primary-500" />
            <p className="text-sm">Primary</p>
          </div>

          <div className="space-y-2">
            <div className="h-12 rounded bg-primary-700" />
            <p className="text-sm">Primary Dark</p>
          </div>

          {/* SECONDARY */}
          <div className="space-y-2">
            <div className="h-12 rounded bg-purple-500" />
            <p className="text-sm">Secondary</p>
          </div>

          <div className="space-y-2">
            <div className="h-12 rounded bg-purple-700" />
            <p className="text-sm">Secondary Dark</p>
          </div>

          {/* TERTIARY */}
          <div className="space-y-2">
            <div className="h-12 rounded bg-emerald-500" />
            <p className="text-sm">Tertiary</p>
          </div>

          <div className="space-y-2">
            <div className="h-12 rounded bg-emerald-700" />
            <p className="text-sm">Tertiary Dark</p>
          </div>

          {/* NEUTRALS */}
          <div className="space-y-2">
            <div className="h-12 rounded bg-zinc-200 dark:bg-zinc-800" />
            <p className="text-sm">Surface</p>
          </div>

          <div className="space-y-2">
            <div className="h-12 rounded bg-zinc-100 dark:bg-zinc-900" />
            <p className="text-sm">Surface Alt</p>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* TYPOGRAPHY SCALE */}
      {/* ===================== */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">Typography Scale</h2>

        <h1 className="text-5xl font-bold">Display / H1</h1>
        <h2 className="text-4xl font-semibold">Headline / H2</h2>
        <h3 className="text-3xl font-semibold">Title / H3</h3>
        <h4 className="text-2xl font-medium">Subtitle / H4</h4>

        <p className="text-base leading-relaxed">
          Body text — primary reading content should live here with comfortable line height.
        </p>

        <p className="text-sm text-zinc-500">Secondary text — supporting metadata or hints.</p>
      </section>

      {/* ===================== */}
      {/* BUTTON SYSTEM */}
      {/* ===================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Buttons</h2>

        <div className="flex flex-wrap gap-3">
          {/* PRIMARY ACTION */}
          <button className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600">
            Primary Action
          </button>

          {/* SECONDARY ACTION */}
          <button className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600">
            Secondary Action
          </button>

          {/* TERTIARY / ACCENT */}
          <button className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600">
            Tertiary Action
          </button>

          {/* OUTLINE */}
          <button className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700">
            Outline
          </button>

          {/* TEXT */}
          <button className="px-4 py-2 rounded text-primary-500 hover:text-primary-700">
            Text Button
          </button>
        </div>
      </section>

      {/* ===================== */}
      {/* SURFACES / ELEVATION */}
      {/* ===================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Surfaces & Elevation</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded bg-white dark:bg-zinc-900 shadow-sm">Elevation 1</div>

          <div className="p-4 rounded bg-white dark:bg-zinc-900 shadow-md">Elevation 2</div>

          <div className="p-4 rounded bg-white dark:bg-zinc-900 shadow-xl">Elevation 3</div>
        </div>
      </section>

      {/* ===================== */}
      {/* INTERACTIVE STATES */}
      {/* ===================== */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">States</h2>

        <div className="space-y-3">
          <div className="p-3 rounded bg-primary-500 text-white">Selected / Active</div>

          <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition">
            Hover state
          </div>

          <div className="p-3 rounded opacity-50 cursor-not-allowed bg-zinc-200 dark:bg-zinc-800">
            Disabled state
          </div>

          <div className="p-3 rounded border border-red-500 text-red-500">Error state</div>
        </div>
      </section>

      {/* ===================== */}
      {/* LINKS */}
      {/* ===================== */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">Links</h2>

        <a className="text-primary-500 hover:text-primary-700 underline">Primary Link</a>
        <br />
        <a className="text-purple-500 hover:text-purple-700 underline">Secondary Link</a>
        <br />
        <a className="text-emerald-500 hover:text-emerald-700 underline">Tertiary Link</a>
      </section>
    </div>
  )
}
