import AboutLayout from '@/layouts/AboutLayout'

export default async function Page() {
  const { getContent } = await import('@/lib/content/api/get-content')

  const Response = await getContent('authors', 'default')

  if (!Response) return null

  return (
    <AboutLayout>
      <Response.Content />
    </AboutLayout>
  )
}
