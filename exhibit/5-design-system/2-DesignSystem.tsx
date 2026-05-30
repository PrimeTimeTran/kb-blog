'use client';

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';

import { Box } from 'lucide-react';
import { Key } from 'react';
import { SectionTitle } from './components';
import clsx from 'clsx';

const inputBase =
  'w-full rounded-lg border bg-[var(--surface)] px-4 py-2 outline-none transition ' +
  'border-[var(--border)] text-[var(--text)] ' +
  'placeholder:text-[var(--muted)] ' +
  'focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20';

const buttonBase = 'rounded-lg px-4 py-2 font-medium transition active:scale-[0.98]';

export function DesignSystem() {
  return (
    <div className="h-full w-full max-w-5xl mx-auto space-y-8">
      {renderHeader()}
      {/* {renderSurfaces()} */}
      {renderColors()}
      {renderEffects()}
      {renderEffects2()}
      {renderInteractionStates()}
      {renderSpacing()}
      {renderFlexAndGrid()}
      {renderButtons()}
      {renderInputs()}
      {renderTypography()}
      {renderColors2()}
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

function renderColors2() {
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
        <button className="rounded-xl px-4 py-3 text-white font-medium bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] transition-colors">
          Primary Button
        </button>

        {/* PRIMARY CONTAINER */}
        <button className="rounded-xl px-4 py-3 font-medium bg-[var(--primary-container)] hover:bg-[var(--primary-container-hover)] active:scale-[0.98] transition-all">
          Primary Container
        </button>

        {/* SECONDARY CONTAINER */}
        <button className="rounded-xl px-4 py-3 font-medium bg-[var(--secondary-container)] hover:bg-[var(--secondary-container-hover)] active:scale-[0.98] transition-all">
          Secondary Container
        </button>

        {/* SURFACE */}
        <button className="rounded-xl px-4 py-3 font-medium bg-[var(--surface)] hover:bg-[var(--level-hover)] active:scale-[0.98] transition-all">
          Surface
        </button>
      </div>
    </section>
  );
}
function renderEffects2() {
  const cardBase = `relative overflow-hidden h-32 rounded-2xl flex items-center justify-center border transition-all duration-300`;

  return (
    <section className="space-y-6">
      <SectionTitle title="Effects" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ====================================================== */}
        {/* GRADIENT PRIMARY */}
        {/* ====================================================== */}

        <div
          className={`
            ${cardBase}

            bg-[image:var(--gradient-primary)]
            shadow-[var(--shadow-lg)]
            border-black/5

            text-white/95
            font-semibold text-lg

            before:absolute
            before:inset-0
            before:bg-white/[0.08]
            before:pointer-events-none
          `}
        >
          <span className="relative drop-shadow-sm">Gradient Primary</span>
        </div>

        {/* ====================================================== */}
        {/* GLASS */}
        {/* ====================================================== */}

        <div
          className={`
            ${cardBase}

            bg-[var(--glass)]
            backdrop-blur-xl

            border-[var(--glass-border)]

            shadow-[var(--shadow-md)]

            text-[var(--on-surface)]
            font-semibold

            before:absolute
            before:inset-0
            before:bg-gradient-to-b
            before:from-white/10
            before:to-transparent
            before:pointer-events-none
          `}
        >
          <span className="relative">Glass Effect</span>
        </div>

        {/* ====================================================== */}
        {/* PRIMARY GLOW */}
        {/* ====================================================== */}

        <div
          className={`
            ${cardBase}

            bg-[var(--surface)]
            text-[var(--on-surface)]

            border-[var(--outline-variant)]

            shadow-[var(--shadow-md)]
            hover:shadow-[var(--glow-primary)]

            font-semibold
          `}
        >
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgb(255_255_255_/_0.06),transparent_70%)]" />

          <span className="relative">Primary Glow</span>
        </div>

        {/* ====================================================== */}
        {/* SECONDARY GLOW */}
        {/* ====================================================== */}

        <div
          className={`
            ${cardBase}

            bg-[var(--surface)]
            text-[var(--on-surface)]

            border-[var(--outline-variant)]

            shadow-[var(--shadow-md)]
            hover:shadow-[var(--glow-secondary)]

            font-semibold
          `}
        >
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgb(255_255_255_/_0.04),transparent_70%)]" />

          <span className="relative">Secondary Glow</span>
        </div>

        {/* ====================================================== */}
        {/* SURFACE TINT */}
        {/* ====================================================== */}

        <div
          className={`
            ${cardBase}

            bg-[var(--surface)]
            text-[var(--on-surface)]

            border-[var(--outline-variant)]

            shadow-[var(--shadow-sm)]

            before:absolute
            before:inset-0
            before:bg-[var(--surface-tint)]
            before:pointer-events-none
          `}
        >
          <span className="relative font-semibold">Surface Tint</span>
        </div>

        {/* ====================================================== */}
        {/* SCRIM */}
        {/* ====================================================== */}

        <div
          className={`
            ${cardBase}

            bg-[image:var(--gradient-primary)]
            shadow-[var(--shadow-lg)]
            border-black/5
          `}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white/90 font-medium">
            Content Behind Scrim
          </div>

          <div className="absolute inset-0 bg-(--scrim) backdrop-blur-[1px] flex items-center justify-center text-white font-semibold">
            Scrim Overlay
          </div>
        </div>
      </div>
    </section>
  );
}

function renderHeader() {
  return (
    <header className="space-y-4 border-b border-zinc-200 pb-8 dark:border-zinc-800 py-16">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-widest">Preview</p>

        <h1 className="text-5xl font-black tracking-tight">Design System Architecture</h1>

        <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          A living page for inspecting raw Design System behavior of my design system abstractions and semantic tokens.
        </p>
      </div>
    </header>
  );
}

function renderCards() {
  const cardBase = `
    relative overflow-hidden
    rounded-2xl
    border
    transition-all duration-300
    p-5
  `;

  return (
    <section className="space-y-6">
      <SectionTitle title="Cards" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ===================== DEFAULT ===================== */}
        <article className={`${cardBase} bg-surface border-outline-variant shadow-sm`}>
          <div className="space-y-4">
            <header className="space-y-1">
              <h3 className="text-lg font-semibold text-on-surface">Default Surface Card</h3>

              <p className="text-sm text-on-surface-variant">
                Standard semantic surface using elevation + outline tokens.
              </p>
            </header>

            <div className="h-px bg-outline-variant" />

            <p className="text-sm leading-6 text-on-surface">
              This card demonstrates the baseline structure for surfaces.
            </p>

            <footer className="flex items-center gap-3 pt-2">
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary shadow-sm hover:shadow-md transition-all">
                Primary
              </button>

              <button className="px-4 py-2 rounded-xl bg-level text-on-surface border border-outline-variant">
                Secondary
              </button>
            </footer>
          </div>
        </article>

        {/* ===================== ELEVATED ===================== */}
        <article
          className={`${cardBase} bg-surface border-outline-variant shadow-lg hover:-translate-y-1 hover:shadow-lg`}
        >
          <div className="space-y-4">
            <header className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-on-surface">Elevated Card</h3>

                <p className="text-sm text-on-surface-variant">Higher elevation intended for important content.</p>
              </div>

              <div className="px-2 py-1 rounded-lg text-xs font-medium bg-primary-container text-on-primary-container">
                Featured
              </div>
            </header>

            <div className="rounded-xl h-32 bg-gradient-primary shadow-glow-primary" />

            <p className="text-sm leading-6 text-on-surface">Elevated surfaces work well for media and emphasis.</p>
          </div>
        </article>

        {/* ===================== GLASS ===================== */}
        <article className={`${cardBase} bg-glass backdrop-blur-xl border-glass-border shadow-md`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          <div className="relative space-y-4">
            <header className="space-y-1">
              <h3 className="text-lg font-semibold text-on-surface">Glass Card</h3>

              <p className="text-sm text-on-surface-variant">Uses translucency + blur + highlights.</p>
            </header>

            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded-xl bg-primary/20" />
              <div className="h-16 rounded-xl bg-secondary/20" />
              <div className="h-16 rounded-xl bg-tertiary/20" />
            </div>

            <p className="text-sm leading-6 text-on-surface">Glass needs layered highlights to avoid flatness.</p>
          </div>
        </article>

        {/* ===================== METRIC ===================== */}
        <article className={`${cardBase} bg-surface border-outline-variant shadow-sm`}>
          <div className="space-y-5">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm text-on-surface-variant">Monthly Revenue</p>

                <h3 className="text-3xl font-bold text-on-surface">$48,240</h3>
              </div>

              <div className="px-3 py-1 rounded-full bg-success-container text-on-success-container text-sm font-medium">
                +12.4%
              </div>
            </header>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">Progress</span>
                <span className="text-on-surface font-medium">74%</span>
              </div>

              <div className="h-3 rounded-full bg-level overflow-hidden">
                <div className="h-full w-[74%] bg-gradient-primary shadow-glow-primary" />
              </div>
            </div>

            <footer className="flex items-center justify-between pt-2">
              <span className="text-sm text-on-surface-variant">Updated 2 hours ago</span>

              <button className="text-sm font-medium text-primary hover:opacity-80">View Report</button>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}

function renderSurfaces() {
  function renderElevations(surfaces: any[]) {
    const base = 'rounded-2xl  transition-all duration-300 p-5 flex flex-col gap-3';

    const label = 'text-xs uppercase tracking-wide text-on-surface-variant';

    const title = 'text-lg font-semibold text-on-surface';

    const text = 'text-sm text-on-surface-variant leading-6';

    function ElevationSwatches() {
      const elevations = [
        { key: 'background', class: 'bg-background' },
        { key: 'lowest', class: 'bg-lowest' },
        { key: 'low', class: 'bg-low' },
        { key: 'level', class: 'bg-level' },
        { key: 'high', class: 'bg-high' },
        { key: 'highest', class: 'bg-highest' },
      ];

      return (
        <div className="flex items-center justify-center gap-3">
          {elevations.map((e) => (
            <div key={e.key} className="flex flex-col items-center gap-1">
              <div className={`${e.class} w-12 h-12 rounded-md border border-outline-variant`} />
              {/* <span className="text-[10px] text-on-surface-variant uppercase tracking-wide">{e.key}</span> */}
            </div>
          ))}
        </div>
      );
    }
    return (
      <section className="space-y-6">
        <SectionTitle title="Surface System" preview={<ElevationSwatches />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {surfaces.map(
            (s: {
              key: Key | null | undefined;
              bg: any;
              label:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              title:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              desc:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <div key={s.key} className={`${base} ${s.bg}`}>
                <span className={label}>{s.label}</span>
                <h3 className={title}>{s.title}</h3>
                <p className={text}>{s.desc}</p>
              </div>
            ),
          )}
        </div>
      </section>
    );
  }
  function renderElevations2(surfaces: any[]) {
    const base = 'rounded-2xl transition-all duration-300 p-5 flex flex-col gap-3';
    const bordered = 'border border-outline-variant';
    const label = 'text-xs uppercase tracking-wide text-on-surface-variant';
    const title = 'text-lg font-semibold text-on-surface';
    const text = 'text-sm text-on-surface-variant leading-6';
    const footer = 'mt-auto pt-4 border-t border-outline-variant flex items-center justify-between';
    function renderSurfaceBody(s: {
      variant: any;
      label:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
      title:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
      desc:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
    }) {
      switch (s.variant) {
        case 'header':
          return (
            <>
              <div>
                <span className={label}>{s.label}</span>
                <h3 className={title}>{s.title}</h3>
              </div>
              <p className={text}>{s.desc}</p>
            </>
          );

        case 'footer':
          return (
            <>
              <div>
                <span className={label}>{s.label}</span>
                <h3 className={title}>{s.title}</h3>
              </div>

              <p className={text}>{s.desc}</p>

              <div className={footer}>
                <span className="text-xs text-on-surface-variant">Action</span>
                <button className="px-3 py-1 bg-surface rounded-md text-sm">Run</button>
              </div>
            </>
          );

        case 'nested':
          return (
            <>
              <span className={label}>{s.label}</span>
              <h3 className={title}>{s.title}</h3>
              <p className={text}>{s.desc}</p>

              <div className="bg-lowest p-3 rounded-xl border border-outline-variant">
                <p className="text-xs text-on-surface">Nested content block</p>
              </div>
            </>
          );

        default:
          return (
            <>
              <span className={label}>{s.label}</span>
              <h3 className={title}>{s.title}</h3>
              <p className={text}>{s.desc}</p>
            </>
          );
      }
    }
    return (
      <section className="space-y-10">
        <SectionTitle title="Surface System Stress Test" />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {surfaces.map((s: { key: Key | null | undefined; bg: any; bordered: any }) => (
            <div key={s.key} className={[base, s.bg, s.bordered ? bordered : ''].join(' ')}>
              {renderSurfaceBody(s)}
            </div>
          ))}
        </div>

        {/* FULL WIDTH VARIANT DEMO */}
        <section className="space-y-5">
          {surfaces
            .filter((s: { key: string }) => s.key === 'level' || s.key === 'high')
            .map(
              (s: {
                key: string;
                bg: any;
                title:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<unknown, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                desc:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<unknown, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }) => (
                <div key={`${s.key}-full`} className={`${base} ${s.bg} w-full`}>
                  <span className={label}>Full Width</span>
                  <h3 className={title}>{s.title}</h3>
                  <p className={text}>{s.desc}</p>

                  {s.key === 'high' && (
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div className="bg-lowest p-3 rounded-lg border border-outline-variant">
                        <p className="text-xs text-on-surface">Panel A</p>
                      </div>
                      <div className="bg-low p-3 rounded-lg border border-outline-variant">
                        <p className="text-xs text-on-surface">Panel B</p>
                      </div>
                      <div className="bg-level p-3 rounded-lg border border-outline-variant">
                        <p className="text-xs text-on-surface">Panel C</p>
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}
        </section>
      </section>
    );
  }
  function renderElevationOutlines() {
    const base = 'rounded-xl p-5 transition-all duration-300';

    const label = 'text-xs uppercase tracking-wide text-on-surface-variant';

    const title = 'text-sm font-semibold text-on-surface';

    return (
      <section className="space-y-6">
        <SectionTitle title="Surfaces & Outlines" />

        <div className="grid gap-4 md:grid-cols-3">
          {/* ===================== NO OUTLINE ===================== */}
          <div className={`${base} bg-surface`}>
            <span className={label}>None</span>
            <h3 className={title}>No Border</h3>

            <p className="text-sm text-on-surface-variant mt-2">Pure surface separation relying only on elevation.</p>
          </div>

          {/* ===================== SUBTLE OUTLINE ===================== */}
          <div className={`${base} bg-surface border border-outline-variant`}>
            <span className={label}>Outline Variant</span>
            <h3 className={title}>Subtle Boundary</h3>

            <p className="text-sm text-on-surface-variant mt-2">Used for grouping without visual emphasis.</p>

            {/* nested to show real-world usage */}
            <div className="mt-4 bg-level rounded-lg p-3 border border-outline-variant">
              <p className="text-xs text-on-surface">Nested component</p>
            </div>
          </div>

          {/* ===================== STRONG OUTLINE ===================== */}
          <div className={`${base} bg-surface border border-outline shadow-sm hover:shadow-md`}>
            <span className={label}>Outline</span>
            <h3 className={title}>Strong Boundary</h3>

            <p className="text-sm text-on-surface-variant mt-2">Used when separation is important but still neutral.</p>

            <div className="mt-4 flex gap-2">
              <div className="flex-1 rounded-md border border-outline-variant bg-level p-2">
                <p className="text-[10px] text-on-surface">A</p>
              </div>

              <div className="flex-1 rounded-md border border-outline bg-level p-2">
                <p className="text-[10px] text-on-surface">B</p>
              </div>
            </div>
          </div>

          {/* ===================== OUTLINE + INTERACTION ===================== */}
          <div className={`${base} bg-surface border border-outline-variant hover:border-outline hover:bg-level`}>
            <span className={label}>Interactive</span>
            <h3 className={title}>Hover Boundary</h3>

            <p className="text-sm text-on-surface-variant mt-2">Shows how outlines should respond to interaction.</p>

            <button className="mt-4 w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm hover:border-outline transition">
              Hover me
            </button>
          </div>

          {/* ===================== SHADOW + OUTLINE COMPARISON ===================== */}
          <div className={`${base} bg-surface border border-outline-variant shadow-md`}>
            <span className={label}>Hybrid</span>
            <h3 className={title}>Border + Shadow</h3>

            <p className="text-sm text-on-surface-variant mt-2">Real UI uses both shadow and outline together.</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-md border border-outline-variant bg-lowest p-2">
                <p className="text-[10px] text-on-surface">Low contrast</p>
              </div>

              <div className="rounded-md border border-outline bg-low p-2 shadow-sm">
                <p className="text-[10px] text-on-surface">Higher contrast</p>
              </div>
            </div>
          </div>

          {/* ===================== NEGATIVE SPACE DEMO ===================== */}
          <div className={`${base} bg-level`}>
            <span className={label}>Context Test</span>
            <h3 className={title}>Outline in Nested UI</h3>

            <div className="space-y-2 mt-3">
              <div className="bg-surface rounded-lg p-3 border border-outline-variant">
                <p className="text-xs text-on-surface">Parent surface</p>

                <div className="mt-2 bg-high rounded-md p-2 border border-outline-variant">
                  <p className="text-[10px] text-on-surface">Nested panel</p>
                </div>
              </div>

              <div className="bg-surface rounded-lg p-3 border border-outline">
                <p className="text-xs text-on-surface">Stronger boundary</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const surfaces = [
    {
      key: 'background',
      bg: 'bg-background',
      label: 'Background',
      title: 'App Canvas',
      desc: 'Root layer of the application. Everything sits on top of this.',
      bordered: false,
      variant: 'simple',
    },
    {
      key: 'lowest',
      bg: 'bg-lowest',
      label: 'Lowest',
      title: 'Subtle Separation Layer',
      desc: 'Barely perceptible elevation used for large grouped regions.',
      bordered: true,
      variant: 'header',
    },
    {
      key: 'low',
      bg: 'bg-low',
      label: 'Low',
      title: 'Soft Grouping Surface',
      desc: 'First visible separation from background.',
      bordered: true,
      variant: 'footer',
    },
    {
      key: 'level',
      bg: 'bg-level',
      label: 'Level',
      title: 'Default Working Surface',
      desc: 'Primary UI surface for cards, forms, and content blocks.',
      bordered: false,
      variant: 'nested',
    },
    {
      key: 'high',
      bg: 'bg-high',
      label: 'High',
      title: 'Elevated Surface',
      desc: 'Used for emphasized content where separation comes from depth.',
      bordered: false,
      variant: 'footer',
    },
    {
      key: 'highest',
      bg: 'bg-highest',
      label: 'Highest',
      title: 'Floating Surface',
      desc: 'Used for overlays, drawers, modals, and floating UI.',
      bordered: true,
      variant: 'footer',
    },
    {
      key: 'surface',
      bg: 'bg-surface',
      label: 'Surface',
      title: 'Semantic Base Surface',
      desc: 'Default neutral surface used for general UI blocks.',
      bordered: true,
      variant: 'simple',
    },
    {
      key: 'surface-variant',
      bg: 'bg-surface-variant',
      label: 'Surface Variant',
      title: 'Secondary Surface Tone',
      desc: 'Used for inputs, grouped controls, and subtle differentiation.',
      bordered: true,
      variant: 'simple',
    },
  ];

  return (
    <div className="space-y-8">
      {renderElevations(surfaces)}
      {renderElevationOutlines()}
      {renderElevations2(surfaces)}
      {renderCards()}
    </div>
  );
}

type GradientRole = 'surface-subtle' | 'surface-elevated' | 'intent-strong' | 'decorative';

type ResolvedColorToken = ColorToken & {
  light: string;
  dark: string;
};
type SurfaceToken = {
  key: string;
  type: 'neutral' | 'semantic';
  light: string;
  dark: string;
  on: string; // REQUIRED
};

type ColorRole = 'brand' | 'state' | 'surface' | 'support';
type ColorToken = {
  key: string;
  label: string;
  role: ColorRole;
  usage?: 'base' | 'container' | 'on' | 'interactive';
  group?: string; // optional grouping override
  variants?: {
    light?: string;
    dark?: string;
  };
  meta?: {
    description?: string;
    emphasis?: 'low' | 'medium' | 'high';
  };
};
function renderColors() {
  function renderColorHero(colors: ColorToken[]) {
    return (
      <section className="space-y-3">
        <SectionTitle title="Color System" preview="Base Tokens" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colors.map((c) => (
            <div key={c.key} className="space-y-2">
              {/* LABEL OUTSIDE (system metadata) */}
              <div className="flex items-baseline justify-between px-1">
                <p className="text-sm font-medium text-on-surface">{c.label}</p>
                <span className="text-[10px] text-on-surface-variant font-mono">--{c.key}</span>
              </div>
              <div
                className="h-20 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-sm cursor-pointer"
                style={{
                  background: `var(--${c.key})`,
                }}
              />

              {/* ROLE (secondary metadata) */}
              <div className="px-1">
                <span className="text-[10px] uppercase tracking-wide text-on-surface-variant">{c.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  function renderColorPaletteSwitch(colors: ColorToken[]) {
    function SurfaceCard({ token }: { token: any }) {
      const onColor = resolveOnColor(token.key);

      return (
        <div
          className="py-2 px-4 flex flex-col justify-between gap-3 border border-transparent"
          style={{
            background: `var(--${token.key})`,
            color: `var(--${onColor})`,
          }}
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold">{token.label}</p>
            <code className="text-[10px] opacity-70">--{token.key}</code>
          </div>
        </div>
      );
    }
    function resolveOnColor(tokenKey: string) {
      const map: Record<string, string> = {
        background: 'on-surface',
        lowest: 'on-surface',
        low: 'on-surface',
        level: 'on-surface',
        high: 'on-surface',
        highest: 'on-surface',

        surface: 'on-surface',
        'surface-variant': 'on-surface-variant',

        primary: 'on-primary',
        'primary-container': 'on-primary-container',
        secondary: 'on-secondary',
        tertiary: 'on-tertiary',

        success: 'on-success',
        warning: 'on-warning',
        error: 'on-error',
        info: 'on-info',
      };

      return map[tokenKey] ?? 'on-surface';
    }
    return (
      <section className="">
        <SectionTitle title="Theme Behavior" preview="Light / Dark" />
        <div className="py-2 grid md:grid-cols-3">
          {colors.map((c) => {
            return <SurfaceCard key={c.key} token={c} />;
          })}
        </div>
      </section>
    );
  }
  function renderColorRoles() {
    const roles = [
      {
        name: 'Primary',
        class: 'bg-primary text-on-primary',
        desc: 'Main actions and key UI emphasis',
      },
      {
        name: 'Secondary',
        class: 'bg-secondary text-on-secondary',
        desc: 'Support actions and emphasis',
      },
      {
        name: 'Success',
        class: 'bg-success text-on-success',
        desc: 'Positive system feedback',
      },
      {
        name: 'Warning',
        class: 'bg-warning text-on-warning',
        desc: 'Attention-required states',
      },
      {
        name: 'Error',
        class: 'bg-error text-on-error',
        desc: 'Failure or destructive actions',
      },
    ];

    return (
      <section className="space-y-4">
        <SectionTitle title="Semantic Roles" preview="Intent-based surfaces" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {roles.map((r) => (
            <div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{r.name}</p>
                <p className="text-[10px] opacity-70 leading-4">{r.desc}</p>
              </div>
              <div key={r.name} className={`rounded-2xl h-32 p-4 flex flex-col justify-around ${r.class}`}>
                {/* TOP LABEL */}

                {/* FAKE UI ELEMENT (IMPORTANT) */}
                <div className="space-y-2">
                  <div className="h-2 w-1/2 rounded bg-white/20" />
                  <div className="h-2 w-3/4 rounded bg-white/20" />
                  <div className="h-2 w-full rounded bg-white/20" />
                </div>

                {/* ACTION HINT */}
                <div className="text-[10px] opacity-70">Button / Badge / Alert surface</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  function renderColorStates(colors: ColorToken[]) {
    const interactive = colors.filter((c) => c.role === 'brand' || c.role === 'state');

    const states = [
      { key: '', label: 'Base' },
      { key: '-hover', label: 'Hover' },
      { key: '-active', label: 'Active' },
      { key: '-disabled', label: 'Disabled' },
    ];

    return (
      <section className="space-y-6">
        <SectionTitle title="Interaction States" preview="Base / Hover / Active / Disabled" />

        <div className="grid gap-5 lg:grid-cols-2">
          {interactive.map((c) => {
            return (
              <article
                key={c.key}
                className="
              rounded-2xl
              p-5
              space-y-4
              bg-surface
              border border-outline-variant
            "
              >
                {/* HEADER (minimal signal only) */}
                <header className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-on-surface">{c.label}</h3>

                  <code className="text-[10px] text-on-surface-variant">--{c.key}</code>
                </header>

                {/* STATE BUTTONS (PRIMARY FOCUS) */}
                <div className="flex flex-wrap gap-3">
                  {states.map((s) => {
                    const token = s.key === '' ? c.key : `${c.key}${s.key}`;

                    return (
                      <button
                        key={token}
                        style={{
                          background: `var(--${token})`,
                          color: `var(--on-${c.key})`,
                        }}
                        className="
                      px-4 py-2 rounded-xl
                      transition-all duration-200
                      hover:opacity-90
                    "
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* SINGLE CONTEXT SIGNAL (NOT BOILERPLATE) */}
                <div className="text-[11px] text-on-surface-variant">
                  Tokens derived from <code>deriveStates()</code>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
  function renderChaosPanel() {
    const intents = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

    const surfaces = ['background', 'surface', 'level', 'high'];

    return (
      <section className="space-y-4">
        <SectionTitle title="Chaos UI Panel" preview="System stress test" />

        <div className="grid gap-4 md:grid-cols-2">
          {intents.map((intent) => {
            const surface = surfaces[Math.floor(Math.random() * surfaces.length)];

            return (
              <div
                key={intent}
                className={`
                p-4 rounded-2xl
                bg-${surface}
                border border-outline-variant
                space-y-4
              `}
              >
                {/* HEADER */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{intent.toUpperCase()} Card</p>
                    <code className="text-[10px] text-on-surface-variant">
                      bg-{surface} + {intent}
                    </code>
                  </div>

                  <span className={`text-[10px] px-2 py-1 rounded-full bg-${intent} text-on-${intent}`}>tag</span>
                </div>

                {/* BODY TEXT HIERARCHY */}
                <div className="space-y-1">
                  <p className="text-on-surface text-sm">Primary readable text on mixed surface.</p>
                  <p className="text-on-surface-variant text-xs">Secondary metadata line.</p>
                </div>

                {/* NESTED SURFACE (IMPORTANT TEST) */}
                <div className="p-3 rounded-xl bg-surface border border-outline-variant space-y-2">
                  <p className="text-xs text-on-surface">Nested surface block</p>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      className={`
                      px-3 py-1 rounded-lg text-xs
                      bg-${intent}
                      text-on-${intent}
                      hover:bg-${intent}-hover
                      active:bg-${intent}-active
                    `}
                    >
                      Action
                    </button>

                    <button className="px-3 py-1 rounded-lg text-xs bg-${intent}-container text-on-${intent}">
                      Container
                    </button>

                    <button className="px-3 py-1 rounded-lg text-xs bg-${intent}-disabled text-on-${intent} cursor-not-allowed">
                      Disabled
                    </button>
                  </div>
                </div>

                {/* FOOTER STRIP */}
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
                  <span className="text-[10px] text-on-surface-variant">surface + intent + nested + states</span>

                  <div className={`w-3 h-3 rounded-full bg-${intent}`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  function renderSurfaceMutationLab() {
    return (
      <section className="space-y-5">
        <SectionTitle
          title="Surface Mutation Lab"
          preview="Glass · Tint · Gradient · Nesting stress test. When does a surface stop being a surface and become a filter over other surfaces?"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* ======================================================
            1. GLASS (FILTERED SURFACE)
        ====================================================== */}
          <div className="relative p-4 rounded-2xl border border-glass-border bg-glass backdrop-blur-xl space-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="relative space-y-2">
              <h3 className="text-sm font-semibold text-on-surface">Glass Surface</h3>
              <p className="text-xs text-on-surface-variant">Surface becomes a filter, not a container.</p>

              <button className="px-3 py-1 text-xs rounded-lg bg-primary text-on-primary">Action</button>
            </div>
          </div>

          {/* ======================================================
            2. TINTED SURFACE (SEMANTIC LEAK)
        ====================================================== */}
          <div className="relative p-4 rounded-2xl bg-surface border border-outline-variant space-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />

            <div className="relative space-y-2">
              <h3 className="text-sm font-semibold text-on-surface">Tinted Surface</h3>
              <p className="text-xs text-on-surface-variant">Brand color bleeds into neutral hierarchy.</p>

              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs rounded-lg bg-primary text-on-primary">Primary</button>
                <button className="px-3 py-1 text-xs rounded-lg bg-surface border border-outline-variant text-on-surface">
                  Secondary
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================
            3. GRADIENT SURFACE (NON-DETERMINISTIC BACKGROUND)
        ====================================================== */}
          <div className="p-4 rounded-2xl bg-gradient-primary text-on-primary space-y-3">
            <h3 className="text-sm font-semibold">Gradient Surface</h3>

            <p className="text-xs opacity-90">Background is no longer a token — it is a range.</p>

            <button className="px-3 py-1 text-xs rounded-lg bg-on-primary text-primary">Inverted Action</button>
          </div>

          {/* ======================================================
            4. GLASS INSIDE SURFACE (REAL WORLD FAILURE MODE)
        ====================================================== */}
          <div className="p-4 rounded-2xl bg-surface border border-outline-variant space-y-3">
            <h3 className="text-sm font-semibold text-on-surface">Glass inside Surface</h3>

            <div className="relative p-3 rounded-xl bg-glass border border-glass-border backdrop-blur-md">
              <p className="text-xs text-on-surface">Nested translucency creates readability risk.</p>
            </div>
          </div>

          {/* ======================================================
            5. TINT STACKING (COMMON DESIGN SYSTEM FAILURE)
        ====================================================== */}
          <div className="relative p-4 rounded-2xl bg-surface border border-outline-variant space-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

            <div className="relative space-y-2">
              <h3 className="text-sm font-semibold text-on-surface">Tint Stacking</h3>

              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-on-primary-container">First layer tint</p>

                <div className="mt-2 p-2 rounded bg-primary/10 border border-primary/20">
                  <p className="text-[10px] text-on-primary-container">Second layer tint (danger zone)</p>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================
            6. SURFACE BREAKER (CONTROL CASE)
        ====================================================== */}
          <div className="p-4 rounded-2xl bg-background border border-outline-variant space-y-3">
            <h3 className="text-sm font-semibold text-on-surface">Baseline Surface</h3>

            <p className="text-xs text-on-surface-variant">Control group. Everything should feel stable here.</p>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs rounded bg-primary text-on-primary">Primary</button>
              <button className="px-3 py-1 text-xs rounded bg-surface border border-outline-variant text-on-surface">
                Neutral
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  const colors: ColorToken[] = [
    {
      key: 'background',
      label: 'Background',
      role: 'surface',
      usage: 'base',
      meta: { emphasis: 'low' },
    },
    {
      key: 'surface',
      label: 'Surface',
      role: 'surface',
      usage: 'base',
    },
    {
      key: 'surface-variant',
      label: 'Surface Variant',
      role: 'surface',
      usage: 'container',
    },
    {
      key: 'primary',
      label: 'Primary',
      role: 'brand',
      usage: 'base',
      meta: {
        description: 'Main brand color used for key actions',
        emphasis: 'high',
      },
    },
    {
      key: 'primary-container',
      label: 'Primary Container',
      role: 'brand',
      usage: 'container',
    },
    {
      key: 'on-primary',
      label: 'On Primary',
      role: 'brand',
      usage: 'on',
    },

    {
      key: 'secondary',
      label: 'Secondary',
      role: 'brand',
      usage: 'base',
    },

    {
      key: 'tertiary',
      label: 'Tertiary',
      role: 'brand',
      usage: 'base',
    },
    {
      key: 'success',
      label: 'Success',
      role: 'state',
      usage: 'base',
    },
    {
      key: 'warning',
      label: 'Warning',
      role: 'state',
      usage: 'base',
    },
    {
      key: 'error',
      label: 'Error',
      role: 'state',
      usage: 'base',
    },
    {
      key: 'info',
      label: 'Info',
      role: 'state',
      usage: 'base',
    },
    {
      key: 'outline',
      label: 'Outline',
      role: 'support',
      usage: 'base',
    },
    {
      key: 'outline-variant',
      label: 'Outline Variant',
      role: 'support',
      usage: 'base',
    },
  ];

  return (
    <div className="space-y-10">
      {renderColorHero(colors)}
      {renderColorPaletteSwitch(colors)}
      {renderColorRoles()}
      {renderColorStates(colors)}
      {renderChaosPanel()}
      {renderSurfaceMutationLab()}
    </div>
  );
}
