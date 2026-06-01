'use client';

import { PageSEO } from '../components/SEO';
import { useState } from 'react';

/**
 * @param {Object[]} tabs - Array of { id: string, label: string, content: React.ReactNode }
 */
function ContentTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col items-center px-16 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex gap-6 mb-10 text-sm border-b border-outline-variant text-on-surface-variant pt-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              pb-3 transition-colors border-b
              ${activeTab === tab.id ? 'border-primary text-on-surface' : 'border-transparent hover:text-on-surface'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="relative w-full max-w-2xl flex-1 min-h-0 flex justify-center">
        <div className="w-full space-y-6 text-on-surface-variant leading-relaxed text-[15px]">
          {/* Dynamically render the content based on activeTab */}
          {tabs.find((t) => t.id === activeTab)?.content}
        </div>
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-tr from-(--surface-variant)/20 via-(--surface)/0 to-(--primary-container)/10" />
    </div>
  );
}

export default function AboutLayout({ children, frontMatter }) {
  const { name = 'Loi Tran' } = frontMatter || {};

  const tabData = [
    { id: 'intro', label: 'Introduction', content: children },
    // { id: 'experience', label: 'Experience', content: <ExperienceList /> },
    // { id: 'contact', label: 'Contact', content: <ContactForm /> },
  ];

  return (
    <div className="h-full w-full overflow-hidden">
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />

      {/* IMPORTANT: isolate creates proper stacking context */}
      <div className="relative isolate h-screen w-full flex overflow-hidden">
        {/* ================= BACKGROUND LAYERS ================= */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Blob 1 (top-left / primary) */}
          <div className="animate-blob-1 absolute -top-40 left-1/4 w-150 h-150 rounded-full blur-3xl bg-radial from-primary/30 via-primary/10 to-transparent dark:from-primary/25 dark:via-primary/5" />

          {/* Blob 2 (bottom-right / secondary) */}
          <div className="animate-blob-2 absolute bottom-0 right-0 w-125 h-125 rounded-full blur-3xl bg-radial from-secondary/30 via-secondary/10 to-transparent dark:from-secondary/25 dark:via-secondary/5" />
        </div>

        {/* ================= LEFT ================= */}
        <div className="relative w-1/3 h-full min-h-0 overflow-hidden border-r border-(--border)">
          {/* ambient background */}
          <div className="absolute inset-0 bg-surface" />

          {/* soft radial glow */}
          <div
            className="absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30"
            style={{
              background: 'var(--gradient-primary)',
            }}
          />

          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
              linear-gradient(to right, var(--on-surface) 1px, transparent 1px),
              linear-gradient(to bottom, var(--on-surface) 1px, transparent 1px)
            `,
              backgroundSize: '32px 32px',
            }}
          />

          {/* content */}
          <div className="relative z-10 flex h-full flex-col justify-between px-14 py-16">
            {/* top section */}
            <div className="space-y-8">
              {/* eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />

                <div className="text-[10px] uppercase tracking-[0.35em] text-(--muted-foreground)">About</div>
              </div>

              {/* heading */}
              <div className="space-y-4">
                <h1
                  className="max-w-sm text-5xl leading-none"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--on-surface)',
                    letterSpacing: 'var(--tracking-tight)',
                    fontWeight: 'var(--font-weight-bold)',
                  }}
                >
                  {name}
                </h1>

                <div
                  className="h-px w-24"
                  style={{
                    background: 'linear-gradient(to right, var(--primary), transparent)',
                  }}
                />
              </div>

              {/* description */}
              <p
                className="max-w-sm text-sm leading-7"
                style={{
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Building interfaces that feel quiet, intentional, and human. Systems with rhythm, atmosphere, and
                emotional texture.
              </p>

              {/* mini metadata */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-(--muted-foreground)">Focus</div>

                  <div className="mt-2 text-sm text-on-surface">Design Systems</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-(--muted-foreground)">Medium</div>

                  <div className="mt-2 text-sm text-on-surface">Interactive UI</div>
                </div>
              </div>
            </div>

            {/* bottom */}
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.3em] text-(--muted-foreground)">Location</div>

                <div className="text-sm text-on-surface">Miami / Digital Space</div>
              </div>

              {/* decorative badge */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-md"
                style={{
                  borderColor: 'var(--border)',
                  // background: 'var(--glass)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: 'var(--primary)',
                    boxShadow: 'var(--glow-primary)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative h-full min-h-0 w-full overflow-y-auto">
          <ContentTabs tabs={tabData} />
        </div>
      </div>
    </div>
  );
}

function ExperienceList() {
  return <h1></h1>;
}
function ContactForm() {}
