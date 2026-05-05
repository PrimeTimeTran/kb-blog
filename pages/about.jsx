import MDXRenderer from '@/mdx/Renderer'
import { baseComponents } from '@/mdx'

export async function getStaticProps() {
  const { getContentBySlug } = await import('@/lib/content/core/get-content-by-slug')
  const authorDetails = await getContentBySlug('authors', 'default')

  return {
    props: {
      authorDetails,
    },
  }
}

export default function Page({ authorDetails }) {
  if (!authorDetails) return null

  return (
    <MDXRenderer
      layout="AuthorLayout"
      components={baseComponents}
      mdxSource={authorDetails.mdxSource}
      frontMatter={authorDetails.frontMatter}
      layoutProps={{
        frontMatter: authorDetails.frontMatter,
        ...authorDetails,
      }}
    />
  )
}
