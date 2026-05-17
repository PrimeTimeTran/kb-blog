'use client'

// Absolute and fixed CSS positioning both remove elements from the normal document flow, but
// they differ in what they use as a reference point. Absolute positions relative to the nearest positioned
// ancestor (or the document), while fixed positions relative to the viewport (browser window), staying in place during scrolling.

export default Page5_OverlapReality

// 1. Page1 — Working Z-Index (baseline correctness)
// ✔ simplest possible stacking model
// ✔ no stacking context traps
// ✔ fixed overlay correctly covers everything
export function Page1_WorkingZIndex() {
  const baseLayerQuestions = [
    "If base layer's z-index was z-20, what would you see?",
    "If overlay A's z-index became -z-10, what would you see?",
    'What creates the vertical blue column on the left?',
  ]

  return (
    <div className="relative h-screen w-screen bg-surface">
      <div className="fixed right-3 top-16 text-5xl">Food for thought...</div>
      {/* BASE */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-blue-900 text-on-surface">
        <h1 className="text-5xl font-bold">BASE LAYER</h1>

        <ul className="mt-6 max-w-xl list-disc space-y-2 pl-6 text-left text-lg">
          {baseLayerQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>

      {/* OVERLAY A (works) */}
      <div className="fixed inset-0 z-10 left-12 flex items-center justify-center bg-red-500/60 font-bold">
        Red overlay because shared context boils down to z-index (-z-10 vs z-0)
      </div>
      <div className="fixed left-3 bottom-5 text-5xl">Food for thought...</div>
    </div>
  )
}
// 2. Page2 — Broken Context (stacking context trap)
// ✔ introduces transform → creates stacking context
// ✔ overlay “stops behaving globally”
export function Page2_BrokenContext() {
  const questions = [
    'Does z-index compare globally or only inside the same stacking context?',
    'What created the new stacking context here?',
    'If RED becomes z-9999, can it escape GREEN?',
    'If BLUE had z-50 at the root, would it beat RED?',
    'Would removing transform change the result?',
    'Does render order matter when z-index is equal?',
    'Which element is RED actually competing against?',
  ]

  function renderOverlay() {
    // NEW STACKING CONTEXT
    return (
      <div className="relative h-full transform scale-100 bg-green-900/50 left-12">
        {/* GREEN CONTEXT LABEL */}
        <div className="absolute inset-0  flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">GREEN CONTEXT (created by transform)</h1>

          <p className="mt-4 text-lg opacity-80">RED now competes INSIDE this context only</p>
        </div>

        {/* RED OVERLAY */}
        <div className="fixed inset-0 z-10 left-24 flex items-center justify-center bg-red-500/70 text-2xl font-bold">
          RED OVERLAY (z-10 inside GREEN context)
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      <div className="fixed right-3 top-16 text-5xl">Food for thought...</div>
      {/* ROOT CONTEXT */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-blue-900 text-on-surface">
        <h1 className="text-5xl font-bold">ROOT CONTEXT (BLUE)</h1>

        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-6 text-left text-lg">
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>
      {renderOverlay()}
      <div className="fixed left-3 bottom-5 text-5xl">Food for thought...</div>
    </div>
  )
}
// 3. Page3 — Fix (remove containment trap)
// ✔ moves overlay OUTSIDE stacking context
// ✔ restores global layering model
// 3. Page3 — Fix (remove containment trap)
// ✔ overlay moved OUTSIDE stacking context
// ✔ returns to root/global stacking behavior
// ✔ visually mirrors Page1 + Page2 for comparison
export function Page3_Fix() {
  const questions = [
    'What changed compared to Page2?',
    'Which element owns the stacking context now?',
    'Why can RED cover everything again?',
    'Does RED now compete directly with BLUE?',
    'Would z-9999 now behave globally?',
    'What happens if GREEN gets transform again?',
    'Which layer now controls the final paint order?',
  ]

  function renderContent() {
    return (
      <>
        {/* GREEN VISUAL COLUMN (NOT a stacking trap anymore) */}
        <div className="relative h-full bg-green-900/50 left-12">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">GREEN VISUAL LAYER</h1>

            <p className="mt-4 text-lg opacity-80">No transform → no isolated stacking context</p>
          </div>
        </div>

        {/* RED OVERLAY (NOW GLOBAL AGAIN) */}
        <div className="fixed inset-0 z-10 left-24 flex items-center justify-center bg-red-500/70 text-2xl font-bold">
          RED OVERLAY (global again)
        </div>
      </>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      {/* CORNER NOTES */}
      <div className="fixed right-3 top-16 text-5xl">Food for thought...</div>

      {/* ROOT CONTEXT */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-blue-900 text-on-surface">
        <h1 className="text-5xl font-bold">ROOT CONTEXT (BLUE)</h1>

        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-6 text-left text-lg">
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>

      {renderContent()}
      <div className="fixed left-3 bottom-5 text-5xl">Food for thought...</div>
    </div>
  )
}
// 4. Page4 — Multi Context Working (two overlays coexist correctly)
// - ✔ demonstrates multiple overlays
// - ✔ both overlap in same visual space
// - ✔ controlled z-index layering
// - ✔ slight offset so you can SEE stacking order

// 4. Page4 — Same Context, Sibling Competition
// ✔ BOTH overlays exist in the SAME root stacking context
// ✔ z-index directly compares because they are siblings
// ✔ render order matters when z-index is equal
// ✔ easiest mental model for normal layering

export function Page4_SameContextChainSibling() {
  const questions = [
    'Why does GREEN appear above RED here?',
    'Are RED and GREEN competing inside the same stacking context?',
    'What happens if both use z-10?',
    'If both overlays had NO z-index, who paints last?',
    'Does DOM/render order matter when z-index ties?',
    'What happens if GREEN becomes z-0?',
    'What happens if RED becomes z-9999?',
    'Which element actually owns the stacking context?',
    'Would adding transform to RED isolate its children?',
  ]

  function renderOverlays() {
    return (
      <>
        {/* RED OVERLAY */}
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative top-24 right-24 w-full h-full p-24 bg-red-500/50 shadow-2xl pointer-events-auto">
            <div className="absolute top-2 left-2 text-xs opacity-80">RED OVERLAY (z-10)</div>
            <div className="flex h-full items-center justify-center text-xl font-bold text-red-400">
              RED
            </div>
          </div>
        </div>
        {/* GREEN OVERLAY */}
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative bottom-12 left-24 h-screen w-screen bg-green-500/50 text-green-400 shadow-2xl pointer-events-auto">
            <div className="absolute top-2 left-2 text-xs opacity-80">GREEN OVERLAY (z-50)</div>

            <div className="flex h-full items-center justify-center text-xl font-bold">GREEN</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      {/* CORNER NOTES */}
      <div className="fixed left-3 top-16 text-2xl">"Page 4" has a few overlays.</div>
      <div className="fixed right-3 top-16 text-5xl">Food for thought...</div>
      {/* ROOT CONTEXT */}
      <div className="absolute inset-0 z-0 right-12 flex flex-col items-center justify-center bg-blue-900 text-on-surface">
        <h1 className="text-5xl font-bold">ROOT CONTEXT (BLUE)</h1>
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-6 text-left text-lg">
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>
      {renderOverlays()}
      <div className="fixed left-3 bottom-5 text-2xl">
        "Red" didn't offset from bottom or left this time so I'm "completely covered" (Opacity is a
        thing!) until I reach the end where reds right offset does what to me?
      </div>
    </div>
  )
}

function NestedOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-screen">
      {/* 
        IMPORTANT RULE:

        This element is INSIDE the stacking context created by:
        "fixed inset-0 z-10" (red container)

        So:
        - z-index here does NOT compare with BASE or other root layers
        - it ONLY compares with siblings inside THIS red container
      */}
      <div className="bg-green-500 text-black px-4 py-2 shadow-xl pointer-events-auto -z-10 w-screen">
        Nested Overlay B (inside red context)
      </div>
    </div>
  )
}

export function Page5_SameContextChainNested() {
  return (
    <div className="relative h-screen w-screen bg-zinc-900 text-white overflow-hidden">
      {/* BASE LAYER (root stacking context) */}
      <div className="absolute inset-0 bg-blue-900 flex items-center justify-center z-0 right-12">
        BASE LAYER
      </div>

      {/* 
        RED OVERLAY CONTEXT:

        - fixed → positions relative to viewport
        - z-10 → creates a stacking context
        - ALL children are now confined to this context

        KEY IDEA:
        This is now a "mini world" that cannot be escaped by child z-index
      */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="bg-red-500 text-white px-6 py-6 w-72 h-44 shadow-2xl pointer-events-auto relative">
          {/* label (visual anchor) */}
          <div className="absolute top-2 left-2 text-xs opacity-80">
            OVERLAY A (creates stacking context: z-10)
          </div>

          {/* center content */}
          <div className="flex items-center justify-center h-full text-sm">
            Parent Overlay (red context)
          </div>

          {/* nested content (still INSIDE red stacking context) */}
          <NestedOverlay />
        </div>
      </div>
    </div>
  )
}

export function Page5_OverlapReality() {
  return (
    <div className="relative h-screen w-screen bg-zinc-900 text-white overflow-hidden">
      {/* BASE */}
      <div className="absolute inset-0 bg-blue-900 flex items-center justify-center z-0">
        BASE LAYER
      </div>

      {/* RED CONTEXT */}
      <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="relative bg-red-500 shadow-2xl pointer-events-auto">
          {/* label */}
          <div className="w-256 h-128 flex justify-center items-center flex-col">
            <h1 className="text-5xl font-bold">RED</h1>
            <div>- Context</div>
            <div>- Anchor</div>
          </div>

          {/* Top Left */}
          <div className="absolute left-0 top-0 bg-yellow-500">
            GREEN Child 1<div>z-0 in red's context</div>
            <div>- Absolutely position relative to anchor</div>
            <div>- My children render themselves relative to me.</div>
            <div></div>
            <div className="absolute top-0 right-0 bg-green-300 h-screen w-12 -z-1">
              Grandchild 1 of Red(although green =))
              <div>I can go below red actually, with -z-1</div>
            </div>
          </div>
          {/* Top Right */}
          <div className="absolute right-[-40px] top-5 bg-yellow-500">
            GREEN Child 2<div>z-0 in red's context</div>
            <div className="absolute top-0 right-0 bg-green-300 h-screen w-24 -z-999">
              Grandchild 1 of Red(although green =))
              <div>I can go below red actually, with -z-1</div>
              <div>But -z-999 doesn't take me any further.</div>
            </div>
          </div>

          <div className="absolute left-0 bottom-0 bg-yellow-500">Child 3</div>
          <div className="absolute right-0 bottom-0 bg-yellow-500">Child 4</div>
        </div>
      </div>

      {/* BLUE CROSS-CONTEXT OVERLAY (z-20 root context) */}
      <div className="fixed inset-0 z-20 flex items-center pointer-events-none">
        {/* horizontal “slice” through the entire screen */}
        <div className="w-full h-1 bg-blue-400 shadow-xl" />

        {/* label anchored to the line so you see it is global */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-blue-500 px-3 py-1 shadow-xl text-xs">
          BLUE (z-20 root context)
        </div>
      </div>
    </div>
  )
}

// This simulates what actually broke your workspace:
// - overlay INSIDE transformed container
// - scroll container + fixed mixing
// - stacking context isolation
export function Page5_BrokenRealWorld() {
  return (
    <div className="relative h-screen w-screen bg-zinc-900 text-white overflow-hidden">
      {/* BASE */}
      <div className="absolute inset-0 bg-blue-900 flex items-center justify-center z-0">
        BASE LAYER
      </div>

      {/* SCROLL CONTAINER (CREATES NEW CONTEXT) */}
      <div className="absolute inset-0 overflow-y-auto z-10 transform">
        <div className="h-[2000px] bg-blue-900/50 flex items-center justify-center">
          SCROLL CONTENT
          {/* ❌ OVERLAY INSIDE CONTEXT */}
          <div className="fixed inset-0 z-50 bg-red-500/70 flex items-center justify-center">
            OVERLAY (BROKEN AGAIN)
          </div>
        </div>
      </div>
    </div>
  )
}
