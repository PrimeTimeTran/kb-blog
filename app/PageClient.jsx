'use client'

import Link from 'next/link'
import ListLayout from '@/layouts/ListLayout'
import { MAX_DISPLAY } from '@/data/constants'
import siteMetadata from '@/data/site-metadata'
import NewsletterForm from '@/components/NewsletterForm'
import { BaseScroll } from '../components/BaseScroll'
import GraffitiWrapper from '../components/mdx/GraffitiWrapper'

// No card example
// https://gal.hagever.com/
export default function PageClient({ posts }) {
  return (
    // TODO:Home:
    // - [ ] Add left sidebar nav for series suggestions
    <BaseScroll>
      <GraffitiWrapper>
        <ListLayout
          pagination={1}
          posts={posts}
          title="Latest"
          initialDisplayPosts={[]}
          subtitle={siteMetadata.description}
        />
      </GraffitiWrapper>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end mt-6 text-base font-medium">
          <Link
            href="/blog"
            className="text-2xl font-semibold text-primary hover:text-on-primary-container transition-colors"
          >
            All Posts →
          </Link>
        </div>
      )}

      {siteMetadata.newsletter.provider !== '' && (
        <div className="p-4 flex justify-center">
          <NewsletterForm />
        </div>
      )}
    </BaseScroll>
  )
}
