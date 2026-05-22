// This page explores how the browser determines visual layout, positioning, and layering
// within a single document using a set of interacting rendering systems.
//
// Instead of thinking about UI as isolated “building blocks”,
// we model it as overlapping systems that collectively determine the final pixels.
//
// We focus on four core systems:
//
// 1. Layout System (Geometry)
//    → flex, grid, and flow rules that determine box size and placement in normal document flow
//
// 2. Positioning System (Coordinate Resolution)
//    → relative, absolute, fixed, and sticky positioning rules that define how boxes are anchored
//
// 3. Stacking System (Layering)
//    → z-index and stacking contexts that determine visual overlap and paint order
//
// 4. Compositing System (Rendering Output)
//    → how the browser resolves all layers into final pixels on screen

// These examples intentionally isolate and then mutate these rules to show how small CSS changes can redefine the entire rendering behavior of a layout.
// Before reading each example, assume:

// - All elements exist in the same document tree
// - Differences come from rendering rules, not DOM separation
// - “Higher z-index” only matters within the same stacking scope
// - Positioning behavior depends on the nearest relevant ancestor
// - A single CSS property can change the coordinate system of descendants

// - Stacking Context Hierarchy
// - Containing Block Resolution
// - CSS Positioning Reference Model
// - Document Flow Layout Engine
// - Layer Compositing Pipeline
// - Scroll Boundary and Viewport Rebinding
// - Local Rendering Context (Stacking + Containing Block Isolation)
// - DOM-to-Render Tree Transformation

// Absolute and fixed CSS positioning both remove elements from the normal document flow, but
// they differ in what they use as a reference point. Absolute positions relative to the nearest positioned
// ancestor (or the document), while fixed positions relative to the viewport (browser window), staying in place during scrolling.

// 'use client'
// import React from 'react'

// import { Page1_SharedStackingContext } from './Page1_SharedStackingContext'
// import { Page2_StackingContextIsolation } from './Page2_StackingContextIsolation'
// import { Page3_NoStackingIsolation } from './Page3_NoStackingIsolation'
// import { Page4_SiblingStackingCompetition } from './Page4_SiblingStackingCompetition'
// import { Page5_SubtreeStackingContext } from './Page5_SubtreeStackingContext'
// import { Page6_OverlapAndZIndexResolution } from './Page6_OverlapAndZIndexResolution'
// import { Page6_ScrollContextAndFixedPositioning } from './Page6_ScrollContextAndFixedPositioning'

// export {
//   Page1_SharedStackingContext,
//   Page2_StackingContextIsolation,
//   Page3_NoStackingIsolation,
//   Page4_SiblingStackingCompetition,
//   Page5_SubtreeStackingContext,
//   Page6_OverlapAndZIndexResolution,
//   Page6_ScrollContextAndFixedPositioning,
// }

// // export default Page1_SharedStackingContext
// // export default Page2_StackingContextIsolation
// // export default Page3_NoStackingIsolation
// // export default Page4_SiblingStackingCompetition
// // export default Page5_SubtreeStackingContext
// // export default Page6_OverlapAndZIndexResolution
export default function Page() {
  return <div>hi</div>;
}
