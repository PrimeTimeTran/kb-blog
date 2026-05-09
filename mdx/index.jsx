import { Term } from './components/Term'
import { Image } from './components/Image'
import { Embed } from './components/Embed'
import { CallOut } from './components/CallOut'
import { Snippet } from './components/Snippet'
import { Pre, TabGroup } from './components/Code'
import { TOCInline } from './components/TOCInline'
import { OrderBook } from './components/OrderBook'
import { SafeLink as Link } from './components/Link'
import { TermPeekDefinition } from './components/TermPeekDefinition'

import { BlogNewsletterForm } from '../components/NewsletterForm'
import { H1, H2, H3, H4, H5, H6 } from '../components/HeadingComponents'
import { layouts } from '../layouts'

// Layer A: PURE component map (NO logic)
const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Term,
  Image,
  Embed,
  a: Link,
  CallOut,
  Snippet,
  pre: Pre,
  TOCInline,
  OrderBook,
  TermPeekDefinition,
  tabGroup: TabGroup,
  TabGroup: TabGroup,
  BlogNewsletterForm,
}

export const MDXComponents = Object.fromEntries(
  Object.entries(components).map(([key, value]) => [key, value?.default ?? value])
)

// Layer B: runtime factory (safe)
export function createMDXComponents(registry, depth, visited, embedded) {
  return {
    ...MDXComponents,
    Embed: (props) => <Embed {...props} registry={registry} depth={depth} visited={visited} />,
    // wrapper: ({ layout, ...rest }) => {
    //   const Layout = layouts[layout] || layouts.KBLayout
    //   return <Layout {...rest} embedded={embedded} depth={depth} visited={visited} />
    // },
  }
}
