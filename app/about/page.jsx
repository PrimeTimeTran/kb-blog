import MDXRenderer from '@/mdx/Renderer'
import { getContentBySlug } from '@/lib/content/core/get-content-by-slug'

export default async function About() {
  const data = await getContentBySlug('authors', 'default')

  if (!data?.mdxSource) return null

  return <MDXRenderer mdxSource={data.mdxSource} frontMatter={data.frontMatter} />
}
