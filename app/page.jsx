import PageClient from './PageClient'
import { content } from '../lib/content/api/client'

export default async function Page() {
  const posts = (await content.list({ type: 'blog' })) || []
  if (!posts) return null
  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden">
      <PageClient posts={posts || []} />
    </div>
  )
}
