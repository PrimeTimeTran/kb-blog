import React from 'react'
import clsx from 'clsx'
import {
  Users,
  TrendingUp,
  DollarSign,
  LayoutGrid,
  Zap,
  Star,
  Quote,
  ArrowRight,
} from 'lucide-react'

// -----------------------------------------------------
// Section types
// -----------------------------------------------------

type SectionType =
  | 'hero'
  | 'metrics'
  | 'use-cases'
  | 'testimonials'
  | 'pricing'
  | 'feature-grid'
  | 'cta'

type Section = {
  id: string
  type: SectionType
}

// -----------------------------------------------------
// Placeholder content
// -----------------------------------------------------

const sections: Section[] = [
  { id: 'hero', type: 'hero' },
  { id: 'metrics', type: 'metrics' },
  { id: 'use-cases', type: 'use-cases' },
  { id: 'features', type: 'feature-grid' },
  { id: 'testimonials', type: 'testimonials' },
  { id: 'pricing', type: 'pricing' },
  { id: 'cta', type: 'cta' },
]

// -----------------------------------------------------
// Section renderer
// -----------------------------------------------------

function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case 'hero':
      return <HeroSection />

    case 'metrics':
      return <MetricsSection />

    case 'use-cases':
      return <UseCasesSection />

    case 'feature-grid':
      return <FeatureGridSection />

    case 'testimonials':
      return <TestimonialsSection />

    case 'pricing':
      return <PricingSection />

    case 'cta':
      return <CTASection />

    default:
      return null
  }
}

// -----------------------------------------------------
// Page Shell
// -----------------------------------------------------

export function ProductPageShell() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background text-on-background">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={clsx(
            'w-full px-6 py-20',
            // alternating backgrounds
            index % 2 === 0 ? 'bg-surface' : 'bg-surface-container'
          )}
        >
          <div className="mx-auto w-full max-w-6xl">
            <SectionRenderer section={section} />
          </div>
        </div>
      ))}
    </div>
  )
}

// -----------------------------------------------------
// SECTION IMPLEMENTATIONS (placeholders)
// -----------------------------------------------------

function HeroSection() {
  return (
    <div className="py-20">
      <div className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1 text-sm text-on-surface/70 border border-[color:var(--surface-container)]">
        <Zap size={14} />
        New workspace system
      </div>

      <h1 className="mt-6 text-6xl font-semibold tracking-tight text-on-surface leading-tight">
        Build something
        <span className="text-on-surface/60"> incredible</span>
      </h1>

      <p className="mt-5 max-w-2xl text-lg text-on-surface/70 leading-relaxed">
        A reusable product page shell designed for modular sections, workspace-driven UI, and
        theme-token based styling across light and dark modes.
      </p>

      <div className="mt-8 flex gap-3">
        <button className="rounded-xl bg-primary px-5 py-3 text-white font-medium hover:opacity-90 transition">
          Get started
        </button>

        <button className="rounded-xl bg-surface px-5 py-3 text-on-surface border border-[color:var(--surface-container)] hover:bg-surface-container transition inline-flex items-center gap-2">
          Learn more <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function MetricsSection() {
  const items = [
    { label: 'Users', value: '128K', icon: Users },
    { label: 'Growth', value: '+84%', icon: TrendingUp },
    { label: 'Revenue', value: '$1.2M', icon: DollarSign },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.label}
            className="
              group
              rounded-2xl
              bg-surface
              p-6
              border
              border-[color:var(--surface-container)]
              transition
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between">
              <Icon className="text-on-surface/60" size={18} />
              <div className="text-xs text-on-surface/50 opacity-0 group-hover:opacity-100 transition">
                live
              </div>
            </div>

            <div className="mt-4 text-3xl font-semibold text-on-surface">{item.value}</div>

            <div className="mt-1 text-on-surface/60">{item.label}</div>
          </div>
        )
      })}
    </div>
  )
}
function UseCasesSection() {
  const items = [
    {
      title: 'Design',
      desc: 'Rapid prototyping and UI exploration with live workspace switching.',
    },
    {
      title: 'Engineering',
      desc: 'Manage systems, tools, and execution contexts in a unified shell.',
    },
    {
      title: 'Product',
      desc: 'Ship features faster with structured workflows and previews.',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="
            rounded-3xl
            bg-surface-container
            p-8
            text-on-surface
            border
            border-[color:var(--surface-container)]
            transition
            hover:scale-[1.02]
            hover:bg-surface
          "
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <LayoutGrid size={18} />
            {item.title}
          </div>

          <p className="mt-3 text-on-surface/70 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

function FeatureGridSection() {
  const features = Array.from({ length: 6 }).map((_, i) => ({
    title: `Feature ${i + 1}`,
    desc: 'Composable workspace-aware UI system.',
  }))

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="
            group
            rounded-2xl
            bg-surface
            p-6
            border
            border-[color:var(--surface-container)]
            transition
            hover:bg-surface-container
          "
        >
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-on-surface/60" />
            <div className="font-semibold text-on-surface">{f.title}</div>
          </div>

          <p className="mt-2 text-sm text-on-surface/70">{f.desc}</p>

          <div className="mt-4 text-xs text-on-surface/50 opacity-0 group-hover:opacity-100 transition">
            Learn more →
          </div>
        </div>
      ))}
    </div>
  )
}

function TestimonialsSection() {
  const items = [
    {
      name: 'Alice',
      role: 'Designer',
      quote: 'This completely changed how I think about UI systems.',
    },
    {
      name: 'Bob',
      role: 'Engineer',
      quote: 'The workspace model feels like a missing OS layer for apps.',
    },
    {
      name: 'Charlie',
      role: 'Founder',
      quote: 'We shipped faster in a week than the previous month.',
    },
  ]

  return (
    <div className="space-y-6">
      {items.map((t) => (
        <div
          key={t.name}
          className="
            rounded-3xl
            bg-surface-container
            p-6
            text-on-surface
            border
            border-[color:var(--surface-container)]
            hover:bg-surface
            transition
          "
        >
          <Quote className="text-on-surface/40" size={18} />

          <p className="mt-3 text-on-surface/80 leading-relaxed">“{t.quote}”</p>

          <div className="mt-4 text-sm text-on-surface/60">
            — {t.name}, {t.role}
          </div>
        </div>
      ))}
    </div>
  )
}

function PricingSection() {
  const plans = [
    { name: 'Free', price: '$0', highlight: false },
    { name: 'Pro', price: '$12', highlight: true },
    { name: 'Enterprise', price: 'Custom', highlight: false },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <div
          key={p.name}
          className={clsx(
            `
            rounded-3xl
            p-8
            border
            transition
            hover:-translate-y-1
            `,
            p.highlight
              ? 'bg-surface text-on-surface border-primary'
              : 'bg-surface-container text-on-surface border-[color:var(--surface-container)]'
          )}
        >
          <div className="text-lg font-semibold">{p.name}</div>

          <div className="mt-4 text-4xl font-semibold">
            {p.price}
            <span className="text-sm text-on-surface/60"> /mo</span>
          </div>

          <button className="mt-6 w-full rounded-xl bg-primary py-2 text-white hover:opacity-90 transition">
            Get started
          </button>
        </div>
      ))}
    </div>
  )
}

function CTASection() {
  return (
    <div className="rounded-3xl bg-primary p-14 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-white to-transparent" />

      <div className="relative">
        <h2 className="text-4xl font-semibold">Start building today</h2>

        <p className="mt-3 text-white/80">No credit card. No setup friction. Just structure.</p>

        <button className="mt-6 rounded-xl bg-white text-primary px-6 py-3 font-medium hover:opacity-90 transition">
          Get started
        </button>
      </div>
    </div>
  )
}
