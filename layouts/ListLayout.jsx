'use client'
import { useState, useMemo } from 'react'
import { FiCalendar } from 'react-icons/fi'

import Tag from '../components/Tag'
import { SafeLink as Link } from '../mdx/components/Link'
import formatDate from '../lib/utils/formate-date'
import Pagination from '../components/Pagination'
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
  const setSortOrder = () => { }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {title}
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400">{subtitle}</p>

          {topics}

          {/* SEARCH + SORT ROW */}
          {/* remove relative max-w-lg to split up this div when u wanna add sorting */}
          <div className="flex items-start justify-between gap-4 w-full relative max-w-lg">
            {/* Search */}
            <div className="flex-1">
              <input
                aria-label="Search articles"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            {/* Sort */}
            {/* <div className="flex-2 flex-col items-end shrink-0">
              <h2 className="text-xs font-semibold text-meta mb-1">Sort</h2>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`text-xs px-2 py-1 rounded ${
                    sortOrder === 'desc'
                      ? 'bg-surface text-link-active font-semibold'
                      : 'text-meta hover:text-meta-hover'
                  }`}
                >
                  Newest
                </button>

                <button
                  onClick={() => setSortOrder('asc')}
                  className={`text-xs px-2 py-1 rounded ${
                    sortOrder === 'asc'
                      ? 'bg-surface text-link-active font-semibold'
                      : 'text-meta hover:text-meta-hover'
                  }`}
                >
                  Oldest
                </button>
              </div>
            </div> */}
          </div>
        </div>

        <ul>
          {!sortedPosts.length && <p className="py-6 text-gray-500">No posts found.</p>}

          {sortedPosts.map((post) => {
            const { slug, date, title, summary, tags = [] } = post

            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dd className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-3 decoration-text-muted">
                      <FiCalendar />
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>

                  <div className="space-y-3 xl:col-span-3 w-full group">
                    <h3 className="text-2xl font-bold tracking-tight">
                      <Link
                        href={buildContentUrl('blog', slug)}
                        className="block w-full text-3xl font-semibold  transition-colors group-hover:text-link"
                      >
                        {title}
                      </Link>
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400">{summary}</p>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                </article>
                <hr className="my-6" />
              </li>
            )
          })}
        </ul>
      </div>

      {pagination?.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
