import AboutLayout from '@/layouts/AboutLayout'

export default async function Page() {
  const { getContentBySlug } = await import('@/lib/content/core/get-content-by-slug')

  const Response = await getContentBySlug('authors', 'default')

  if (!Response) return null

  return (
    <AboutLayout>
      <Response.Content />
    </AboutLayout>
  )
}
