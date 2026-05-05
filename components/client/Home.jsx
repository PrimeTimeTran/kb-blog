'use client'

import { useState, useMemo } from 'react'
import ListLayout from '@/layouts/ListLayout'
import { TOPICS } from '@/data/constants'
import siteMetadata from '@/data/site-metadata'

export default function HomeClient({ posts }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTopics, setActiveTopics] = useState([])

  const toggleTopic = (topicName) => {
    setActiveTopics((prev) =>
      prev.includes(topicName) ? prev.filter((t) => t !== topicName) : [...prev, topicName]
    )
  }

  const filteredPosts = useMemo(() => {
    let result = posts

    if (activeTopics.length > 0) {
      result = result.filter((post) => {
        const postTags = (post.tags ?? []).map((t) => t.replace(' ', '-').toLowerCase())

        return activeTopics.some((topic) => {
          const topicTags = (TOPICS[topic] ?? []).map((t) => t.replace(' ', '-').toLowerCase())

          return topicTags.some((t) => postTags.includes(t))
        })
      })
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()

      result = result.filter(
        (post) =>
          post.title?.toLowerCase().includes(term) ||
          post.summary?.toLowerCase().includes(term) ||
          post.tags?.join(' ').toLowerCase().includes(term) ||
          post.body?.toLowerCase().includes(term)
      )
    }

    return result
  }, [posts, searchTerm, activeTopics])

  return (
    <ListLayout
      pagination={1}
      title="Latest"
      posts={filteredPosts}
      initialDisplayPosts={[]}
      subtitle={siteMetadata.description}
      topics={
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Topics
          </h1>

          <div className="my-1 mb-6 flex space-x-2 overflow-x-auto">
            {Object.entries(TOPICS).map(([topicName, topics]) => (
              <button
                key={topicName}
                onClick={() => toggleTopic(topicName)}
                className={
                  activeTopics.includes(topicName)
                    ? 'font-semibold underline text-link-active'
                    : 'text-meta hover:text-meta-hover'
                }
              >
                {topicName} <span className="text-gray-500">({topics.length})</span>
              </button>
            ))}
          </div>
        </div>
      }
    />
  )
}
