import PageClient from './PageClient'
import { getAllTags } from '../../lib/content/server/tag/getAllTags'
import { CenterRegion } from '@/components/layout/CenterRegion'

export default async function TagsPage() {
  const tags = await getAllTags('blog')

  return (
    <CenterRegion>
      <PageClient tags={tags} />
    </CenterRegion>
  )
}
