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

    disabledTopics,
    toggleTag,

    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = usePosts({ fetchedPosts })

  return (
    <div className="flex h-full min-h-0 z-10">
      <div className="flex-1 min-w-0">
        <header className="space-y-2 w-full">
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

            <div className="my-2 mb-6 flex space-x-2 overflow-x-auto no-scrollbar pr-6 px-4">
              {Object.entries(TOPICS).map(([topic, tags]) => {
                const disabled = disabledTopics.includes(topic)
                return (
                  <TagButton
                    key={topic}
                    disabled={disabled}
                    onClick={() => toggleTag(topic)}
                    text={`${topic} (${tags.length})`}
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

  return (
    <div className="w-full">
      {/* SINGLE TOOLBAR ROW */}
      <div className="flex items-center gap-4 justify-between">
        {/* SEARCH */}
        <div className="relative w-full max-w-lg">
          <input
            aria-label="Search articles"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search articles"
            className="
              block w-full rounded-md px-4 py-2
              bg-surface
              text-on-surface
              border border-outline-variant
              placeholder:text-on-surface-variant
              focus:outline-none focus:ring-2 focus:ring-primary
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
            className={`px-2 py-1 rounded transition ${
              sortField === 'date'
                ? 'bg-primary text-on-primary'
                : 'bg-outline text-on-surface-variant hover:text-on-surface-variant'
            }`}
          >
            {sortLabel('date')}
          </button>

          <button
            onClick={() => toggleSort('title')}
            className={`px-2 py-1 rounded transition ${
              sortField === 'title'
                ? 'bg-primary text-on-primary'
                : 'bg-outline text-on-surface-variant hover:text-on-surface-variant'
            }`}
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
    <ul className="h-full w-full">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </ul>
  )
}

function PostCard({ post }) {
  const { slug, date, title, summary, tags = [] } = post

  return (
    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 card group">
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
            className="
                block w-full text-3xl
                text-on-surface
                transition-colors
                group-hover:text-primary
              "
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
