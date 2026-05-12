---
draft: false
slug: kb-introduction
date: '2026-04-30'
title: 'Table of Contents'
summary: 'Table of Contents'
tags: ['KB/MD/Obsidian/Blog']
---

# Knowledge Base

A structured collection of notes covering how this system is built, what problems it solves, and the engineering decisions behind it.

---

## Website (Frontend Foundation)

- HTML — structure of the web
- CSS — layout, styling systems
- JavaScript — runtime behavior
- React — component architecture
- Next.js — routing, rendering, server/client boundaries
- Tailwind — utility-first styling

---

## Content System (MD / MDX / Pipeline)

- Markdown — base content format
- MDX — component-driven content
- Pipeline — parsing, transforming, compiling content
- Wiki Links — `[[obsidian-style]] linking system`
- Embeds — cross-document composition

---

## Infrastructure / Tooling

- PNPM — package management strategy
- Git — versioning and workflow

---

## Meta (System Design Thoughts)

- Architecture decisions
- Tradeoffs
- Failures & fixes
- “Why it is this complicated”

---

## Blog / Writing

- Long-form posts
- Public-facing explanations
- System walkthroughs

---

# 💡 Important shift in framing

Right now your instinct is:

> “I need a correct structure”

But for this page specifically, it should be:

> “I need a readable story of the system”

Those are different.

---

# 🧠 About your “all the headaches” idea

That’s actually the strongest part of this page.

It should not be hidden in technical sections — it should be its own narrative layer:

---

## Why this system exists

- fixing MDX compilation edge cases
- building a deterministic content graph
- replacing ad-hoc linking with structured wiki resolution
- handling filesystem vs URL mismatch problems
- unifying blog + KB into one pipeline

---

That becomes your _hook section_ before the TOC.

---

# 🚫 What I would avoid

- numbering prefixes like `1.7 MDX`
- deep indentation in the landing page
- encoding structure too early
- exposing filesystem paths

Those belong in:

- sidebar tree
- index builder
- dev tooling

not the first page.

---
