'use client'
import { FiCalendar } from 'react-icons/fi'

import { TagButton, TagLink } from '../components/Taxonomy'
import formatDate from '../lib/utils/formate-date'
import { TOPICS } from '../data/constants'
import Pagination from '../components/Pagination'
import { SafeLink as Link } from '../components/mdx/Link'
import { buildContentUrl } from '../lib/content/core/url'
import { usePosts } from '@/hooks/usePosts'

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
    <div className="flex h-full min-h-0 max-w-5xl px-3 mx-auto">
      <div className="flex-1 min-w-0 space-y-2">
        <header className="card surface-container">
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
                    active={active}
                    onClick={() => toggleTag(topic)}
                    label={topic}
                    tailDecoration={tags.length}
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

        <PostList posts={posts} />

        {pagination?.totalPages > 1 && !searchTerm && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </div>
  )
}

function PostCard({ post }) {
  const { slug, date, title, summary, tags = [] } = post

  return (
    <article className="card xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 group rounded-xl">
      <dl>
        <dd className="text-sm flex items-center space-x-3 text-on-surface-variant opacity-80">
          <FiCalendar className="text-primary opacity-80" />

          <time dateTime={date}>{formatDate(date)}</time>
        </dd>
      </dl>

      <div className="space-y-3 xl:col-span-3 w-full">
        <h3 className="text-2xl font-bold tracking-tight">
          <Link
            href={buildContentUrl('blog', slug)}
            className="block w-full text-3xl text-on-surface transition-colors group-hover:text-primary"
          >
            {title}
          </Link>
        </h3>

        <p className="text-on-surface-variant opacity-80">{summary}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagLink key={tag} text={tag} />
          ))}
        </div>
      </div>
    </article>
  )
}

function SearchBar({ value, onChange, metrics, sortField, setSortField, sortOrder, setSortOrder }) {
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
      <div className="flex items-center justify-between">
        {/* SEARCH */}
        <div className="relative w-full max-w-lg">
          <input
            aria-label="Search articles"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search articles"
            className="
              w-full bg-background text-on-surface placeholder:text-on-surface-variant border border-outline-variant rounded-md px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 transition outline-none
            "
          />
        </div>

        {/* METRICS (between input and sort) */}
        <div className="shrink-0 text-sm text-on-surface-variant whitespace-nowrap">
          {metrics.filtered} / {metrics.total}
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
