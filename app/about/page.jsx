import AboutLayout from '@/layouts/AboutLayout'

export default async function Page() {
  const { getContentBySlug } = await import('@/lib/content/core/get-content-by-slug')

  const response = await getContentBySlug('authors', 'default')

  if (!response) return null

  return (
    <AboutLayout>
      <response.Content />
    </AboutLayout>
  )
}
