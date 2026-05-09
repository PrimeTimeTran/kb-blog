import { DockShell } from '@primetimetran/beeline'

import { PageSEO } from '../components/SEO'
import { MAX_DISPLAY } from '../data/constants'
import siteMetadata from '../data/site-metadata'
import NewsletterForm from '../components/NewsletterForm'
import { getAllBlogPosts } from '../lib/content/server/blog.server'

import HomeClient from '../components/client/Home'
import { ClientRegister } from './ClientRegister'

export default async function HomePage() {
  const posts = (await getAllBlogPosts()) || []

  return (
    <>
      <ClientRegister />
      <DockShell>
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
      </DockShell>
    </>

  )
}
