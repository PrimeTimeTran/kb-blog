import { getAllTags } from '@/lib/content/server/tag/getAllTags'
import TagsClient from '@/components/client/Tag'
import PanelsLayout from '@/layouts/OverlayLayout'

export default async function TagsPage() {
  const tags = await getAllTags('blog')

  return (
    <PanelsLayout>
      <TagsClient tags={tags} />
    </PanelsLayout>
  )
}
