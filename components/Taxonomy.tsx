import React from 'react'
import Link from 'next/link'
import { slug } from 'github-slugger'

import { buttonVariants } from '@/components/buttonVariants'

function TagButton({ label, tailDecoration, active, onClick, disabled }): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-active={active}
      className={`
        chip
        ${active ? 'chip-active' : 'chip-inactive'}
        ${disabled ? 'chip-disabled' : ''}
      `}
    >
      <span className="chip-label">{label}</span>

      {tailDecoration !== undefined && <span className="chip-badge">{tailDecoration}</span>}
    </button>
  )
}

function TagLink({ text, count }) {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="
        inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm
        text-on-surface-variant
        hover:text-primary
        hover:bg-primary-container
        transition-colors
      "
    >
      <span>{text}</span>
      {count && <span className="text-xs opacity-70">({count})</span>}
    </Link>
  )
}

function TagList(tags, t) {
  return (
    <div key={t}>
      <TagLink text={t} count={tags[t]} />
    </div>
  )
}

function Category({ title, tags, sortedTags, filter, icon }) {
  const [open, setOpen] = React.useState(true)

  const categoryTags = (sortedTags ?? []).filter((t) => filter.includes(t.toLowerCase()))

  const Icon = icon

  return (
    <div className="w-full border-b border-outline-variant py-3 card bg-surface">
      <button className="w-full text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-on-surface-variant" />}

            <h2 className="text-xl font-semibold text-on-surface hover:text-primary transition-colors">
              {title}
            </h2>
          </div>

          <span className="text-sm text-on-surface-variant">
            {categoryTags.length} {open ? '▲' : '▼'}
          </span>
        </div>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${open ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="flex flex-wrap gap-2">
          {categoryTags.map((t) => (
            <TagLink key={t} text={t} href={`/tags/${slug(t)}`} count={tags[t]} />
          ))}
        </div>
      </div>
    </div>
  )
}

export { TagButton, TagLink, Category, TagList }
