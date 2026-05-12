'use client'

import { AppFooter } from '../../components/layout/AppFooter'
import Comments from '../../components/comments'
import { BlogHeader, BlogFooter } from './blocks'

export default function BlogContent({ frontMatter, children }) {
  const { title = '', date = '' } = frontMatter || {}

  return (
    <>
      <BlogHeader title={title} date={date} />
      {children}
      <BlogFooter />
      <Comments />
      <AppFooter />
    </>
  )
}
