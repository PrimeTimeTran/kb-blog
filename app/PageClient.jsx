'use client'

import { useState, useMemo } from 'react'
import {
  Layout3ColumnLeft,
  Layout3ColumnRight,
  Layout3ColumnCenter,
} from '@/components/layout/ThreeColumnLayout'

import { TOPICS } from '../data/constants'
import { Tag } from './tags/Tag'
import ListLayout from '../layouts/ListLayout'
import { MAX_DISPLAY } from '../data/constants'
import siteMetadata from '../data/site-metadata'
import NewsletterForm from '../components/NewsletterForm'
import { CenterRegion } from '../components/layout/CenterRegion'

export default function PageClient({ posts }) {
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
    // TODO:
    // Add a categories/series groups
    <CenterRegion>
      <ListLayout
        pagination={1}
        title="Latest"
        posts={filteredPosts}
        initialDisplayPosts={[]}
        subtitle={siteMetadata.description}
        topics={
          <div className="w-full">
            <h1 className="text-2xl font-extrabold tracking-tight text-(--on-surface)">Topics</h1>

            <div className="my-2 mb-6 flex space-x-2 overflow-x-auto">
              {Object.entries(TOPICS).map(([topicName, topics]) => {
                const active = activeTopics.includes(topicName)
                return (
                  <Tag
                    key={topicName}
                    active={active}
                    onClick={() => toggleTopic(topicName)}
                    text={`${topicName} (${topics.length})`}
                  />
                )
              })}
            </div>
          </div>
        }
      />

      {/* All posts link */}
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end mt-6 text-base font-medium">
          <a
            href="/blog"
            className="
                text-2xl font-semibold
                text-(--primary)
                hover:text-(--on-primary-container)
                transition-colors
              "
          >
            All Posts →
          </a>
        </div>
      )}

      {/* Newsletter */}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="p-4 flex justify-center">
          <NewsletterForm />
        </div>
      )}
    </CenterRegion>
  )
}
