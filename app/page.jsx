import { PageSEO } from '../components/SEO'
import { MAX_DISPLAY } from '../data/constants'
import siteMetadata from '../data/site-metadata'
import NewsletterForm from '../components/NewsletterForm'
import { getAllBlogPosts } from '../lib/content/server/blog.server'

import PageClient from './PageClient'
import { ClientRegister } from './ClientRegister'
import { CenterRegion } from '@/components/layout/CenterRegion'
import { ReadingSurface } from '@/components/layout/ReadingSurface'

export default async function Page({ children, left, right }) {
  const posts = (await getAllBlogPosts()) || []
  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden">
      <CenterRegion>
        <PageClient posts={posts} />
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end mt-6 text-base font-medium">
            <a href="/blog" className="text-3xl text-primary-500 hover:text-primary-600">
              All Posts →
            </a>
          </div>
        )}
        {siteMetadata.newsletter.provider !== '' && (
          <div className="p-4 flex justify-center">
            <NewsletterForm />
          </div>
        )}
      </CenterRegion>
    </div>
  )
}
