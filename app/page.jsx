import { getAllBlogPosts } from '../lib/content/server/blog.server'

import PageClient from './PageClient'

export default async function Page({ children, left, right }) {
  const posts = (await getAllBlogPosts()) || []
  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden">
      <PageClient posts={posts} />
    </div>
  )
}
