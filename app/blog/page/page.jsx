import ListLayout from '@/layouts/ListLayout'
import siteMetadata from '@/data/site-metadata'
import { POSTS_PER_PAGE } from '@/data/constants'
import { getAllBlogPosts } from '@/lib/content/server/blog.server'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }))
}

export async function generateMetadata() {
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
  }
}

export default async function Page({ params }) {
  const posts = await getAllBlogPosts()

  const pageNumber = parseInt(params.page)

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (pageNumber > totalPages) {
    notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
