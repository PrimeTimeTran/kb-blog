---
draft: true
date: 2026-05-14
title: 'Web: App Router - Persistent Layouts and Dynamic Regions'
summary: 'How App Router changes the way layouts, persistence, and dynamic regions must be composed in modern web systems.'

tags:
  - web
  - nextjs
  - app-router
  - architecture
  - layout
  - systems-thinking

series:
  id: web-primitives
  title: Web Primitives
  order: 4

audience:
  - developers
  - frontend-engineers
  - systems-thinkers

intent:
  - systems-thinking
  - architecture
  - mental-models
  - implementation

difficulty: intermediate

type: architecture

next:
  rendering:
    label: 'Explore rendering'
    intent: 'how data and UI resolve over time'

  state:
    label: 'Explore persistence'
    intent: 'how state survives recomposition'

  overview:
    label: 'See full model'
    intent: 'how everything connects'
---

# App Router 3 Column Layout in Next.js

Building a true IDE-style 3 column layout in Next.js App Router is deceptively difficult.

```python {} showLineNumbers
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount+1] * (amount+1)
        dp[0] = 0
        for a in range(1, amount+1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], dp[a-c]+1)
        return dp[amount] if dp[amount] != amount+1 else -1
```

# App Router 3 Column Layout in Next.js

Building a true IDE-style 3 column layout in Next.js App Router is deceptively difficult.

At first glance it sounds simple:

- left sidebar
- center content
- right table of contents

But once you introduce:

- shared state
- persistent sidebars
- route transitions
- scrollspy
- SSR
- resizing
- nested layouts

you quickly discover that App Router imposes architectural constraints that fundamentally change how layout systems need to be designed.

This post walks through a production-ready mental model for building a stable 3-column layout system inside Next.js App Router.

---

# The Goal

We want:

- Persistent left sidebar between route changes
- Dynamic center content per page
- Dynamic right sidebar per page
- Shared scrollspy system
- SSR support
- No layout remounting
- No infinite loops
- Stable resizing behavior
- No layout shift on anchor navigation

---

# The Biggest App Router Constraint

The important realization is:

> `layout.tsx` persists between navigations.

while:

> `page.tsx` changes between navigations.

This means:

| Component     | Responsibility                 |
| ------------- | ------------------------------ |
| Root Layout   | Shared shell / persistent UI   |
| Nested Layout | Shared section-level state     |
| Page          | Dynamic route-specific content |

This becomes critically important for sidebars.

---

# The Core Architecture

The correct mental model is:

```txt
Root App Layout
  └── KB Layout
        ├── LEFT SIDEBAR (persistent)
        └── Dynamic Route Content
              ├── CENTER
              └── RIGHT SIDEBAR
```

The left sidebar must live in a persistent layout.

The center and right columns should belong to the page layer.

---

# Root Application Layout

Your root app layout should establish the viewport and prevent body scrolling.

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
  );
}
```

## Why this matters

This creates:

- one viewport
- one layout tree
- controlled scrolling
- no browser body scroll interference

The important part is:

```jsx
flex-1 min-h-0 overflow-hidden
```

Without `min-h-0`, nested flex scrolling breaks.

This is one of the most common flexbox issues in React applications.

---

# Shared KB Layout

Next, create a persistent knowledge-base layout.

```jsx
// app/kb/layout.tsx
import { KBLayout } from '@/layouts/ThreeColumnLayout';
import { getKbTree } from '@/lib/content/domain/kb/kb.server';

export default async function Layout({ children }) {
  const tree = await getKbTree();

  return <KBLayout tree={tree}>{children}</KBLayout>;
}
```

## Why this matters

This layout:

- persists between KB page navigations
- preserves sidebar state
- avoids remounting
- avoids refetching the sidebar tree repeatedly

This is the correct place for shared data.

---

# The Persistent Left Sidebar

Now we create the actual shared layout shell.

```jsx
// layouts/ThreeColumnLayout.tsx
'use client';

import SidebarTree from '../app/kb/SidebarTree';
import { ResizableColumn } from '@/components/layout/ResizableColumn';

export function KBLayout({ tree, children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ResizableColumn side="left" className="h-full">
        <SidebarTree data={tree} />
      </ResizableColumn>

      <div className="flex-1 min-w-0 h-full flex">{children}</div>
    </div>
  );
}
```

## Important Detail: `min-w-0`

This line is critical:

```jsx
flex-1 min-w-0
```

Without `min-w-0`:

- center content refuses to shrink
- right sidebar resizing breaks
- overflow behavior becomes unstable
- prose/code blocks push layouts apart

This single class fixes many mysterious flexbox issues.

---

# Dynamic Center + Right Layout

The page itself owns the center and right regions.

```jsx
// app/kb/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { content } from '@/lib/content/api/client';
import { ResizableColumn } from '@/components/layout/ResizableColumn';
import TableOfContents from '@/components/TableOfContents';
import { ScrollContainer } from './ScrollContainer';

export default async function Page({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

  const KBItem = await content.get({ type: 'kb', slug });

  if (!KBItem) notFound();

  return (
    <div className="flex h-full min-h-0 min-w-0 w-full overflow-hidden">
      {/* CENTER */}
      <BaseScroll>
        <div className="prose dark:prose-invert px-3">
          <KBItem.Content />
        </div>
      </BaseScroll>

      {/* RIGHT */}
      <ResizableColumn side="right" className="h-full shrink-0">
        <TableOfContents toc={KBItem.toc} />
      </ResizableColumn>
    </div>
  );
}
```

---

# Why the Right Sidebar Originally Broke

A common issue is:

> resizing works for the left sidebar but breaks for the right sidebar.

This happens because the right sidebar exists deeper in the flex tree.

The center content tries to preserve intrinsic width.

Result:

- right sidebar appears to grow incorrectly
- black overlays appear
- resizing feels unstable

The fix is:

```jsx
min - w - 0;
overflow - hidden;
```

on the parent flex container.

---

# Shared ScrollSpy Architecture

The scrollspy system should not attach to `window`.

Instead:

- create one shared scroll root
- expose it via context
- allow TOC systems to subscribe

---

# Scroll Container

```jsx
'use client';

import { useScroll } from '@/providers/ScrollProvider';

export function ScrollContainer({ children }) {
  const { setScrollEl } = useScroll();

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
      style={{ contain: 'layout paint' }}
    >
      {children}
    </div>
  );
}
```

---

# Why `contain: layout paint` Helps

Without it:

- clicking TOC anchors can shift the entire app upward
- content slides underneath the navbar
- scroll calculations propagate upward

Adding:

```jsx
style={{ contain: 'layout paint' }}
```

isolates layout calculations to the scroll container itself.

This is extremely useful in nested App Router layouts.

---

# The Flexbox Rule That Solves Most Bugs

If you remember one thing from this article, remember this:

```txt
Any flex child that needs to shrink MUST have min-w-0
```

This includes:

- prose content
- markdown
- code blocks
- TOCs
- scroll containers

Without it, resizing becomes unstable.

---

# Why This Architecture Works

This setup cleanly separates concerns.

## Root Layout

Responsible for:

- viewport
- navbar
- app shell

---

## KB Layout

Responsible for:

- persistent sidebar
- shared KB state
- layout shell

---

## Page

Responsible for:

- page content
- TOC
- page-specific UI

---

# The Biggest Mistake People Make

Most developers initially try:

```txt
One giant layout owns everything
```

This causes:

- layout remounting
- sidebar resets
- stale route data
- impossible prop threading
- broken scroll state

App Router wants layered ownership.

Once you embrace that model, the architecture becomes much simpler.

---

# Post-Architecture Improvements

Now that the layout is stable, you can safely add:

- persistent panel sizes
- animated resizing
- shared scrollspy hooks
- synchronized headings
- virtualized sidebars
- MDX analysis pipelines
- route-aware TOCs

without fighting App Router itself.

---

# Final Mental Model

Think about the system like this:

```txt
Persistent layouts own shared UI.
Pages own dynamic UI.
Scroll roots must be isolated.
Flex children must be shrinkable.
```

Once those rules are respected, App Router becomes dramatically easier to reason about.
