#

## TOC

- Introduction
  - Goal
  - Plan
  - Architecture
- Live Playground
  - React/MDX
- NextJS
  - App Router
    - pages
    - layout
    - routing
    - slots
- Styling
  - structure
    - files
    - imports
    - precedence
  - CSS directives
    - @layer, @import
  - tailwind.css
    - @theme
    - @apply
    - @reference
  - Scopes
    - @base
    - @components
    - @utilities
    - @layouts
    - @semantics
    - @components
- Remark
  - Preprocessing of MD files
  - Fixing Wikilinks
  - Embedding Obsidian Links
- MDX Pipeline
  - READ:
    - Defines APIs for accessing src files
      - Collection Registry
      - Endpoints:
        - Queries: index, show, meta
        - Filtering
    - Parsing
  - WRITE
    - Generates Graph/Metrics of content
- Workspaces
- Observability
  - Debugging/Tracing/Sorting/Grouping/Inspecting
- Deploying
  - pnpm
  - Vercel

## Goal

Fill the above architecture

- Content
  - I want to be able to add anything to this and it just gets 'filled'
    - Tutorials, snippets, blog posts, etc.
    - I want to not have to think about paths...
      - They change.
      - Sometimes they're too restrictive

- Previews (code snippets)
- Playgrounds (runnable mini apps/projects)
