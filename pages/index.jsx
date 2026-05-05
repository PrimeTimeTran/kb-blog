import { useState, useMemo } from 'react'

import { SafeLink as Link } from '@/mdx/components/Link'
import { PageSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import siteMetadata from '@/data/site-metadata'
import PanelsLayout from '@/layouts/PanelsLayout'
import NewsletterForm from '@/components/NewsletterForm'

import { getAllBlogPosts } from '@/lib/content/server/blog.server'

import { TOPICS, MAX_DISPLAY } from '@/data/constants'

export async function getStaticProps() {
  const posts = await getAllBlogPosts()

  return {
    props: {
      posts: posts || [],
    },
  }
}

export default function Home({ posts }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTopics, setActiveTopics] = useState([])

  const toggleTopic = (topicName) => {
    setActiveTopics((prev) => {
      if (prev.includes(topicName)) {
        return prev.filter((t) => t !== topicName)
      }
      return [...prev, topicName]
    })
  }

  // Topic filter
  const filteredPosts = useMemo(() => {
    let result = posts
    if (activeTopics.length > 0) {
      result = (result ?? []).filter((post) => {
        const postTags = (post.tags ?? []).map((tag) => tag.replace(' ', '-').toLowerCase())

        return activeTopics.some((topic) => {
          const topicTags = (TOPICS[topic] ?? []).map((tag) => tag.replace(' ', '-').toLowerCase())

          return topicTags.some((t) => postTags.includes(t))
        })
      })
    }
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()

      result = (result ?? [])?.filter(
        (post) =>
          (post.title && post.title.toLowerCase().includes(term)) ||
          (post.summary && post.summary.toLowerCase().includes(term)) ||
          (post.tags && post.tags.join(' ').toLowerCase().includes(term)) ||
          (post.body && post.body.toLowerCase().includes(term))
      )
    }

    return result
  }, [posts, searchTerm, activeTopics])

  return (
    <PanelsLayout mainWide>
      <main className="flex-1 min-w-0 h-full overflow-y-auto">
        <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
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
                {(Object.entries(TOPICS) ?? []).map(([topicName, topics]) => (
                  <button
                    key={topicName}
                    onClick={() => toggleTopic(topicName)}
                    className={`${
                      activeTopics.includes(topicName)
                        ? 'font-semibold underline text-link-active'
                        : ' text-meta hover:text-meta-hover'
                    }`}
                  >
                    {topicName} <span className="text-gray-500">({topics.length})</span>
                  </button>
                ))}
              </div>
            </div>
          }
        />

        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end mt-6 text-base font-medium">
            <Link href="/blog" className="text-3xl text-primary-500 hover:text-primary-600">
              All Posts →
            </Link>
          </div>
        )}
        <aside className="flex-1 min-w-0 h-full flex flex-col">
          {siteMetadata.newsletter.provider !== '' && (
            <div className="p-4 flex justify-center">
              <NewsletterForm />
            </div>
          )}
        </aside>
      </main>
    </PanelsLayout>
  )
}
