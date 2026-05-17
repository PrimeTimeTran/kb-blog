export default function Page() {
  return (
    <div className="h-full w-full overflow-y-scroll space-y-16 bg-white p-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* PAGE HEADER */}
      <header className="space-y-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            Tailwind Visual Playground
          </p>

          <h1 className="text-5xl font-black tracking-tight">Tailwind Utility Reference</h1>

          <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            A living page for inspecting raw Tailwind utility behavior independent of your design
            system abstractions and semantic tokens.
          </p>
        </div>
      </header>

      {/* TYPOGRAPHY */}
      <section className="space-y-6">
        <SectionTitle title="Typography" />

        <div className="space-y-3">
          <h1 className="text-6xl font-black">H1 Heading</h1>
          <h2 className="text-5xl font-bold">H2 Heading</h2>
          <h3 className="text-4xl font-bold">H3 Heading</h3>
          <h4 className="text-3xl font-semibold">H4 Heading</h4>
          <h5 className="text-2xl font-semibold">H5 Heading</h5>
          <h6 className="text-xl font-medium">H6 Heading</h6>
        </div>

        <div className="space-y-3">
          <p className="text-lg leading-relaxed">Large paragraph text with relaxed line-height.</p>

          <p className="text-base">Base paragraph text.</p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">Small muted secondary text.</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="font-thin">Thin</span>
            <span className="font-light">Light</span>
            <span className="font-normal">Normal</span>
            <span className="font-medium">Medium</span>
            <span className="font-semibold">Semibold</span>
            <span className="font-bold">Bold</span>
            <span className="font-black">Black</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="italic">Italic</span>
            <span className="underline">Underline</span>
            <span className="line-through">Line Through</span>
            <span className="uppercase tracking-widest">Uppercase</span>
          </div>
        </div>
      </section>

      {/* COLORS */}
      <section className="space-y-6">
        <SectionTitle title="Colors" />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            'red',
            'orange',
            'amber',
            'yellow',
            'lime',
            'green',
            'emerald',
            'teal',
            'cyan',
            'sky',
            'blue',
            'indigo',
            'violet',
            'purple',
            'pink',
            'rose',
          ].map((c) => (
            <div
              key={c}
              className={`rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 bg-${c}-500 text-white`}
            >
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* SURFACES */}
      <section className="space-y-6">
        <SectionTitle title="Backgrounds / Surfaces / Borders" />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-zinc-100 p-6 dark:bg-zinc-900">bg-zinc-100</div>

          <div className="rounded-xl border border-zinc-300 p-6 dark:border-zinc-700">Border</div>

          <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">Shadow</div>
        </div>
      </section>

      {/* SPACING */}
      <section className="space-y-6">
        <SectionTitle title="Spacing / Padding / Gap" />

        <div className="space-y-4">
          <div className="flex gap-2">
            <Box label="gap-2" />
            <Box label="gap-2" />
            <Box label="gap-2" />
          </div>

          <div className="flex gap-6">
            <Box label="gap-6" />
            <Box label="gap-6" />
            <Box label="gap-6" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Box label="grid" />
            <Box label="grid" />
            <Box label="grid" />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="rounded bg-blue-500 p-1 text-white">p-1</div>
            <div className="rounded bg-blue-500 p-2 text-white">p-2</div>
            <div className="rounded bg-blue-500 p-4 text-white">p-4</div>
            <div className="rounded bg-blue-500 p-8 text-white">p-8</div>
          </div>
        </div>
      </section>

      {/* FLEX + GRID */}
      <section className="space-y-6">
        <SectionTitle title="Flexbox / Grid" />

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900">
            <Box label="left" />
            <Box label="center" />
            <Box label="right" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Box label="1" />
            <Box label="2" />
            <Box label="3" />
            <Box label="4" />
          </div>
        </div>
      </section>

      {/* BUTTONS */}
      <section className="space-y-6">
        <SectionTitle title="Buttons / Interactive States" />

        <div className="flex flex-wrap gap-4">
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:scale-95 transition">
            Primary
          </button>

          <button className="rounded-lg border border-zinc-300 px-4 py-2 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 transition">
            Secondary
          </button>

          <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition">
            Destructive
          </button>

          <button className="rounded-lg bg-zinc-200 px-4 py-2 opacity-50 cursor-not-allowed dark:bg-zinc-800">
            Disabled
          </button>
        </div>
      </section>

      {/* INPUTS */}
      <section className="space-y-6">
        <SectionTitle title="Inputs / Forms" />

        <div className="max-w-xl space-y-4">
          <input
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Text input"
          />

          <textarea
            className="min-h-[120px] w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Textarea"
          />

          <select className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900">
            <option>Option One</option>
            <option>Option Two</option>
          </select>
        </div>
      </section>

      {/* EFFECTS */}
      <section className="space-y-6">
        <SectionTitle title="Effects / States / Motion" />

        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl bg-black/10 p-6 dark:bg-white/10">Opacity</div>

          <div className="rounded-xl border border-zinc-300 p-6 transition hover:scale-105 hover:shadow-xl dark:border-zinc-700">
            Hover Scale
          </div>

          <div className="rounded-xl bg-linear-to-r from-blue-500 to-purple-500 p-6 text-white">
            Gradient
          </div>

          <div className="rounded-xl bg-zinc-100 p-6 backdrop-blur dark:bg-zinc-900/60">
            Backdrop Blur
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionTitle({ title }) {
  return (
    <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
  )
}

function Box({ label }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-200 text-sm font-medium dark:bg-zinc-800">
      {label}
    </div>
  )
}
