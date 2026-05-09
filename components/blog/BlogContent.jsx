'use client'
import { useRef } from 'react'

import Footer from '../../components/layout/AppFooter'
import Comments from '../../components/comments'
import { BlogHeader, BlogFooter } from './blocks'

export default function BlogContent({ className, frontMatter, children }) {
  const { title = '', date = '' } = frontMatter || {}
  const scrollRef = useRef(null)
  return (
    <>
      <BlogHeader title={title} date={date} shrunk={null} />
      <article ref={scrollRef} className="prose p-3 dark:prose-invert prose-md">
        {children}
        <BlogFooter />
        <Comments />
        <Footer />
      </article>
    </>
  )
}
