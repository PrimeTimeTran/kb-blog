import matter from 'gray-matter'
import { compileWikiMDX } from '../../../../mdx-components'

// https://mdxjs.com/docs/
// | feature                     | works |
// | --------------------------- | ----- |
// | MDX v3 components           | ✅     |
// | React 18 runtime            | ✅     |
// | dynamic component injection | ✅     |
// | registry-based rendering    | ✅     |
// | no string runtime hacks     | ✅     |
// https://mdxjs.com/docs/

export async function bundle(source = '', slug, options) {
  const { data } = matter(source)
  const { index, headings } = options
  const { Content } = await compileWikiMDX(source, {
    slug,
    index,
    terms: options.terms || {},
  })

  return {
    Content,
    frontMatter: {
      ...data,
      date: data.date ? new Date(data.date).toISOString() : null,
    },
    toc: [],
  }
}
