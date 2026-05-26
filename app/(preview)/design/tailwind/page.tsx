import { Tailwind } from '@/exhibit/5-design-system/3-Tailwind';

// Inspiration Sites.
// https://list.swajp.me/
// https://godly.website/website/v-a-c-sreda-242

export default Page;
const inputBase =
  'w-full rounded-lg border bg-[var(--surface)] px-4 py-2 outline-none transition ' +
  'border-[var(--border)] text-[var(--text)] ' +
  'placeholder:text-[var(--muted)] ' +
  'focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20';

const buttonBase = 'rounded-lg px-4 py-2 font-medium transition active:scale-[0.98]';

export function Page() {
  // Causes infinite css compilation in root pages
  // .aurora-text
  // useEffect(() => {
  //   const update = (e: MouseEvent) => {
  //     document.documentElement.style.setProperty('--x', `${e.clientX}px`)
  //     document.documentElement.style.setProperty('--y', `${e.clientY}px`)
  //   }
  //   window.addEventListener('mousemove', update)
  //   return () => window.removeEventListener('mousemove', update)
  // }, [])
  // // .gradient-text
  // useEffect(() => {
  //   let targetAngle = 0
  //   let currentAngle = 0

  //   const onMove = (e: MouseEvent) => {
  //     const x = e.clientX / window.innerWidth
  //     const y = e.clientY / window.innerHeight

  //     targetAngle = x * 360 + y * 180
  //   }

  //   const animate = () => {
  //     // smoothing factor (0.05–0.15 feels good)
  //     currentAngle += (targetAngle - currentAngle) * 0.08

  //     document.documentElement.style.setProperty('--angle', `${currentAngle}deg`)

  //     requestAnimationFrame(animate)
  //   }

  //   window.addEventListener('mousemove', onMove)
  //   animate()

  //   return () => window.removeEventListener('mousemove', onMove)
  // }, [])
  return (
    <div className="h-full w-full overflow-y-scroll max-w-5xl mx-auto space-y-8">
      {/* {renderTextAnimations()} */}
      {/* {renderAnimations()} */}
      {/* PAGE HEADER */}

      {renderHeader()}

      {/* TYPOGRAPHY */}
      {renderTypography()}

      {/* COLORS */}
      {renderColors()}

      {renderEffects2()}

      {renderInteractionStates()}

      {/* SURFACES */}
      {renderSurfaces()}

      {/* SPACING */}
      {renderSpacing()}

      {/* FLEX + GRID */}
      {renderFlexAndGrid()}

      {/* BUTTONS */}
      {renderButtons()}

      {/* INPUTS */}
      {renderInputs()}

      {/* EFFECTS */}
      {renderEffects()}
    </div>
  );
}
function renderTextAnimations() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Text Animations" />
      <h1 className="aurora-text text-5xl font-extrabold">Flash Light</h1>
      <h1 className="gradient-text text-5xl font-extrabold">Hello World</h1>
      <h1 className="gradient-text text-5xl font-extrabold">Hello World</h1>
    </section>
  );
}
// https://tailwindcss.com/docs/animation
function renderAnimations() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Animations" />

      <div className="flex flex-wrap gap-4">
        {/* SPIN */}
        <div className="rounded-xl bg-black/10 p-6 dark:bg-white/10 flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-zinc-400 border-t-transparent animate-spin" />
          <span className="text-sm">Spin</span>
        </div>

        {/* PING */}
        <div className="rounded-xl bg-black/10 p-6 dark:bg-white/10 flex flex-col items-center gap-3 relative overflow-hidden">
          <div className="relative">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-600"></span>
          </div>
          <span className="text-sm">Ping</span>
        </div>

        {/* PULSE */}
        <div className="rounded-xl bg-black/10 p-6 dark:bg-white/10 flex flex-col items-center gap-3">
          <div className="h-6 w-16 rounded bg-zinc-400/50 animate-pulse" />
          <span className="text-sm">Pulse</span>
        </div>

        {/* BOUNCE */}
        <div className="rounded-xl bg-black/10 p-6 dark:bg-white/10 flex flex-col items-center gap-3">
          <div className="text-2xl animate-bounce">⬇️</div>
          <span className="text-sm">Bounce</span>
        </div>

        {/* HOVER SCALE (improved) */}
        <div className="rounded-xl border border-zinc-300 p-6 transition-all duration-300 hover:scale-110 hover:shadow-xl dark:border-zinc-700 flex flex-col items-center gap-2">
          <div className="h-6 w-6 rounded bg-purple-500 transition-transform group-hover:scale-125" />
          <span className="text-sm">Hover Scale</span>
        </div>

        {/* GRADIENT SHIFT (animated feel via hover transition) */}
        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white transition-all duration-500 hover:from-purple-500 hover:to-pink-500 flex flex-col items-center gap-2">
          Gradient Shift
        </div>

        {/* BACKDROP BLUR DEMO */}
        <div className="relative rounded-xl overflow-hidden p-6 bg-zinc-200 dark:bg-zinc-900/60 flex flex-col items-center gap-2">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-xl" />
          <div className="relative backdrop-blur-md px-3 py-1 rounded bg-white/30 dark:bg-black/30">Glass Blur</div>
        </div>
      </div>
    </section>
  );
}
function renderEffects() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Effects / States / Motion" />

      <div className="flex flex-wrap gap-4">
        <div className="rounded-xl bg-black/10 p-6 dark:bg-white/10">Opacity</div>

        <div className="rounded-xl border border-zinc-300 p-6 transition hover:scale-105 hover:shadow-xl dark:border-zinc-700">
          Hover Scale
        </div>

        <div className="rounded-xl bg-linear-to-r from-blue-500 to-purple-500 p-6 text-white">Gradient</div>

        <div className="rounded-xl bg-zinc-100 p-6 backdrop-blur dark:bg-zinc-900/60">Backdrop Blur</div>
      </div>
    </section>
  );
}
function renderInputs() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Inputs / Forms" />

      <div className="max-w-xl space-y-4">
        <input className={inputBase} placeholder="Text input" />

        <textarea className={`${inputBase} min-h-[120px]`} placeholder="Textarea" />

        <select className={inputBase}>
          <option>Option One</option>
          <option>Option Two</option>
        </select>
      </div>
    </section>
  );
}
function renderButtons() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Buttons / Interactive States" />

      <div className="flex flex-wrap gap-4">
        {/* Primary */}
        <button
          className={
            buttonBase +
            ' bg-[var(--primary)] text-white ' +
            'hover:bg-[var(--primary-hover)] ' +
            'active:bg-[var(--primary-active)]'
          }
        >
          Primary
        </button>

        {/* Secondary */}
        <button className={buttonBase + ' bg-[var(--level)] text-[var(--text)] ' + 'hover:bg-[var(--level-hover)]'}>
          Secondary
        </button>

        {/* Destructive (semantic red stays ok) */}
        <button className={buttonBase + ' bg-red-500 text-white ' + 'hover:bg-red-600'}>Destructive</button>

        {/* Disabled */}
        <button
          disabled
          className={buttonBase + ' bg-[var(--level)] text-[var(--muted)] ' + 'opacity-60 cursor-not-allowed'}
        >
          Disabled
        </button>
      </div>
    </section>
  );
}
function renderFlexAndGrid() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Flexbox / Grid" />

      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl p-4 bg-[var(--level)] text-[var(--text)]">
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
  );
}
function renderSpacing() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Spacing / Padding / Gap" />

      <div className="space-y-4 text-[var(--text)]">
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
          <div className="rounded bg-[var(--primary)] p-1 text-white">p-1</div>
          <div className="rounded bg-[var(--primary)] p-2 text-white">p-2</div>
          <div className="rounded bg-[var(--primary)] p-4 text-white">p-4</div>
          <div className="rounded bg-[var(--primary)] p-8 text-white">p-8</div>
        </div>
      </div>
    </section>
  );
}
function renderSurfaces() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Backgrounds / Surfaces / Borders" />

      <div className="grid gap-4 md:grid-cols-3">
        {/* SURFACE */}
        <div
          className="
            rounded-xl p-6
            bg-[var(--surface)]
            text-[var(--on-surface)]
            border border-[var(--outline-variant)]
          "
        >
          surface
        </div>

        {/* BORDER EMPHASIS */}
        <div
          className="
            rounded-xl p-6
            bg-[var(--surface)]
            text-[var(--on-surface)]
            border border-[var(--outline)]
          "
        >
          border
        </div>

        {/* SHADOW / ELEVATION */}
        <div
          className="
            rounded-xl p-6
            bg-[var(--surface)]
            text-[var(--on-surface)]
            border border-[var(--outline-variant)]
            shadow-md
          "
        >
          shadow
        </div>
      </div>
    </section>
  );
}
function renderColors() {
  const colors = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    yellow: 'bg-yellow-500',
    lime: 'bg-lime-500',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500',
    sky: 'bg-sky-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    rose: 'bg-rose-500',
  };

  return (
    <section className="space-y-6">
      <SectionTitle title="Colors" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-white">
        {Object.entries(colors).map(([name, cls]) => (
          <div key={name} className={`rounded-xl p-4 ${cls}`}>
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
function renderTypography() {
  return (
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
  );
}
function renderInteractionStates() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Interaction States" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PRIMARY */}
        <button
          className="
            rounded-xl px-4 py-3 text-white font-medium
            bg-[var(--primary)]
            hover:bg-[var(--primary-hover)]
            active:bg-[var(--primary-active)]
            transition-colors
          "
        >
          Primary Button
        </button>

        {/* PRIMARY CONTAINER */}
        <button
          className="
            rounded-xl px-4 py-3 font-medium
            bg-[var(--primary-container)]
            hover:bg-[var(--primary-container-hover)]
            active:scale-[0.98]
            transition-all
          "
        >
          Primary Container
        </button>

        {/* SECONDARY CONTAINER */}
        <button
          className="
            rounded-xl px-4 py-3 font-medium
            bg-[var(--secondary-container)]
            hover:bg-[var(--secondary-container-hover)]
            active:scale-[0.98]
            transition-all
          "
        >
          Secondary Container
        </button>

        {/* SURFACE */}
        <button
          className="
            rounded-xl px-4 py-3 font-medium
            bg-[var(--surface)]
            hover:bg-[var(--level-hover)]
            active:scale-[0.98]
            transition-all
          "
        >
          Surface
        </button>
      </div>
    </section>
  );
}
function renderEffects2() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Effects" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="
            h-32 rounded-xl flex items-center justify-center
            font-semibold text-white
            bg-[image:var(--gradient-primary)]
          "
        >
          Gradient Primary
        </div>

        {/* GLASS (FIXED FOR DARK MODE) */}
        <div
          className="
            h-32 rounded-xl flex items-center justify-center font-semibold
            bg-[var(--glass)]
            backdrop-blur-md
            border border-[var(--outline-variant)]
            text-[var(--on-surface)]
          "
        >
          Glass Effect
        </div>

        {/* GLOW PRIMARY (FIXED SURFACE + CONTRAST) */}
        <div
          className="
            h-32 rounded-xl flex items-center justify-center font-semibold
            bg-[var(--surface)]
            text-[var(--on-surface)]
            shadow-[var(--glow-primary)]
            border border-[var(--outline-variant)]
          "
        >
          Primary Glow
        </div>

        {/* GLOW SECONDARY */}
        <div
          className="
            h-32 rounded-xl flex items-center justify-center font-semibold
            bg-[var(--surface)]
            text-[var(--on-surface)]
            shadow-[var(--glow-secondary)]
            border border-[var(--outline-variant)]
          "
        >
          Secondary Glow
        </div>

        {/* SCRIM DEMO (FIXED TEXT + VISIBILITY) */}
        <div className="relative h-32 rounded-xl overflow-hidden bg-[var(--surface)]">
          <div className="absolute inset-0 flex items-center justify-center font-medium text-[var(--on-surface)]">
            Content Behind Scrim
          </div>

          <div
            className="
              absolute inset-0
              bg-[var(--scrim)]
              flex items-center justify-center font-semibold
              text-white
            "
          >
            Scrim Overlay
          </div>
        </div>
      </div>
    </section>
  );
}
function renderHeader() {
  return (
    <header className="space-y-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-widest ">Tailwind Visual Playground</p>

        <h1 className="text-5xl font-black tracking-tight">Tailwind Utility Reference</h1>

        <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          A living page for inspecting raw Tailwind utility behavior independent of your design system abstractions and
          semantic tokens.
        </p>
      </div>
    </header>
  );
}
