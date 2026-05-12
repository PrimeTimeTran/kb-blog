/* ─────────────────────────────────────────────
   CONTENT API (UNIFIED)
   blog, kb, pages all live here via `type`
───────────────────────────────────────────── */

export { getContent } from './get-content'
export { listContent } from './list-content'

/**
 * Content model:
 * - type: 'blog' | 'kb' | 'page' | etc
 * - slug: unique identifier within type
 *
 * DO NOT create getBlog/getKB wrappers.
 * Those are just filtered content types.
 */

/* ─────────────────────────────────────────────
   OPTIONAL QUERY LAYER (FUTURE)
───────────────────────────────────────────── */

// export { searchContent } from './search-content'

/* ─────────────────────────────────────────────
   GRAPH / RELATION SYSTEM (DERIVED)
   computed from content pipeline
───────────────────────────────────────────── */

// export { getBacklinks } from './backlinks/get-backlinks'
// export { getRelatedContent } from './graph/get-related-content'

/**
 * Notes:
 * - Backlinks are NOT stored content
 * - They are derived from parsing + graph build step
 * - Should be treated as read-only projections
 */

/* ─────────────────────────────────────────────
   BUILD / PIPELINE LAYER (WRITE / DERIVATION)
   used for indexing, caching, generation
───────────────────────────────────────────── */

// export { buildBacklinks } from './build/build-backlinks'
// export { buildTermsRegistry } from './build/build-terms-registry'
// export { buildContentIndex } from './build/build-content-index'

/**
 * Notes:
 * - These functions are NOT runtime queries
 * - They are deterministic rebuild steps
 * - Can be run at build time or background jobs
 */

/* ─────────────────────────────────────────────
   ENTITY SYSTEM (SEPARATE DOMAIN)
───────────────────────────────────────────── */

export { getAuthor } from './get-author'
export { listAuthor } from './list-author'

/**
 * Notes:
 * - Authors are NOT MDX content
 * - Different lifecycle + storage model
 * - May eventually move to DB or CMS
 */

/* ─────────────────────────────────────────────
   DESIGN CONTRACT SUMMARY
─────────────────────────────────────────────

CONTENT LAYER
  getContent()      → single resolved document (compiled)
  listContent()     → lightweight index view (frontmatter only)

GRAPH LAYER
  getBacklinks()    → derived relationships
  getRelatedContent() → graph traversal queries

BUILD LAYER
  buildBacklinks()  → recompute graph
  buildTermsRegistry() → regenerate semantic index
  buildContentIndex() → optimize list queries

ENTITY LAYER
  authors, users, etc → separate domain system

RULES:
- NEVER introduce getBlog/getKB
- ALL content types go through `type`
- GRAPH = derived, not stored truth
- BUILD = offline/async recomputation
*/
