'use client'

import { AppFooter } from '../../components/layout/AppFooter'
import Comments from '../../components/comments'
import { BlogHeader, BlogFooter } from './blocks'

export default function BlogContent({ frontMatter, children }) {
  const { title = '', date = '' } = frontMatter || {}

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader title={title} date={date} />
      <main className="flex-1 min-h-0">
        <article className="prose dark:prose-invert pb-24">{children}</article>
      </main>
      {/* <AppFooter /> */}
      {/* <BlogFooter />
      <Comments />
      <AppFooter /> */}
    </div>
  )
}
