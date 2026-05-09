'use client'
import { useState } from "react";
import { PageSEO } from '@/components/SEO'
import { Image } from '@/mdx/components'
import SocialIcon from '@/components/social-icons'
import { Navbar } from '@/components/layout/AppNavbar'


function ContentTabs({ children }) {
  const [tab, setTab] = useState("intro");

  return (
    <div className="relative w-2/3 flex flex-col items-center px-16">

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 mb-10 text-sm text-neutral-400">
        {[
          { id: "intro", label: "Introduction" },
          // { id: "notes", label: "Notes" },
          // { id: "extras", label: "Extras" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 transition ${tab === t.id
              ? "text-white border-b border-white"
              : "hover:text-white"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* content column */}
      <div className="max-w-2xl space-y-8 text-neutral-300 leading-relaxed text-[15px]">
        <div className="space-y-6">
          {tab === "intro" && children}
          {/* {tab === "notes" && <div>Notes content here</div>} */}
          {/* {tab === "extras" && <div>Extras content here</div>} */}
        </div>
      </div>

      {/* subtle light wash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function AuthorLayout({ children, frontMatter }) {
  const {
    name = '',
    avatar = '',
    occupation = '',
    company = '',
    email = '',
    twitter = '',
    linkedin = '',
    github = '',
  } = frontMatter || {}

  return (
    <div className="flex flex-1 flex-col min-h-0 h-full">
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />

      <div className="relative min-h-screen w-full flex bg-neutral-950 text-neutral-100 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full" />

        {/* LEFT SIDE */}
        <div className="relative w-1/3 flex flex-col justify-center px-14 border-r border-white/10">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">About</div>

            <div className="text-4xl font-extralight tracking-tight leading-tight">{name}</div>

            <div className="h-px w-24 bg-gradient-to-r from-white/20 to-transparent" />

            <div className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Building interfaces that feel quiet, intentional, and human.
            </div>
          </div>

          {/* subtle bottom label */}
          <div className="absolute bottom-10 text-[10px] tracking-widest text-neutral-600">
            MIAMI / DIGITAL SPACE
          </div>
        </div>

        {/* RIGHT SIDE */}
        <ContentTabs>
          <div className="flex flex-col justify-center items-center space-y-6">{children}</div>
        </ContentTabs>

      </div>
    </div>
  )
}
