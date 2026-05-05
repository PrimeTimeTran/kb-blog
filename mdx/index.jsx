import { layouts } from '@/layouts'

import { Image } from '@/components/mdx/Image'
import { Embed } from '@/components/mdx/Embed'
import { CallOut } from '@/components/mdx/CallOut'
import { Snippet } from '@/components/mdx/Snippet'
import { Pre, TabGroup } from '@/components/mdx/Code'
import { TOCInline } from '@/components/mdx/TOCInline'
import { OrderBook } from '@/components/mdx/OrderBook'
import { CustomLink as Link } from '@/components/mdx/Link'
import { Term } from '@/components/mdx/Term'

import { BlogNewsletterForm } from '@/components/NewsletterForm'
import { H1, H2, H3, H4, H5, H6 } from '@/components/HeadingComponents'

export const baseComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Image,
  Embed,
  Term,
  CallOut,
  Snippet,
  pre: Pre,
  TOCInline,
  a: Link,
  OrderBook,
  tabGroup: TabGroup,
  TabGroup: TabGroup,
  BlogNewsletterForm,
}

export function createMDXComponents(registry = {}, embedded, depth = 0, visited = new Set()) {
  return {
    ...baseComponents,
    Embed: (props) => <Embed {...props} registry={registry} depth={depth} visited={visited} />,
    wrapper: ({ layout, ...rest }) => {
      const Layout = layouts[layout] || layouts.KBLayout
      return <Layout {...rest} embedded={embedded} depth={depth} visited={visited} />
    },
  }
}
