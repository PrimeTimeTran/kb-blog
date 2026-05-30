import { Box, Cpu, Layers, LayoutGrid, Palette, Zap } from 'lucide-react';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative w-full max-w-2xl group grid"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        layout
        className="relative rounded-4xl border border-white/10 bg-level/70 p-6 shadow-2xl backdrop-blur-2xl"
      >
        {children}
      </motion.div>
      <div className="absolute -bottom-12 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary opacity-20 blur-[100px]" />
    </motion.div>
  );
}

export default function App() {
  const { pageHero, pageLogos, pageFeatures, pageShowcase, pageTestimonials, pagePricing, pageCTA, pageFooter } =
    renderContent();
  return (
    <div className="min-h-full w-full bg-background text-on-background">
      {pageHero}
      {pageLogos}
      {pageFeatures}
      {pageShowcase}
      {pageTestimonials}
      {pagePricing}
      {pageCTA}
      {pageFooter}
    </div>
  );
}

function renderContent() {
  const heroRight = (
    <div className="relative w-full max-w-2xl group min-h-125 -top-20">
      <AnimatedCard>
        {/* Top Bar - Static/Instant */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-2 opacity-50">
            <div className="h-3 w-3 rounded-full bg-error" />
            <div className="h-3 w-3 rounded-full bg-tertiary" />
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>
          <div className="rounded-full bg-high/50 px-4 py-1 text-xs font-medium text-on-surface-variant">
            sandbox.dev
          </div>
        </div>

        {/* Content Wrapper: NO initial/animate here. Just the children. */}
        <div className="space-y-4">
          {/* Main Header */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl bg-primary-container p-8 text-on-primary-container shadow-inner"
          >
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Compiler Output</div>
            <div className="text-3xl font-extrabold tracking-tight">Runtime Environment Ready</div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
            {[
              {
                bg: 'bg-secondary-container',
                text: 'text-on-secondary-container',
                label: 'Editor',
                val: 'Ace-powered highlighting',
              },
              {
                bg: 'bg-tertiary-container',
                text: 'text-on-tertiary-container',
                label: 'Integration',
                val: 'Seamless iframe execution',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-3xl ${item.bg} ${item.text} p-6 transition-transform hover:-translate-y-1 duration-300`}
              >
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-60">{item.label}</div>
                <div className="font-bold leading-tight">{item.val}</div>
              </div>
            ))}
          </motion.div>

          {/* Build Status */}
          <motion.div variants={itemVariants} className="rounded-3xl bg-high p-6 border border-white/5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-bold">Build Status</div>
                <div className="text-xs text-on-surface-variant">Hot Module Replacement</div>
              </div>
              <div className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[10px] font-black text-on-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                RUNNING
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-highest">
              <div className="h-full w-3/4 animate-pulse rounded-full bg-primary" />
            </div>
          </motion.div>
        </div>
      </AnimatedCard>

      {/* Glow Effect */}
      <div className="absolute -bottom-12 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary opacity-20 blur-[100px]" />
    </div>
  );

  const pageHero = (
    <section className="relative overflow-hidden border-b border-outline-variant">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-primary)_0%,transparent_35%),radial-gradient(circle_at_bottom_right,var(--color-tertiary)_0%,transparent_35%)] opacity-20" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 p-6 lg:flex-row lg:items-center lg:justify-between">
        {heroLeft()}
        {heroRight}
      </div>
    </section>
  );
  const pageLogos = (
    <section className="border-b border-outline-variant bg-low">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 text-center text-sm font-medium uppercase tracking-[0.3em] text-on-surface-variant">
          Trusted by modern product teams
        </div>

        <div className="grid grid-cols-2 gap-6 opacity-70 md:grid-cols-5">
          {['Linear', 'Vercel', 'Figma', 'Stripe', 'Framer'].map((name) => (
            <div
              key={name}
              className="flex h-20 items-center justify-center rounded-2xl border border-outline bg-surface"
            >
              <span className="text-lg font-bold">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const pageFeatures = (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-20 max-w-3xl">
        <div className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Core Architecture</div>
        <h2 className="mb-6 text-4xl font-black text-primary-light md:text-6xl">
          Designed for scale. Built for clarity.
        </h2>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          A system rooted in Material Design principles, where intent meets execution. From tonal color mapping to
          depth-based elevation, every abstraction serves the user's focus.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: 'Tonal Palettes',
            body: 'Automatic color mapping using HCT (Hue, Chroma, Tone) to ensure accessible contrast and brand harmony.',
            icon: Palette,
          },
          {
            title: 'Elevation Tiers',
            body: 'A depth-first surface system that creates visual hierarchy through ambient shadow and tonal stacking.',
            icon: Layers,
          },
          {
            title: 'Component Density',
            body: 'Adaptive spacing patterns that gracefully shrink or expand based on screen size and input modality.',
            icon: Box,
          },
          {
            title: 'Motion Logic',
            body: 'Easing curves and shared element transitions that reinforce spatial relationships between views.',
            icon: Zap,
          },
          {
            title: 'Semantic Tokens',
            body: 'Abstraction over implementation. Use intent-based tokens to maintain consistency across themes.',
            icon: Cpu,
          },
          {
            title: 'Adaptive Layouts',
            body: 'Responsive gutters, margins, and column structures that translate natively to any viewport.',
            icon: LayoutGrid,
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="group rounded-[28px] border border-outline bg-level p-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-on-primary transition group-hover:scale-110">
              <feature.icon size={28} />
            </div>

            <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
            <p className="leading-relaxed text-on-surface-variant">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
  const pageShowcase = (
    <section className="border-y border-outline-variant bg-low">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Experience</div>

          <h2 className="text-4xl font-black md:text-6xl">Motion that feels physically connected.</h2>

          <p className="text-lg leading-relaxed text-on-surface-variant">
            Use shared transitions, reveal animations, hover overlays, and spatial continuity to make interfaces feel
            alive instead of static.
          </p>

          <div className="space-y-4 pt-4">
            {[
              'Shared element navigation',
              'Theme explosion transitions',
              'Spatial hover overlays',
              'Smooth scroll morphing',
            ].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* demo panel */}
        <div className="relative rounded-[32px] border border-outline bg-surface p-6 shadow-2xl">
          <div className="space-y-4">
            <div className="rounded-3xl bg-high p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-bold">Workspace Navigation</div>
                  <div className="text-sm text-on-surface-variant">Shared layout transitions</div>
                </div>

                <div className="rounded-full bg-primary-container px-3 py-1 text-xs text-on-primary-container">
                  ACTIVE
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-2xl bg-highest" />
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-primary-container p-8 text-on-primary-container">
              <div className="mb-3 text-sm uppercase tracking-widest opacity-70">Theme Transition</div>

              <div className="text-2xl font-black">Click anywhere to morph the interface palette.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  const pageTestimonials = (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-20 text-center">
        <div className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Testimonials</div>

        <h2 className="text-4xl font-black md:text-6xl">Teams love building with it.</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            quote: 'The motion system alone completely changed how our app feels.',
            name: 'Alex Rivera',
            role: 'Product Designer',
          },
          {
            quote: 'This is the cleanest Material 3 architecture I’ve seen on the web.',
            name: 'Jordan Lee',
            role: 'Frontend Engineer',
          },
          {
            quote: 'Theme transitions feel cinematic without sacrificing usability.',
            name: 'Taylor Brooks',
            role: 'Creative Director',
          },
        ].map((t) => (
          <div key={t.name} className="rounded-[28px] border border-outline bg-level p-8">
            <div className="mb-6 text-2xl leading-relaxed">“{t.quote}”</div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-container" />

              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-on-surface-variant">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  const pagePricing = (
    <section className="border-y border-outline-variant bg-low">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-20 text-center">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Pricing</div>

          <h2 className="text-4xl font-black md:text-6xl">Simple pricing for modern teams.</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              name: 'Starter',
              price: '$0',
              featured: false,
            },
            {
              name: 'Pro',
              price: '$29',
              featured: true,
            },
            {
              name: 'Enterprise',
              price: '$199',
              featured: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[32px] border p-8 ${
                plan.featured
                  ? 'border-primary bg-primary-container text-on-primary-container shadow-2xl scale-[1.02]'
                  : 'border-outline bg-surface'
              }`}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-black">{plan.name}</h3>

                {plan.featured && (
                  <div className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-on-primary">POPULAR</div>
                )}
              </div>

              <div className="mb-8 text-6xl font-black">
                {plan.price}
                <span className="text-lg font-medium opacity-70">/mo</span>
              </div>

              <div className="space-y-4">
                {['Unlimited themes', 'Motion primitives', 'Design tokens', 'Advanced layouts'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-current" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`mt-10 w-full rounded-full px-6 py-4 font-bold transition ${
                  plan.featured ? 'bg-primary text-on-primary hover:scale-[1.02]' : 'bg-high hover:bg-highest'
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  const pageCTA = (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_55%)] opacity-20" />

      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
        <div className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-primary">Start Building</div>

        <h2 className="mx-auto mb-8 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
          Create interfaces that feel alive.
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-on-surface-variant">
          Bring together motion, semantics, theming, and spatial continuity in a single design architecture.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-full bg-primary px-10 py-5 text-lg font-bold text-on-primary shadow-xl transition hover:scale-[1.03]">
            Start Free
          </button>

          <button className="rounded-full border border-outline bg-surface px-10 py-5 text-lg font-bold text-on-surface transition hover:bg-high">
            Documentation
          </button>
        </div>
      </div>
    </section>
  );
  const pageFooter = (
    <footer className="border-t border-outline-variant bg-low">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 text-xl font-black">Loi Tran | UI</div>

          <div className="text-sm text-on-surface-variant">Design System architecture.</div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-on-surface-variant">
          <button className="hover:text-on-background">Docs</button>
          <button className="hover:text-on-background">Components</button>
          <button className="hover:text-on-background">Themes</button>
          <button className="hover:text-on-background">Github</button>
        </div>
      </div>
    </footer>
  );
  return {
    pageHero,
    pageLogos,
    pageFeatures,
    pageShowcase,
    pageTestimonials,
    pagePricing,
    pageCTA,
    pageFooter,
  };

  function heroLeft() {
    return (
      <div className="max-w-2xl space-y-8 pt-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2 text-sm font-medium text-on-primary-container">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Browser-Native IDE Engine
        </div>
        <div className="space-y-5">
          <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Code, compile, and prototype—directly in your browser.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            An immersive, high-performance developer environment built with Material 3. Experience fluid editing,
            real-time sandboxed execution, and semantic design tools in a zero-setup workflow.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-on-primary shadow-lg transition hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]">
            Launch IDE
          </button>

          <button className="rounded-full border border-outline bg-surface px-8 py-4 text-sm font-bold text-on-surface transition hover:bg-high">
            View Documentation
          </button>
        </div>
        <div className="flex flex-wrap gap-8 pt-6">
          {[
            ['Live', 'Sandboxed Runtime'],
            ['Instant', 'Code Hot-Reloading'],
            ['M3', 'Semantic IDE Layout'],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-3xl font-black">{value}</div>
              <div className="text-sm text-on-surface-variant">{label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
