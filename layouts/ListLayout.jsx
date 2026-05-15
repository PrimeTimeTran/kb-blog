'use client'
import { useState, useMemo } from 'react'
import { FiCalendar } from 'react-icons/fi'

import { TagLink } from '../app/tags/Tag'
import formatDate from '../lib/utils/formate-date'
import Pagination from '../components/Pagination'
import { SafeLink as Link } from '../components/mdx/Link'
import { buildContentUrl } from '../lib/content/core/url'

export default function ListLayout({
  title,
  topics,
  subtitle,
  pagination,
  posts = [],
  initialDisplayPosts = [],
}) {
  const [searchValue, setSearchValue] = useState('')

  const safePosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      date: post.date || null,
      title: post.title || '',
      summary: post.summary || '',
      tags: Array.isArray(post.tags) ? post.tags : [],
    }))
  }, [posts])

  const filteredBlogPosts = useMemo(() => {
    const term = searchValue.toLowerCase()

    return safePosts?.filter((post) => {
      if (!term) return true

      const searchContent = post.title + ' ' + post.summary + ' ' + post.tags.join(' ')

      return searchContent.toLowerCase().includes(term)
    })
  }, [safePosts, searchValue])

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  const sortedPosts = useMemo(() => {
    return [...displayPosts].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  }, [displayPosts])

  const sortOrder = ''
  const setSortOrder = () => {}

  return (
    <div className="flex h-full min-h-0">
      <div className="flex-1 min-w-0">
        <div>
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-(--on-surface) sm:text-4xl md:text-4xl">
              {title}
            </h1>

            <p className="text-lg text-(--on-surface-variant)">{subtitle}</p>

            {topics}

            {/* SEARCH + SORT ROW */}
            <div className="flex items-start justify-between gap-4 w-full relative max-w-lg">
              {/* Search */}
              <div className="flex-1 pl-2">
                <input
                  aria-label="Search articles"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search articles"
                  className="
                  block w-full rounded-md px-4 py-2
                  bg-(--surface)
                  text-(--on-surface)
                  border border-outline-variant
                  placeholder:text-(--on-surface-variant)
                  focus:outline-none focus:ring-2 focus:ring-(--primary)
                "
                />
              </div>

              {/* Sort */}
              {/* <div className="flex flex-col items-end shrink-0">
              <h2 className="text-xs font-semibold text-(--on-surface-variant) mb-1">Sort</h2>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`
                    text-xs px-2 py-1 rounded transition-colors
                    ${
                      sortOrder === 'desc'
                        ? 'bg-(--primary) text-(--on-primary) font-semibold'
                        : 'text-(--on-surface-variant) hover:text-(--primary)'
                    }
                  `}
                >
                  Newest
                </button>

                <button
                  onClick={() => setSortOrder('asc')}
                  className={`
                    text-xs px-2 py-1 rounded transition-colors
                    ${
                      sortOrder === 'asc'
                        ? 'bg-(--primary) text-(--on-primary) font-semibold'
                        : 'text-(--on-surface-variant) hover:text-(--primary)'
                    }
                  `}
                >
                  Oldest
                </button>
              </div>
            </div> */}
            </div>
          </div>

          <ul className="h-full w-full">
            {!sortedPosts.length && (
              <p className="py-6 text-(--on-surface-variant) opacity-70">No posts found.</p>
            )}

            {sortedPosts.map((post) => {
              const { slug, date, title, summary, tags = [] } = post
              return (
                <li key={slug} className="w-full group list-none">
                  <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    {/* DATE */}
                    <dl>
                      <dd className="text-sm flex items-center space-x-3 text-(--on-surface-variant) opacity-80">
                        <FiCalendar className="text-(--primary) opacity-80" />
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>

                    {/* CONTENT */}
                    <div className="space-y-3 xl:col-span-3 w-full">
                      <h3 className="text-2xl font-bold tracking-tight">
                        <Link
                          href={buildContentUrl('blog', slug)}
                          className="block w-full text-3xl text-(--on-surface) transition-colors group-hover:text-(--primary)"
                        >
                          {title}
                        </Link>
                      </h3>

                      <p className="text-(--on-surface-variant) opacity-80">{summary}</p>

                      {/* TAGS */}
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <TagLink key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  </article>

                  {/* DIVIDER */}
                  <hr className="my-6 border-outline-variant opacity-50 transition-colors duration-200 group-hover:border-(--primary)" />
                </li>
              )
            })}
          </ul>
        </div>
        {pagination?.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </div>
  )
}
