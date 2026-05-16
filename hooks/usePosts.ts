import { useMemo, useState } from 'react'
import { TOPICS } from '../data/constants'
import type { Topic } from '../data/constants'

type SortOrder = 'asc' | 'desc'
type SortField = 'date' | 'title'

type UsePostsOptions<T> = {
  fetchedPosts: T[]
  initialSortField?: SortField
  initialSortOrder?: SortOrder
}

function normalizeTag(tag: string) {
  return String(tag).trim().replace(/\s+/g, '-').toLowerCase()
}

export function usePosts<T extends Record<string, any>>({
  fetchedPosts,
  initialSortField = 'date',
  initialSortOrder = 'desc',
}: UsePostsOptions<T>) {
  // -----------------------------------
  // UI STATE
  // -----------------------------------

  const [searchTerm, setSearchTerm] = useState('')
  const [disabledTopics, setDisabledTopics] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>(initialSortField)
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder)

  // -----------------------------------
  // NORMALIZATION
  // -----------------------------------
  const disabledTagSet = useMemo(() => {
    const set = new Set<string>()

    for (const topic of disabledTopics as Topic[]) {
      const tags = TOPICS[topic] ?? []
      for (const tag of tags) {
        set.add(tag)
      }
    }

    return set
  }, [disabledTopics])

  const normalizedPosts = useMemo(() => {
    return fetchedPosts.map((post) => {
      const rawTags = post.frontMatter?.tags

      const tags = Array.isArray(rawTags) ? rawTags.map(normalizeTag) : []

      const title = String(post.title ?? '')
      const summary = String(post.summary ?? '')
      const body = String(post.body ?? '')

      return {
        ...post,
        title,
        summary,
        body,
        tags,
        date: post.date ? new Date(post.date) : null,
        searchIndex: [title, summary, body, ...tags].join(' ').toLowerCase(),
      }
    })
  }, [fetchedPosts])

  // -----------------------------------
  // ALL UNIQUE TAGS
  // -----------------------------------

  const allTags = useMemo(() => {
    const set = new Set<string>()

    for (const post of normalizedPosts) {
      for (const tag of post.tags) {
        set.add(tag)
      }
    }

    return Array.from(set).sort()
  }, [normalizedPosts])
  // -----------------------------------
  // TAG TOGGLE
  // -----------------------------------

  function toggleTag(tag: string) {
    setDisabledTopics((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // -----------------------------------
  // FILTERING
  // -----------------------------------

  const filteredPosts = useMemo(() => {
    let result = normalizedPosts

    // -----------------------------
    // TAG FILTER
    // -----------------------------

    /**
     * Empty disabledTopic means:
     * ALL TAGS ACTIVE
     */

    if (disabledTopics.length > 0) {
      result = result.filter((post) => {
        const tags = post.tags ?? []

        // keep post only if it does NOT contain disabled tags
        return !tags.some((tag) => disabledTagSet.has(tag))
      })
    }

    // -----------------------------
    // SEARCH FILTER
    // -----------------------------

    const term = searchTerm.trim().toLowerCase()

    if (term) {
      result = result.filter((post) => {
        return post.searchIndex.includes(term)
      })
    }

    return result
  }, [searchTerm, normalizedPosts, disabledTopics, disabledTagSet])

  // -----------------------------------
  // SORTING
  // -----------------------------------

  const sortedPosts = useMemo(() => {
    const sorted = [...filteredPosts]

    sorted.sort((a, b) => {
      // -------------------------
      // DATE SORT
      // -------------------------

      if (sortField === 'date') {
        const aTime = a.date?.getTime() ?? 0
        const bTime = b.date?.getTime() ?? 0

        return sortOrder === 'desc' ? bTime - aTime : aTime - bTime
      }

      // -------------------------
      // TITLE SORT
      // -------------------------

      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()

      const result = aTitle.localeCompare(bTitle)

      return sortOrder === 'desc' ? -result : result
    })

    return sorted
  }, [filteredPosts, sortField, sortOrder])

  // -----------------------------------
  // METRICS
  // -----------------------------------

  const metrics = useMemo(
    () => ({
      total: fetchedPosts.length,
      filtered: filteredPosts.length,
    }),
    [fetchedPosts, filteredPosts]
  )

  // -----------------------------------
  // API
  // -----------------------------------

  return {
    posts: sortedPosts,

    metrics,

    searchTerm,
    setSearchTerm,

    disabledTopics,
    toggleTag,
    setDisabledTopics,

    allTags,

    sortField,
    setSortField,

    sortOrder,
    setSortOrder,
  }
}
