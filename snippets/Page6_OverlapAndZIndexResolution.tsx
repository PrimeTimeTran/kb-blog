export function Page6_OverlapAndZIndexResolution() {
  return (
    <div className="relative h-screen w-screen bg-zinc-900 text-white overflow-hidden">
      {/* BASE */}
      <div className="absolute inset-0 bg-blue-900 flex items-center justify-center z-0">BASE LAYER</div>

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
  );
}
