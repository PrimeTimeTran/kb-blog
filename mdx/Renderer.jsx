import { layouts } from '../layouts'

// | Route        | Input type                             |
// | ------------ | -------------------------------------- |
// | `/about`     | raw string                             |
// | `/kb/*`      | bundled MDX object                     |
// | `/kb/KB-TOC` | partially transformed / broken context |

export default function MDXRenderer({ Content, layout: Layout, layoutProps = {} }) {
  const ResolvedLayout = typeof Layout === 'string' ? layouts[Layout] : Layout
  if (!ResolvedLayout) {
    return Content ? <Content /> : null
  }

  return (
    <ResolvedLayout {...layoutProps}>
      <div className="prose dark:prose-invert">{Content}</div>
    </ResolvedLayout>
  )
}
