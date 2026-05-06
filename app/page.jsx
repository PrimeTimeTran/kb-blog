import { PageSEO } from '@/components/SEO'
import { DockLayout } from '../packages/docksystem/src'
import siteMetadata from '@/data/site-metadata'
import NewsletterForm from '@/components/NewsletterForm'
import { getAllBlogPosts } from '@/lib/content/server/blog.server'

import { MAX_DISPLAY } from '@/data/constants'
import HomeClient from '@/components/client/Home'

export default async function HomePage() {
  const posts = (await getAllBlogPosts()) || []

  return (
    <DockLayout isSingleCol>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <HomeClient posts={posts} />
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
    </DockLayout>
  )
}
