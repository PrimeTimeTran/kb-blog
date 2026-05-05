import { useEffect } from 'react'
import { PageSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import siteMetadata from '@/data/site-metadata'
import SectionContainer from '@/components/SectionContainer'
import { POSTS_PER_PAGE } from '@/data/constants'
import { pageview } from '../lib/ga'
import { log } from '@/lib/debug/logger'

export async function getStaticProps() {
  log.bundle('1. Get all Blog Posts from during build')
  const { getAllBlogPosts } = await import('@/lib/content/server/blog.server')
  const posts = await getAllBlogPosts()
  log.bundle('4. Blog posts land in client: ', posts)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts: posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  useEffect(() => {
    pageview()
  }, [])

  return (
    <SectionContainer>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </SectionContainer>
  )
}
