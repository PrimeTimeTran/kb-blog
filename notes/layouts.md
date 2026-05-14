# App Router 3 Column layout

- [ ] Left sidebar must preserve data/state between pages
- [ ] Main content area and right sidebar must be dynamic, changing between pages.
- [ ] SSRendering must work
- [ ] No infinite loops
- [ ] Shared ScrollSpy hook
- [ ]

```jsx
export default async function AppLayout({ children }) {
  return (
    <html>
      <body className="h-full overflow-hidden">
        <AppShell>
          <div className="h-screen flex flex-col">
            <AppNavbar />
            <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
          </div>
        </AppShell>
      </body>
    </html>
  )
}
```

```jsx
// app/kb/layout.tsx
import { KBLayout } from '@/layouts/ThreeColumnLayout'
import { getKbTree } from '@/lib/content/domain/kb/kb.server'

export default async function Layout({ children }) {
  const tree = await getKbTree()
  return <KBLayout tree={tree}>{children}</KBLayout>
}
```

```jsx
// layouts/ThreeColumnLayout.tsx
'use client'
import SidebarTree from '../app/kb/SidebarTree'
import { ResizableColumn } from '@/components/layout/ResizableColumn'

export function KBLayout({ tree, children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ResizableColumn side="left" className="h-full">
        <SidebarTree data={tree} />
      </ResizableColumn>
      <div className="flex-1 min-w-0 h-full flex">{children}</div>
    </div>
  )
}
```

```jsx
// app/kb/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import { content } from '@/lib/content/api/client'
import { ResizableColumn } from '@/components/layout/ResizableColumn'
import TableOfContents from '@/components/TableOfContents'
import { ScrollContainer } from './ScrollContainer'

export default async function Page({ params }) {
  const slug = await (Array.isArray(params.slug) ? params.slug.join('/') : params.slug)

  const KBItem = await content.get({ type: 'kb', slug })

  if (!KBItem) notFound()
  return (
    <div className="flex h-full min-h-0">
      {/* CENTER */}
      <ScrollContainer>
        <div className="prose dark:prose-invert px-3">
          <KBItem.Content />
        </div>
      </ScrollContainer>

      {/* RIGHT */}
      <ResizableColumn side="right" className="h-full shrink-0">
        <TableOfContents toc={KBItem.toc} />
      </ResizableColumn>
    </div>
  )
}
```

```jsx
'use client'
import { useScroll } from '@/providers/ScrollProvider'

export function ScrollContainer({ children }) {
  const { setScrollEl } = useScroll()
  return (
    <div
      ref={setScrollEl}
      data-scroll-root
      className="
        flex-1
        min-w-0
        min-h-0
        overflow-y-auto
        scroll-smooth
      "
      // Prevents layout shift on TOC click
      style={{ contain: 'layout paint' }}
    >
      {children}
    </div>
  )
}
```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx
<ThemeProviders>
  <LayoutProvider>
    <ScrollProvider>
      <Navbar />
      {children}
    </ScrollProvider>
  </LayoutProvider>
</ThemeProviders>
```
