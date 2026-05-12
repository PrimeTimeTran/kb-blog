import LayoutClient from './LayoutClient'
import { getKbTree } from '../../lib/content/domain/kb/kb.server'

// NOTE:
// This file is named "Layout" because it is the root layout boundary for this route segment,
// but it is not a pure layout in the UI sense.
//
// In a simpler system, layout composition (left/right columns, panes, etc.) would be fully
// declarative and colocated. However, in Next.js App Router, this boundary becomes a hybrid
// of concerns:
//
// - Server-only execution (required for async data fetching)
// - SSR constraints (this must remain a Server Component)
// - Route-level data loading (getKbTree is shared across all nested routes)
// - Layout persistence across navigation (this enables shared KB structure across pages)
//
// We intentionally separate concerns here:
// - This file owns *data + layout boundary initialization*
// - LayoutClient owns *interactive layout behavior (resizing, UI state)*
//
// The reason this exists as a "root layout layer" rather than being pushed down into pages is:
// it allows us to fetch and stabilize shared structural data once per route segment,
// rather than per-page, while still participating in Next.js layout composition.
//
// In effect, this is a hybrid "layout + data boundary" rather than a pure UI layout component.

// import { useRegistry } from '@/providers/RegistryProvider'

export default async function Layout({ children, params }) {
  // Keep this has as an example of props/params/slug from Layout
  // const slugPath = params?.slug?.join('/') ?? null

  const data = await getKbTree()
  return <LayoutClient data={data}>{children}</LayoutClient>
}
