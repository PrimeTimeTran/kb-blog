import PageClient from './PageClient'
import { content } from '../lib/content/api/client'
import { Graffiti } from '@/components/Graffiti'
import { ScrollContainer } from '@/components/ScrollContainer'
// app/page.jsx
export default async function Page() {
  const posts = (await content.list({ type: 'blog' })) || []
  if (!posts) return null
  return (
    <main className="relative flex flex-1 min-h-0 overflow-hidden">
      <Graffiti />
      <ScrollContainer>
        <div className="mx-auto w-full max-w-4xl px-6 py-10 relative z-10">
          <PageClient posts={posts || []} />
        </div>
      </ScrollContainer>
    </main>
  )
}
