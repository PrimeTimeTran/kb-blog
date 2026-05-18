'use client'
import { useState } from 'react'
import { PageSEO } from '../components/SEO'

function ContentTabs({ children }) {
  const [tab, setTab] = useState('intro')

  return (
    <div className="flex flex-col items-center px-16 overflow-hidden">
      {/* Tabs */}
      <div className="flex gap-6 mb-10 text-sm border-b border-outline-variant text-on-surface-variant pt-6">
        {[
          { id: 'intro', label: 'Introduction' },
          // { id: 'spam', label: 'Spam' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`
              pb-3 transition-colors border-b
              ${tab === t.id ? 'border-primary text-on-surface' : 'border-transparent hover:text-on-surface'}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA (single source of truth) */}
      <div className="relative w-full max-w-2xl flex-1 min-h-0 flex items-center justify-center">
        <div className="space-y-6 text-on-surface-variant leading-relaxed text-[15px]">
          {tab === 'intro' && children}
          {tab === 'spam' && children}
        </div>
      </div>

      {/* BACKGROUND GLOW (now safely behind content) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-tr from-(--surface-variant)/20 via-(--surface)/0 to-(--primary-container)/10 dark:from-(--surface-variant)/40 dark:to-(--primary-container)/25" />
    </div>
  )
}

export default function AboutLayout({ children, frontMatter }) {
  const { name = '' } = frontMatter || {}

  return (
    <div className="h-full w-full overflow-y-auto">
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />

      {/* IMPORTANT: isolate creates proper stacking context */}
      <div className="relative isolate h-screen w-full flex overflow-hidden">
        {/* ================= BACKGROUND LAYERS ================= */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Blob 1 (top-left / primary) */}
          <div className="animate-blob-1 absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl bg-radial from-primary/30 via-primary/10 to-transparent dark:from-primary/25 dark:via-primary/5" />

          {/* Blob 2 (bottom-right / secondary) */}
          <div className="animate-blob-2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl bg-radial from-secondary/30 via-secondary/10 to-transparent dark:from-secondary/25 dark:via-secondary/5" />
        </div>

        {/* ================= LEFT ================= */}
        <div className="relative w-1/3 flex flex-col justify-center px-14 h-full min-h-0 border-r border-outline-variant pb-16">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">About</div>

            <div className="text-4xl font-light tracking-tight leading-tight text-on-surface">
              {name}
            </div>

            <div className="h-px w-24 bg-linear-to-r from-outline-variant to-transparent" />

            <div className="text-sm leading-relaxed max-w-sm text-on-surface-variant">
              Building interfaces that feel quiet, intentional, and human.
            </div>
          </div>

          <div className="absolute bottom-10 text-[10px] tracking-widest text-on-surface-variant opacity-70 pb-16">
            MIAMI / DIGITAL SPACE
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex-1 min-w-0 min-h-0">
          <ContentTabs>
            <div className="h-full overflow-y-auto flex items-center justify-center">
              <div className="flex flex-col justify-center items-center space-y-6">{children}</div>
            </div>
          </ContentTabs>
        </div>
      </div>
    </div>
  )
}
