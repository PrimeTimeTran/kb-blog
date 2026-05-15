'use client'
import { useState } from 'react'
import { PageSEO } from '../components/SEO'

function ContentTabs({ children }) {
  const [tab, setTab] = useState('intro')
  return (
    <div className="relative w-2/3 flex flex-col items-center px-16">
      {/* Tabs */}
      <div className="flex gap-6 mb-10 text-sm border-b border-outline-variant text-(--on-surface-variant) pt-6">
        {/* TODO: Add more tabs. Projects, Professional */}
        {/* {[{ id: 'intro', label: 'Introduction' }, { id: 'go', label: 'Go' }].map((t) => ( */}
        {[{ id: 'intro', label: 'Introduction' }].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`
              pb-3 transition-colors
              ${
                tab === t.id
                  ? 'text-(--on-surface) border-b border-(--primary)'
                  : 'hover:text-(--on-surface)'
              }
            `}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* content column */}
      {/* <div className="flex-1 min-w-0 min-h-0 flex items-center justify-center">{children}</div> */}
      <div className="max-w-2xl space-y-8 text-(--on-surface-variant) leading-relaxed text-[15px]">
        <div className="space-y-6 ">{tab === 'intro' && children}</div>
      </div>
      <div className="max-w-2xl space-y-8 text-(--on-surface-variant) leading-relaxed text-[15px]">
        <div className="space-y-6 ">{tab === 'go' && children}</div>
      </div>

      {/* subtle themed glow */}
      <div
        className="
        absolute inset-0 pointer-events-none
        bg-linear-to-tr
        from-(--surface-variant)/40
        via-(--surface)/0
        to-(--primary-container)/20
      "
      />
    </div>
  )
}

export default function AboutLayout({ children, frontMatter }) {
  const { name = '', occupation = '', company = '' } = frontMatter || {}

  return (
    <div className="flex flex-1 flex-col min-h-0 h-full no-scrollbar">
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />

      <div className="relative h-full w-full flex bg-(--background) text-(--on-background) overflow-hidden">
        {/* ambient glow (theme-based instead of hardcoded colors) */}
        <div
          className="
          absolute -top-40 -left-40 w-[600px] h-[600px]
          bg-(--primary-container)/40
          blur-3xl rounded-full
          no-scrollbar
        "
        />

        <div
          className="
          absolute bottom-0 right-0 w-[500px] h-[500px]
          bg-(--secondary-container)/30
          blur-3xl rounded-full
          no-scrollbar
        "
        />

        {/* LEFT SIDE */}
        <div
          className="
          relative w-1/3 flex flex-col justify-center px-14
          h-full min-h-0  
          border-r border-outline-variant
          pb-16
          no-scrollbar
        "
        >
          <div className="space-y-6">
            <div
              className="
              text-xs uppercase tracking-[0.3em]
              text-(--on-surface-variant)
            "
            >
              About
            </div>

            <div
              className="
              text-4xl font-light tracking-tight leading-tight
              text-(--on-surface)
            "
            >
              {name}
            </div>

            <div
              className="
              h-px w-24
              bg-gradient-to-r
              from-(--outline-variant)
              to-transparent
            "
            />

            <div
              className="
              text-sm leading-relaxed max-w-sm
              text-(--on-surface-variant)
            "
            >
              Building interfaces that feel quiet, intentional, and human.
            </div>
          </div>

          {/* bottom label */}
          <div
            className="
            absolute bottom-10 text-[10px] tracking-widest
            text-(--on-surface-variant)
            opacity-70
            pb-16
            no-scrollbar
          "
          >
            MIAMI / DIGITAL SPACE
          </div>
        </div>

        {/* RIGHT SIDE */}
        <ContentTabs>
          <div className="flex-1 min-w-0 min-h-0 flex items-center justify-center">
            <div className="flex flex-col justify-center items-center space-y-6 no-scrollbar">
              {children}
            </div>
          </div>
        </ContentTabs>
      </div>
    </div>
  )
}
