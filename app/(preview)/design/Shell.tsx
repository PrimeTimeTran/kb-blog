'use client';

import clsx from 'clsx';
import {
  Users,
  TrendingUp,
  DollarSign,
  Zap,
  Palette,
  Code2,
  Layers3,
  Blocks,
  Move,
  Sparkles,
  Box,
  Grid3X3,
} from 'lucide-react';

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
  | 'trusted'
  | 'trust-badges'
  | 'benefits'
  | 'trust-badges'
  | 'press'
  | 'faq'
  | 'footer';

type Section = {
  id: string;
  type: SectionType;
};

// -----------------------------------------------------
// Placeholder content
// -----------------------------------------------------

const sections: Section[] = [
  { id: 'hero', type: 'hero' },
  { id: 'press', type: 'press' },
  { id: 'trusted', type: 'trusted' },
  { id: 'benefits', type: 'benefits' },
  { id: 'features', type: 'feature-grid' },
  { id: 'metrics', type: 'metrics' },
  { id: 'testimonials', type: 'testimonials' },
  { id: 'use-cases', type: 'use-cases' },
  { id: 'pricing', type: 'pricing' },
  { id: 'cta', type: 'cta' },
  { id: 'trust-badges', type: 'trust-badges' },
  { id: 'footer', type: 'footer' },
];

// -----------------------------------------------------
// Section renderer
// -----------------------------------------------------

function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case 'hero':
      return <HeroSection />;
    case 'press':
      return <PressSection />;
    case 'trusted':
      return <TrustedBySection />;
    case 'benefits':
      return <BenefitsSection />;
    case 'metrics':
      return <MetricsSection />;
    case 'use-cases':
      return <UseCasesSection />;
    case 'feature-grid':
      return <FeatureGridSection />;
    case 'testimonials':
      return <TestimonialsSection />;
    case 'trust-badges':
      return <TrustBadgesSection />;
    case 'pricing':
      return <PricingSection />;
    case 'cta':
      return <CTASection />;
    case 'faq':
      return <FAQSection />;
    case 'footer':
      return <FooterSection />;
    default:
      return null;
  }
}

// -----------------------------------------------------
// Page Shell
// -----------------------------------------------------

export function ProductPageShell() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background text-on-background">
      {sections.map((section, index) => (
        <div key={section.id} className={clsx('w-full px-6 py-20', index % 2 === 0 ? 'bg-surface' : 'bg-level')}>
          <div className="mx-auto w-full max-w-6xl">
            <SectionRenderer section={section} />
          </div>
        </div>
      ))}
    </div>
  );
}
const css = (v: string) => `var(${v})`;
// -----------------------------------------------------
// SECTION IMPLEMENTATIONS (placeholders)
// -----------------------------------------------------

function HeroSection() {
  return (
    <div
      className="relative overflow-hidden px-10 py-24"
      style={{
        background: css('--surface'),
        borderRadius: css('--radius-lg'),
        boxShadow: css('--shadow-lg'),
      }}
    >
      {/* glow */}
      <div
        className="absolute inset-0 opacity-40 blur-3xl"
        style={{
          background: css('--gradient-primary'),
        }}
      />

      <div className="relative">
        <div
          className="inline-flex items-center gap-2 px-4 py-1 text-sm"
          style={{
            background: css('--surface-2'),
            border: `1px solid ${css('--border')}`,
            borderRadius: css('--radius-sm'),
            fontFamily: css('--font-sans'),
          }}
        >
          <Zap size={14} style={{ color: css('--primary') }} />
          <span style={{ color: css('--on-surface') }}>New workspace system</span>
        </div>

        <h1
          className="mt-8 text-7xl leading-none tracking-tight"
          style={{
            fontFamily: css('--font-display'),
            color: css('--on-surface'),
            letterSpacing: css('--tracking-tight'),
          }}
        >
          Build something
          <br />
          <span
            style={{
              background: css('--gradient-primary'),
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            incredible
          </span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{
            color: css('--muted'),
          }}
        >
          A reusable product shell driven by workspace state and theme tokens.
        </p>

        <div className="mt-10 flex gap-4">
          <button
            style={{
              background: css('--primary'),
              color: 'white',
              borderRadius: css('--radius-md'),
              boxShadow: css('--shadow-sm'),
              padding: '12px 20px',
              fontWeight: css('--font-weight-medium'),
            }}
          >
            Get started
          </button>

          <button
            style={{
              background: css('--surface-2'),
              border: `1px solid ${css('--border')}`,
              color: css('--on-surface'),
              borderRadius: css('--radius-md'),
              padding: '12px 20px',
            }}
          >
            Learn more →
          </button>
        </div>
      </div>
    </div>
  );
}
function MetricsSection() {
  const items = [
    { label: 'Users', value: '128K', icon: Users },
    { label: 'Growth', value: '+84%', icon: TrendingUp },
    { label: 'Revenue', value: '$1.2M', icon: DollarSign },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="relative overflow-hidden p-8 transition hover:-translate-y-1"
            style={{
              background: css('--surface'),
              border: `1px solid ${css('--border')}`,
              borderRadius: css('--radius-lg'),
              boxShadow: css('--shadow-sm'),
            }}
          >
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition"
              style={{
                background: css('--glow-primary'),
              }}
            />

            <div className="relative">
              <Icon size={18} style={{ color: css('--primary') }} />

              <div
                style={{
                  fontFamily: css('--font-display'),
                  color: css('--on-surface'),
                  fontSize: '2.5rem',
                  marginTop: 16,
                }}
              >
                {item.value}
              </div>

              <div style={{ color: css('--muted') }}>{item.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function UseCasesSection() {
  const items = [
    { title: 'Design', desc: 'Rapid prototyping workflows', icon: Palette },
    { title: 'Engineering', desc: 'System orchestration layer', icon: Code2 },
    { title: 'Product', desc: 'Composable experiences', icon: Layers3 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            style={{
              background: css('--level'),
              borderRadius: css('--radius-lg'),
              border: `1px solid ${css('--border')}`,
              padding: 28,
            }}
          >
            <Icon size={20} style={{ color: css('--secondary') }} />

            <h3
              style={{
                fontFamily: css('--font-display'),
                color: css('--on-surface'),
                marginTop: 16,
                fontSize: 20,
              }}
            >
              {item.title}
            </h3>

            <p style={{ color: css('--muted'), marginTop: 8 }}>{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
function FeatureGridSection() {
  const features = [
    {
      title: 'Design Tokens',
      desc: 'Color, spacing, radius, and motion expressed as runtime variables.',
      icon: Palette,
    },
    {
      title: 'Workspace Isolation',
      desc: 'Each workspace can carry its own visual and behavioral context.',
      icon: Layers3,
    },
    {
      title: 'Composable UI',
      desc: 'Sections can be rearranged, swapped, or extended without rewrites.',
      icon: Blocks,
    },
    {
      title: 'Motion System',
      desc: 'Transitions driven by shared easing and duration tokens.',
      icon: Move,
    },
    {
      title: 'Theme Switching',
      desc: 'Dynamic runtime themes without re-mounting the application.',
      icon: Sparkles,
    },
    {
      title: 'Surface Hierarchy',
      desc: 'Clear visual depth using layered surface tokens.',
      icon: Box,
    },
  ];

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <div
          style={{
            color: css('--muted'),
            letterSpacing: css('--tracking-wide'),
            fontSize: 12,
            textTransform: 'uppercase',
          }}
        >
          System capabilities
        </div>

        <h2
          style={{
            fontFamily: css('--font-display'),
            color: css('--on-surface'),
            fontSize: 32,
            marginTop: 8,
          }}
        >
          A composable UI foundation
        </h2>

        <p
          style={{
            color: css('--muted'),
            marginTop: 10,
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          These primitives define how every workspace renders, behaves, and adapts to different themes in real time.
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;

          return (
            <div
              key={f.title}
              className="group relative overflow-hidden"
              style={{
                background: css('--surface'),
                borderRadius: css('--radius-lg'),
                border: `1px solid ${css('--border')}`,
                padding: 24,
                transition: `all ${css('--duration-normal')} ${css('--ease-standard')}`,
                boxShadow: css('--shadow-sm'),
              }}
            >
              {/* glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                style={{
                  background: css('--glow-primary'),
                }}
              />

              <div className="relative">
                {/* icon row */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{
                      background: css('--surface-2'),
                    }}
                  >
                    <Icon size={18} style={{ color: css('--primary') }} />
                  </div>

                  <div
                    style={{
                      fontFamily: css('--font-display'),
                      color: css('--on-surface'),
                      fontSize: 16,
                    }}
                  >
                    {f.title}
                  </div>
                </div>

                {/* description */}
                <p
                  style={{
                    marginTop: 12,
                    color: css('--muted'),
                    lineHeight: 1.6,
                    fontSize: 14,
                  }}
                >
                  {f.desc}
                </p>

                {/* subtle affordance */}
                <div
                  className="mt-6 text-xs opacity-0 group-hover:opacity-100 transition"
                  style={{
                    color: css('--muted'),
                  }}
                >
                  Explore →
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function TestimonialsSection() {
  const items = [
    { name: 'Alice', role: 'Designer', quote: 'Feels like an OS layer for UI.' },
    { name: 'Bob', role: 'Engineer', quote: 'Workspace model is insanely powerful.' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((t) => (
        <div
          key={t.name}
          style={{
            background: css('--glass'),
            borderRadius: css('--radius-lg'),
            border: `1px solid ${css('--border')}`,
            padding: 28,
            backdropFilter: 'blur(12px)',
          }}
        >
          <p style={{ color: css('--on-surface'), fontFamily: css('--font-display') }}>“{t.quote}”</p>

          <div style={{ marginTop: 16, color: css('--muted') }}>
            — {t.name}, {t.role}
          </div>
        </div>
      ))}
    </div>
  );
}
function PricingSection() {
  const plans = [
    { name: 'Free', price: '$0', highlight: false },
    { name: 'Pro', price: '$12', highlight: true },
    { name: 'Enterprise', price: 'Custom', highlight: false },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <div
          key={p.name}
          className={clsx(
            'relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 hover:-translate-y-1',
            p.highlight ? 'bg-surface border-transparent' : 'bg-level border-border',
          )}
          style={
            p.highlight
              ? {
                  background:
                    'linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(to bottom right, var(--primary), var(--secondary), var(--tertiary)) border-box',
                  border: '1px solid transparent',
                }
              : undefined
          }
        >
          {p.highlight && (
            <div
              className="
                absolute right-4 top-4 rounded-full
                px-3 py-1 text-xs font-medium text-white
              "
              style={{
                background: 'var(--primary)',
              }}
            >
              Popular
            </div>
          )}

          <div className="text-lg font-medium text-on-surface">{p.name}</div>

          <div
            className="mt-5 text-5xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--on-surface)',
            }}
          >
            {p.price}
          </div>

          <div className="mt-1 text-muted">per month</div>

          <button
            className="
              mt-8 w-full rounded-2xl py-3
              text-white transition hover:opacity-90
            "
            style={{
              background: 'linear-gradient(to right, var(--primary), var(--secondary))',
            }}
          >
            Get started
          </button>
        </div>
      ))}
    </div>
  );
}
function CTASection() {
  return (
    <div
      className="
        relative overflow-hidden rounded-[2.5rem]
        border border-border
        p-16 text-center
      "
      style={{
        background: 'linear-gradient(135deg, var(--primary), var(--secondary), var(--tertiary))',
      }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative">
        <h2
          className="text-5xl text-white"
          style={{
            fontFamily: 'var(--font-display)',
          }}
        >
          Start building today
        </h2>

        <p className="mt-4 text-lg text-white/80">No setup friction. Just structure.</p>

        <button
          className="
            mt-8 rounded-2xl
            bg-white px-8 py-4
            font-medium
            transition hover:scale-[1.02]
          "
          style={{
            color: 'var(--primary)',
          }}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
function TrustedBySection() {
  const companies = ['Acme', 'Linear', 'Vercel', 'Stripe', 'Notion'];

  return (
    <div
      className="py-10"
      style={{
        background: css('--surface'),
        borderRadius: css('--radius-lg'),
        border: `1px solid ${css('--border')}`,
      }}
    >
      <div className="text-center text-xs uppercase tracking-widest" style={{ color: css('--muted') }}>
        Trusted by teams
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-10 opacity-70">
        {companies.map((c) => (
          <div
            key={c}
            style={{
              fontFamily: css('--font-display'),
              color: css('--on-surface'),
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
function BenefitsSection() {
  const items = [
    { title: 'Faster iteration', desc: 'Build and test UI ideas instantly.', icon: Zap },
    { title: 'Predictable UI', desc: 'Everything is token-driven and consistent.', icon: Layers3 },
    { title: 'Composable system', desc: 'Swap entire sections without rewrites.', icon: Grid3X3 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((b) => {
        const Icon = b.icon;

        return (
          <div
            key={b.title}
            className="p-8 transition hover:-translate-y-1"
            style={{
              background: css('--level'),
              borderRadius: css('--radius-lg'),
              border: `1px solid ${css('--border')}`,
            }}
          >
            <Icon size={20} style={{ color: css('--secondary') }} />

            <div className="mt-4 text-xl" style={{ fontFamily: css('--font-display'), color: css('--on-surface') }}>
              {b.title}
            </div>

            <div className="mt-2" style={{ color: css('--muted') }}>
              {b.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function TrustBadgesSection() {
  const badges = ['SOC2 Ready', 'GDPR Compliant', '99.99% Uptime'];

  return (
    <div className="flex flex-wrap gap-4">
      {badges.map((b) => (
        <div
          key={b}
          className="px-4 py-2 text-sm"
          style={{
            background: css('--surface-2'),
            borderRadius: css('--radius-sm'),
            border: `1px solid ${css('--border-strong')}`,
            color: css('--on-surface'),
          }}
        >
          {b}
        </div>
      ))}
    </div>
  );
}
function PressSection() {
  const items = [
    { source: 'TechCrunch', quote: 'A new way to think about UI systems.' },
    { source: 'The Verge', quote: 'Workspace-driven design may replace pages.' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((p) => (
        <div
          key={p.source}
          className="p-8 transition hover:-translate-y-1"
          style={{
            background: css('--surface'),
            borderRadius: css('--radius-lg'),
            border: `1px solid ${css('--border')}`,
            boxShadow: css('--shadow-sm'),
          }}
        >
          <div style={{ color: css('--muted'), fontSize: 12 }}>{p.source}</div>

          <div
            className="mt-4 text-xl"
            style={{
              fontFamily: css('--font-display'),
              color: css('--on-surface'),
            }}
          >
            “{p.quote}”
          </div>

          <div
            className="mt-4"
            style={{
              color: css('--secondary'),
              textShadow: css('--glow-secondary'),
            }}
          >
            Featured coverage
          </div>
        </div>
      ))}
    </div>
  );
}
function FAQSection() {
  const items = [
    { q: 'What is a workspace?', a: 'A self-contained UI + state + theme context.' },
    { q: 'Can themes change at runtime?', a: 'Yes — all values are CSS variables.' },
    { q: 'Is this production ready?', a: 'It is designed as a composable UI system.' },
  ];

  return (
    <div className="space-y-4">
      {items.map((f) => (
        <div
          key={f.q}
          className="p-6 transition"
          style={{
            background: css('--surface'),
            borderRadius: css('--radius-md'),
            border: `1px solid ${css('--border')}`,
          }}
        >
          <div style={{ color: css('--on-surface'), fontFamily: css('--font-display') }}>{f.q}</div>

          <div className="mt-2" style={{ color: css('--muted') }}>
            {f.a}
          </div>
        </div>
      ))}
    </div>
  );
}
function FooterSection() {
  return (
    <div
      className="mt-20 py-10 text-center"
      style={{
        background: css('--background'),
        borderTop: `1px solid ${css('--border')}`,
      }}
    >
      <div
        style={{
          color: css('--muted'),
          fontSize: 12,
          letterSpacing: css('--tracking-wide'),
        }}
      >
        BUILT WITH WORKSPACES
      </div>

      <div
        className="mt-4"
        style={{
          fontFamily: css('--font-display'),
          color: css('--on-surface'),
        }}
      >
        A composable UI runtime
      </div>

      <div className="mt-2 text-xs" style={{ color: css('--muted') }}>
        Theme-driven • Token-based • Workspace-aware
      </div>
    </div>
  );
}
