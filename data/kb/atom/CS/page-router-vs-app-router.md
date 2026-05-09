---
draft: false
slug: atom/CS
date: '2026-05-03'
title: 'Page Router vs App Router | Next.js'
summary: 'Next.js has two routing systems: Pages Router → legacy, function-based data fetching. App Router → modern, component + server-first model. They solve the same problem (routing + rendering), but with different mental models.'
tags: ['tech', 'nextjs']
---

# Page Router vs App Router (Next.js)

## Core Idea

Next.js has two routing systems:

* **Pages Router** → legacy, function-based data fetching
* **App Router** → modern, component + server-first model

They solve the same problem (routing + rendering), but with different mental models.

---

## Pages Router (`pages/`)

### Mental model

> “Pages are pre-rendered using special data-fetching functions”

### Key features

* File-based routing in `/pages`
* Data fetching via lifecycle functions:

  * `getStaticProps` (SSG)
  * `getServerSideProps` (SSR)
  * `getStaticPaths` (dynamic SSG)
* API routes in `/pages/api`

### How rendering works

* Next.js precomputes data → sends JSON (`/_next/data/...`)
* Client hydrates page using that JSON
* Navigation triggers background data fetch

### Strengths

* Simple mental model
* Stable and widely supported
* Great for traditional SSR/SSG apps

### Limitations

* Rigid data-fetching model
* Layout duplication issues (`_app`, `_document`)
* Less control over streaming + server composition

---

## App Router (`app/`)

### Mental model

> “Everything is a Server Component unless declared otherwise”

### Key features

* File-based routing in `/app`
* Server Components by default
* Data fetching via `fetch()` (with caching rules)
* Route Handlers (`app/api/*`)
* Built-in layouts (`layout.tsx`)
* Streaming + Suspense support

### Key primitives

* `generateStaticParams` → replaces `getStaticPaths`
* `revalidate` → replaces ISR
* `generateMetadata` → replaces `<Head>`
* `notFound()` / `redirect()` → server navigation control

### How rendering works

* Server renders components directly
* Client receives streamed React payload (not JSON page blobs)
* Data + UI composition happen together

### Strengths

* More flexible architecture
* Better performance (streaming, partial rendering)
* Unified data + UI model
* Nested layouts without duplication

### Tradeoffs

* More conceptual complexity
* Caching model takes time to learn
* Some ecosystem friction (older libs assume Pages Router)

---

## Key Differences (Quick Map)

| Concept        | Pages Router          | App Router                         |
| -------------- | --------------------- | ---------------------------------- |
| Routing        | `/pages`              | `/app`                             |
| Data fetching  | special functions     | `fetch()` + server components      |
| API layer      | `/api`                | route handlers                     |
| Layouts        | `_app`, `_document`   | nested `layout.tsx`                |
| SSR            | `getServerSideProps`  | `fetch(cache: no-store)`           |
| SSG            | `getStaticProps`      | default server rendering + caching |
| ISR            | `revalidate` in props | `export const revalidate`          |
| Dynamic routes | `getStaticPaths`      | `generateStaticParams`             |

---

## Mental Shift

### Pages Router thinking:

> “How do I fetch data for this page?”

### App Router thinking:

> “Where should this code run: server, client, or both?”

---

## Rule of Thumb

* Use **App Router** for new projects
* Keep **Pages Router** only for legacy compatibility or incremental migration
