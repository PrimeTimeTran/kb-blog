// NOTE:
// This component exists as the client-side counterpart to the root layout system.
//
// It is responsible for rendering the *interactive portion* of the layout tree,
// specifically elements that cannot live in a Server Component due to:
// - stateful UI (resizing, collapse state, interaction)
// - DOM event handling (mouse drag, resize gestures)
// - hydration-bound behavior (Next.js client-side interactivity requirements)
//
// The reason this exists as a separate "LayoutClient" instead of being embedded directly
// in the route page or server layout is due to Next.js App Router constraints:
//
// 1. Server/Client boundary separation:
//    - Layout.tsx must remain a Server Component to support async data fetching (getKbTree)
//    - This file must be a Client Component to enable interactivity (resizing, UI state)
//
// 2. Shared structural consistency across routes:
//    - The left sidebar (SidebarTree) is shared across many pages
//    - Keeping it here ensures consistent layout structure across navigation without refetching per page
//
// 3. Layout composition vs content composition:
//    - This file defines the *persistent application shell structure*
//    - Children represent route-owned content injected via Next.js routing
//
// 4. Performance consideration:
//    - Layout state (column resizing, sidebar structure) is decoupled from page content
//    - Prevents unnecessary re-renders or refetching when navigating between pages
//
// In short:
// This is not a "page layout" in the traditional sense, but a persistent interactive shell layer
// that sits between server-rendered layout data and route-specific content.
'use client'

import SidebarTree from './SidebarTree'
import { ResizableColumn } from './ResizableColumn'

export default function LayoutClient({ data, children }) {
  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden">
      {/* LEFT */}
      <ResizableColumn side="left">
        <SidebarTree data={data} />
      </ResizableColumn>

      <div className="flex-1 min-w-0 min-h-0 overflow-y-auto p-3">{children}</div>
    </div>
  )
}
