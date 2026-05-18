export function Page6_ScrollContextAndFixedPositioning() {
  const items = Array.from({ length: 50 }, (_, i) => i + 1)
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900 text-white">
      {/* BASE LAYER */}
      <div className="absolute inset-0 bg-blue-900 flex items-center justify-center z-0">
        <div className="text-3xl">BASE LAYER (static)</div>
      </div>

      {/* SCROLLING LAYER */}
      <div className="absolute inset-0 z-10 overflow-y-auto bg-green-900/40">
        <div className="h-[2000px] flex flex-col items-center justify-center gap-10">
          <h1 className="text-4xl font-bold">SCROLLING CONTENT (inside transformed layer)</h1>

          <p className="max-w-md text-center opacity-80">
            This container scrolls independently of the base layer. It establishes its own
            coordinate space for descendants.
          </p>

          {/* FIXED OVERLAY */}
          <div className="fixed inset-0 z-50 bg-red-500/70 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold">FIXED OVERLAY</h2>
              <p className="mt-4 max-w-md">
                This appears on top of the scroll content because stacking context resolution
                happens after layout and scroll containment.
              </p>
            </div>
          </div>

          {/* SCROLL MARKER */}
          <div className="h-[800px] flex items-center justify-center text-2xl">SCROLL ME ↓</div>
        </div>
      </div>
    </div>
  )
}
