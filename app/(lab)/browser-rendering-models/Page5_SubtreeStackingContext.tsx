import { List, ContextLabel } from './ContextLabel'

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

export function Page5_SubtreeStackingContext() {
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
