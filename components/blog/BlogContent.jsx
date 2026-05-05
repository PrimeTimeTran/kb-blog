'use client'
import { useEffect, useRef } from 'react'

import Footer from '@/components/Footer'
import Comments from '@/components/comments'
import { BlogHeader, BlogFooter } from './blocks'
import { useScrollShrink } from '@/lib/hooks/useScrollShrink'

export default function BlogContent({ className, frontMatter, children }) {
  const { title, date } = frontMatter
  const scrollRef = useRef(null)
  const shrunk = useScrollShrink(scrollRef, 40)

  useEffect(() => {
    console.log(scrollRef.current)
  }, [])
  return (
    <>
      <BlogHeader title={title} date={date} shrunk={shrunk} />

      <article
        ref={scrollRef}
        className="prose p-3 dark:prose-invert prose-md flex-1 min-h-0 overflow-y-auto"
      >
        {children}
        <BlogFooter />
        <Comments />
        <Footer />
      </article>
    </>
  )
}
