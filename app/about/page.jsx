import AboutLayout from '@/layouts/AboutLayout'

import { content } from '@/lib/content/api/client'

export default async function Page() {
  const about = await content.get({ type: 'authors', slug: 'default' })

  if (!about) return null

  return (
    <AboutLayout>
      <about.Content />
    </AboutLayout>
  )
}
