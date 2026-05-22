import { Term } from './Term';
import { Image } from './Image';
import { Embed } from './Embed';
import { Callout } from './Callout';
import { Snippet } from './Snippet';
import { TabGroup } from './Code';
import { TOCInline } from './TOCInline';
import { OrderBook } from './OrderBook';
import { SafeLink as Link } from './Link';
import { TermPeekDefinition } from './TermPeekDefinition';
import { ProjectionChart } from './ProjectionChart';

import { BlogNewsletterForm } from '../NewsletterForm';
import { H1, H2, H3, H4, H5, H6, NumberedHeadings } from '../HeadingComponents';

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
  callout: Callout,
  Snippet,
  TOCInline,
  OrderBook,
  TermPeekDefinition,
  tabGroup: TabGroup,
  TabGroup: TabGroup,
  BlogNewsletterForm,
  ProjectionChart,
};

export const MDXComponents = Object.fromEntries(
  Object.entries(components).map(([key, value]) => [key, value?.default ?? value]),
);

// Layer B: runtime factory (safe)
// export function createMDXComponents(registry, depth, visited, embedded) {
//   return {
//     ...MDXComponents,
//     h1: NumberedHeadings.h1,
//     h2: NumberedHeadings.h2,
//     h3: NumberedHeadings.h3,
//     h4: NumberedHeadings.h4,
//     h5: NumberedHeadings.h5,
//     h6: NumberedHeadings.h6,
//     // Embed: (props) => <Embed {...props} registry={registry} depth={depth} visited={visited} />,
//     // wrapper: ({ layout, ...rest }) => {
//     //   const Layout = layouts[layout] || layouts.KBLayout
//     //   return <Layout {...rest} embedded={embedded} depth={depth} visited={visited} />
//     // },
//   };
// }
