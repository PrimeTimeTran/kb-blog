---
draft: false
date: 2026-05-10
title: 'Web: Architecture - Three Primitives That Shape Web Applications'

summary: 'How Layout, Page, and Template define persistence, resolution, and recomposition in modern web systems.'
tags: ['web', 'nextjs', 'architecture', 'primitives', 'systems-thinking']

series:
  id: web-primitives
  title: Web Primitives
  order: 1

audience:
  - founders
  - developers
  - content-strategists

intent:
  - systems-thinking
  - conceptual-introduction
  - cross-disciplinary

difficulty: introductory

type: introduction

next:
  publishing:
    label: 'Explore publishing'
    intent: 'how ideas become content'

  architecture:
    label: 'Explore architecture'
    intent: 'how the system is built'

  overview:
    label: 'See full model'
    intent: 'how everything connects'
---

## Web Architecture — Persistent Layouts, Route Boundaries, and UI State

Modern web frameworks do not merely render pages. They define **lifecycles**.

In systems like Next.js App Router, architecture is shaped less by components themselves and more by:

- persistence boundaries
- rendering ownership
- data life cycles
- recomposition behavior
- server/client execution constraints

What appears to be “just a sidebar” or “just a layout” is often the result of multiple interacting systems:

- routing
- rendering
- hydration
- caching
- state persistence
- async execution

The challenge is no longer simply building UI.

It is deciding:

> what survives navigation, what recomputes, and who owns the boundary between them.

---

## Layout as a Persistence Boundary

A `layout.tsx` is not merely visual structure.

In App Router, it is a **persistent execution boundary**.

Everything rendered inside a layout is intentionally preserved across navigation:

- React state
- providers
- async data
- scroll regions
- interaction state
- mounted component trees

This changes how architecture must be designed.

A sidebar rendered inside a layout is no longer “just shared UI.” It becomes:

- long-lived state
- shared infrastructure
- route-stable structure

That persistence is extremely powerful.

It allows systems like:

- knowledge base trees
- resizable application shells
- persistent editors
- navigation memory
- long-lived workspace state

without rebuilding the interface on every route change.

---

## Pages as Resolution Layers

Pages serve a different role.

A `page.tsx` is not persistent infrastructure. It is a **resolution layer**.

Its purpose is to answer:

> “What content belongs at this route?”

This distinction matters because pages are disposable.

When navigation occurs:

- pages remount
- local state resets
- async work reruns
- route-specific UI recomposes

This makes pages ideal for:

- route content
- document rendering
- per-route enhancements
- contextual UI

but poor places for:

- shared application state
- long-lived interaction systems
- persistent navigation structure

---

## The Hidden Constraint: Server vs Client Boundaries

One of the most important architectural constraints in App Router is that layouts often need to be both:

- server-rendered
- interactive

But these responsibilities conflict.

For example:

- async data fetching requires Server Components
- resizing, drag state, and interaction require Client Components

This forces an architectural split.

A common pattern becomes:

```tsx
// layout.tsx
export default async function Layout({ children }): React.PropsWithChildren {
  const data = await getSharedData();

  return <LayoutClient data={data}>{children}</LayoutClient>;
}
```

Here:

- the server layout owns data resolution
- the client layout owns interaction behavior

This is not accidental complexity.

It is a direct consequence of separating:

- execution environment
- persistence
- interactivity

---

## Shared Layout Systems Across Route Boundaries

One subtle challenge appears when building multi-column systems.

Consider:

- a persistent left sidebar
- route-owned center content
- a contextual right sidebar

The left column naturally belongs inside `layout.tsx`.

But the right column often depends on route-specific data:

- table of contents
- document metadata
- editor state
- contextual tools

That means the right side frequently must be rendered from the page itself.

The result is a split layout system:

```text
layout.tsx
  └── persistent structure

page.tsx
  └── route-specific structural augmentation
```

At first this feels wrong.

But it reflects a deeper truth:

> in App Router, layout ownership is distributed across routing boundaries.

---

## Templates and Recomposed UI

`template.tsx` exists to intentionally break persistence.

Unlike layouts:

- templates remount on navigation
- local state resets
- effects rerun
- animations restart

This makes templates ideal for:

- transitions
- route animations
- temporary interaction state
- per-navigation recomposition

A route transition animation becomes almost trivial:

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Template({ children }): React.PropsWithChildren {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

The important insight is not the animation itself.

It is that App Router exposes recomposition as an architectural primitive.

---

## Architecture as Lifecycle Design

Most frontend discussions focus on components.

But modern application architecture is increasingly about:

- persistence
- ownership
- recomposition
- execution boundaries
- state lifetime

The important question is no longer:

> “What component should render this?”

It is:

> “What should survive navigation, and who should own it?”

That distinction determines:

- performance
- mental model
- state consistency
- rendering behavior
- system flexibility

In systems like App Router, layout primitives are not merely organizational tools.

They are lifecycle primitives.
