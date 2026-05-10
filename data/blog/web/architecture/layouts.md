---
draft: false
date: 2026-05-10
title: 'The Three Primitives That Shape Web Applications'

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
    path: '/web/publishing'
    intent: 'how ideas become content'

  architecture:
    label: 'Explore architecture'
    path: '/web/architecture'
    intent: 'how the system is built'

  overview:
    label: 'See full model'
    path: '/web/overview'
    intent: 'how everything connects'
---

## The Web as a System of Primitives

Most web applications are not built from “features” first. They are built from **primitives**—small structural decisions that determine how everything else behaves.

In modern frameworks like Next.js (App Router), three of these primitives matter more than most:

- **Layout**: persistent structure
- **Page**: content resolution
- **Template**: transient behavior per navigation

Understanding the difference between them is less about React and more about _how systems behave over time_.

---

## Layout: Persistence

A `layout.tsx` defines what _does not change_.

It is the stable frame:

- navigation
- sidebars
- global state
- providers
- long-lived UI

If something should survive navigation, it belongs here.

Think of layout as **memory**.

It accumulates state and resists reset.

---

## Page: Resolution

A `page.tsx` is where content is resolved.

It answers a single question:

> “What should exist at this route?”

Pages are:

- stateless by default
- disposable on navigation
- focused on output, not continuity

If layout is memory, page is **content lookup**.

---

## Template: Recomposition

A `template.tsx` is the most misunderstood primitive.

It exists for one reason:

> to re-run UI logic on every navigation.

Unlike layouts, templates are not persistent. They are _reconstructed_.

This makes them ideal for:

- animations
- transitions
- resetting local state
- per-route effects

---

## A Simple Example: Route Transitions

A practical use of `template` is animating between routes.

Because templates remount, they naturally restart animations.

```tsx
'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```
