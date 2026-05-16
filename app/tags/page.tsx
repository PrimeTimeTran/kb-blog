import PageClient from './PageClient'
import { content } from '@/lib/content/api/client'

export default async function Page() {
  const tags = await content.list({ type: 'blog', by: 'tags', action: 'countBy' })

  return <PageClient tags={tags || {}} />
}
