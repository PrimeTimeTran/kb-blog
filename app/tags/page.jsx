import { getAllTags } from '@/lib/content/server/tag/getAllTags'
import TagsClient from '@/components/client/Tag'
import { DockShell } from '../packages/docksystem/src'

export default async function TagsPage() {
  const tags = await getAllTags('blog')

  return (
      <TagsClient tags={tags} />
  )
}
