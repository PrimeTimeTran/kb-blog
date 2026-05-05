import { getAllTags } from '@/lib/content/server/tag/getAllTags'
import TagsClient from '@/components/client/Tag'
import PanelsLayout from '@/layouts/PanelsLayout'

export default async function TagsPage() {
  const tags = await getAllTags('blog')

  return (
    <PanelsLayout isSingleCol>
      <TagsClient tags={tags} />
    </PanelsLayout>
  )
}
