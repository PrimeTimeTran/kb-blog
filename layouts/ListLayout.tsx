'use client'
import React, { Suspense } from 'react'
import { FiCalendar } from 'react-icons/fi'

import { usePosts } from '@/hooks/usePosts'
import { useInView } from '@/hooks/useInView'

import { TOPICS } from '@/data/constants'
import formatDate from '@/lib/utils/formate-date'
import { buildContentUrl } from '@/lib/content/core/url'
import Pagination from '@/components/Pagination'
import { SafeLink as Link } from '@/components/mdx/Link'
import { TagButton, TagLink } from '@/components/Taxonomy'
import { graffitiWords } from '@/data/graffiti'
import { useTypewriter } from '@/hooks/useTypeWriter'

export default function ListLayout({ posts: fetchedPosts, title, subtitle, pagination }) {
  const {
    posts,
    metrics,

    searchTerm,
    setSearchTerm,

    filteredTopics,
    toggleTag,

    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = usePosts({ fetchedPosts })

  return (
    <div className="flex h-full min-h-screen max-w-5xl px-3 mx-auto">
      <div className="flex-1 min-w-0 space-y-2">
        <header>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-on-surface sm:text-4xl">
            {title}
          </h1>

          <p className="text-lg text-on-surface-variant">{subtitle}</p>
          <SearchBar
            metrics={metrics}
            value={searchTerm}
            sortField={sortField}
            sortOrder={sortOrder}
            onChange={setSearchTerm}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
          />
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-linear-to-r from-surface to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-surface to-transparent" />

            <div className="my-2 mb-6 flex space-x-2 overflow-x-auto no-scrollbar">
              {Object.entries(TOPICS).map(([topic, tags]) => {
                const active = !filteredTopics.includes(topic)
                return (
                  <TagButton
                    key={topic}
                    label={topic}
                    active={active}
                    tailDecoration={tags.length}
                    onClick={() => toggleTag(topic)}
                  />
                )
              })}
            </div>
          </div>
          {/* <div className="w-full">
            <h1 className="text-2xl font-extrabold tracking-tight text-on-surface">Topics</h1>
            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-linear-to-r from-surface to-transparent" />

              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-linear-to-l from-surface to-transparent" />

              <div className="my-2 mb-6 flex space-x-2 overflow-x-auto no-scrollbar no-scrollbar-indicator px-2 lex space-x-2 overflow-x-auto pr-6">
                {Object.entries(TOPICS).map(([topic, topics]) => {
                  const disabled = disabledTags.includes(topic)
                  return (
                    <Tag
                      key={topic}
                      disabled={disabled}
                      onClick={() => toggleTag(topic)}
                      text={`${topic} (${topics.length})`}
                    />
                  )
                })}
              </div>
            </div>
          </div> */}
        </header>
        <Suspense fallback={<PostListSkeleton />}>{<PostList posts={posts} />}</Suspense>

        {pagination?.totalPages > 1 && !searchTerm && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </div>
  )
}

function PostCard({ post }) {
  const { ref, inView } = useInView()

  const { slug, date, title, summary, tags = [] } = post

  // 🔥 latch: remembers if it was ever visible
  const wasInView = React.useRef(false)

  if (inView) {
    wasInView.current = true
  }

  // show stays true until exit animation finishes naturally
  const show = inView || wasInView.current

  return (
    <article
      ref={ref}
      className={`
        xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 group rounded-xl

        transition-all duration-700 ease-out

        ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'}
      `}
    >
      {/* DATE */}
      <dl
        className={`
          transition-all duration-700 ease-out delay-75

          ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3'}
        `}
      >
        <dd className="text-sm flex items-center space-x-3 text-on-surface-variant opacity-80">
          <FiCalendar className="text-primary opacity-80" />
          <time dateTime={date}>{formatDate(date)}</time>
        </dd>
      </dl>

      {/* CONTENT */}
      <div className="space-y-3 xl:col-span-3 w-full">
        {/* TITLE */}
        <h3
          className={`
            text-2xl font-bold tracking-tight
            transition-all duration-700 ease-out delay-100

            ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4'}
          `}
        >
          <Link
            href={buildContentUrl('blog', slug)}
            className="
              block w-full text-3xl text-on-surface transition-colors
              group-hover:text-primary
            "
          >
            {title}
          </Link>
        </h3>

        {/* SUMMARY */}
        <p
          className={`
            text-on-surface-variant opacity-80
            transition-all duration-700 ease-out delay-150

            ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4'}
          `}
        >
          {summary}
        </p>

        {/* TAGS */}
        <div
          className={`
            flex flex-wrap gap-2
            transition-all duration-700 ease-out delay-200

            ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4'}
          `}
        >
          {tags.map((tag) => (
            <TagLink key={tag} text={tag} />
          ))}
        </div>
      </div>
    </article>
  )
}

function SearchBar({ value, onChange, metrics, sortField, setSortField, sortOrder, setSortOrder }) {
  // graffitiWords
  let { text, pause, resume, paused } = useTypewriter(graffitiWords)
  const toggleSort = (field) => {
    if (sortField === field) {
      // same field → toggle direction
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      // new field → default to desc (your rule)
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const sortLabel = (field) => {
    const active = sortField === field
    const arrow = active ? (sortOrder === 'asc' ? '↑' : '↓') : ''
    return `${field[0].toUpperCase() + field.slice(1)} ${arrow}`
  }

  const labelBase = 'px-2 py-1 rounded text-xs min-w-[64px] text-center transition-colors border'

  // ASC (ascending) → A → Z: apple, banana, cherry
  // DESC (descending) → Z → A: cherry, banana, apple
  function getStateClass(field) {
    return sortField === field
      ? 'bg-primary text-on-primary border-primary'
      : 'bg-surface-container text-on-surface border-outline-variant hover:bg-surface-container-high'
  }

  return (
    <div className="w-full">
      {/* SINGLE TOOLBAR ROW */}
      <div className="flex items-center justify-center space-x-5">
        {/* METRICS (between input and sort) */}
        <div className="shrink-0 text-sm font-medium text-on-surface whitespace-nowrap tabular-nums tracking-tight">
          <span>{metrics.filtered}</span>
          <span className="px-1 text-on-surface-variant">/</span>
          <span>{metrics.total}</span>
        </div>
        {/* SEARCH */}
        {/* TODO: Add base design tokens for input(hover, active, etc.) */}
        <div className="relative w-full max-w-lg">
          <div className="relative w-full">
            {/* ghost text */}
            <div className="absolute inset-0 flex items-center px-3 py-2 pointer-events-none text-on-surface-variant">
              {!paused && text}
              <span className="animate-pulse">|</span>
            </div>

            {/* real input */}
            <input
              aria-label="Search articles"
              type="text"
              onFocus={pause}
              onBlur={resume}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder=""
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/70 transition-colors duration-200 outline-none hover:border-outline hover:bg-surface-container focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/15 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* SORT BUTTONS */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          <button
            onClick={() => toggleSort('date')}
            className={`${labelBase} ${getStateClass('date')}`}
          >
            {sortLabel('date')}
          </button>

          <button
            onClick={() => toggleSort('title')}
            className={`${labelBase} ${getStateClass('title')}`}
          >
            {sortLabel('title')}
          </button>
        </div>
      </div>
    </div>
  )
}

function PostList({ posts }) {
  if (!posts.length) {
    return <p className="py-6 text-on-surface-variant opacity-70">No posts found.</p>
  }

  return (
    <ul className="h-full w-full space-y-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </ul>
  )
}

function PostListSkeleton() {
  return (
    <div className="space-y-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <article
          key={i}
          className="xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 rounded-xl"
        >
          {/* DATE */}
          <div className="mb-3 xl:mb-0">
            <div className="h-4 w-32 bg-on-surface/10 rounded animate-pulse" />
          </div>

          {/* CONTENT */}
          <div className="space-y-4 xl:col-span-3 w-full">
            {/* TITLE */}
            <div className="h-8 w-3/4 bg-on-surface/10 rounded animate-pulse" />

            {/* SUMMARY */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-on-surface/10 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-on-surface/10 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-on-surface/10 rounded animate-pulse" />
            </div>

            {/* TAGS */}
            <div className="flex gap-2 flex-wrap pt-2">
              <div className="h-6 w-16 bg-on-surface/10 rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-on-surface/10 rounded-full animate-pulse" />
              <div className="h-6 w-14 bg-on-surface/10 rounded-full animate-pulse" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
