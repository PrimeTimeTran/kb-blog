export default function PreviewTailwind() {
  return (
    <div className="p-8 space-y-8 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* HEADER SCALE */}
      <section className="space-y-2">
        <h1 className="text-5xl font-bold">H1 Heading</h1>
        <h2 className="text-4xl font-semibold">H2 Heading</h2>
        <h3 className="text-3xl font-semibold">H3 Heading</h3>
        <h4 className="text-2xl font-medium">H4 Heading</h4>
        <h5 className="text-xl font-medium">H5 Heading</h5>
        <h6 className="text-lg font-medium">H6 Heading</h6>
      </section>

      {/* TEXT + TYPOGRAPHY */}
      <section className="space-y-2">
        <p className="text-base leading-relaxed">
          This is normal paragraph text. It should be readable and properly spaced.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Small muted text (secondary UI)</p>
        <p className="font-bold">Bold text</p>
        <p className="italic">Italic text</p>
        <p className="underline">Underlined text</p>
        <p className="line-through">Strikethrough text</p>
      </section>

      {/* COLORS */}
      <section className="space-y-2">
        <div className="text-red-500">Red text</div>
        <div className="text-blue-500">Blue text</div>
        <div className="text-green-500">Green text</div>
        <div className="text-zinc-500">Muted zinc text</div>
      </section>

      {/* BACKGROUNDS + BOXES */}
      <section className="space-y-3">
        <div className="p-4 bg-red-500 text-white rounded-lg">Red box</div>
        <div className="p-4 bg-blue-500 text-white rounded-lg">Blue box</div>
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          Neutral box (dark mode aware)
        </div>
      </section>

      {/* BORDERS + SHADOWS */}
      <section className="space-y-3">
        <div className="p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg">Border box</div>
        <div className="p-4 shadow-md rounded-lg bg-white dark:bg-zinc-900">Shadow box</div>
        <div className="p-4 shadow-xl rounded-lg bg-white dark:bg-zinc-900">Strong shadow</div>
      </section>

      {/* FLEX / LAYOUT */}
      <section className="space-y-3">
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-red-500"></div>
          <div className="w-10 h-10 bg-blue-500"></div>
          <div className="w-10 h-10 bg-green-500"></div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800"></div>
        </div>
      </section>

      {/* INTERACTIVE */}
      <section className="space-y-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Button
        </button>

        <input
          className="w-full p-2 border rounded bg-white dark:bg-zinc-900 dark:border-zinc-700"
          placeholder="Input field"
        />
      </section>

      {/* OPACITY / STATES */}
      <section className="space-y-2">
        <div className="p-4 bg-black/10 dark:bg-white/10">Background opacity test</div>

        <div className="p-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
          Hover me (text color transition)
        </div>
      </section>
    </div>
  )
}
