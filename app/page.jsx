import PageClient from './PageClient'
import { content } from '../lib/content/api/client'
import { Graffiti } from '@/components/Graffiti'

export default async function Page() {
  const posts = (await content.list({ type: 'blog' })) || []
  if (!posts) return null
  return (
    <main className="relative flex flex-1 min-h-0 overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Graffiti />
      </div>
      <PageClient posts={posts || []} />
    </main>
  )
}
