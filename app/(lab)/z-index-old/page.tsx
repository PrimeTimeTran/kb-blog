'use client';

import { useState } from 'react';

export default function LayoutLabPage() {
  const [mode, setMode] = useState(1);

  return (
    <div className="fixed inset-0 bg-zinc-900 text-white">
      {/* CONTROLS */}
      <div className="absolute top-4 left-4 z-[9999] flex gap-2">
        {[1, 2, 3, 4].map((m) => (
          <button key={m} onClick={() => setMode(m)} className="px-2 py-1 bg-white/10 rounded">
            Mode {m}
          </button>
        ))}
      </div>

      {/* SCENARIOS */}
      {mode === 1 && <BrokenScroll1 />}
      {mode === 2 && <FixedScroll1 />}
      {mode === 3 && <BrokenStack2 />}
      {mode === 4 && <FixedStack2 />}
    </div>
  );
}

function BrokenScroll1() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-red-950">
      {/* fake app shell blocking scroll */}
      <div className="fixed inset-0 overflow-hidden">
        {/* scroll attempt */}
        <div className="absolute inset-0 overflow-y-auto">
          <div className="h-[2000px] p-10">
            <h1 className="text-3xl">BROKEN SCROLL</h1>

            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="h-16 border-b border-white/10">
                Item {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FixedScroll1() {
  return (
    <div className="fixed inset-0 bg-green-950">
      {/* ONLY scroll layer */}
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-[2000px] p-10">
          <h1 className="text-3xl mb-4">FIXED SCROLL</h1>

          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="h-16 border-b border-white/10">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrokenStack2() {
  return (
    <div className="fixed inset-0 bg-blue-950 overflow-hidden">
      {/* scroll layer */}
      <div className="absolute inset-0 overflow-y-auto z-0">
        <div className="h-[2000px] p-10 relative">
          <h1 className="text-3xl">BROKEN STACK</h1>

          {/* fake workspace */}
          <div className="relative mt-10 h-40 bg-white/10">
            Workspace
            {/* supposed overlay rail BUT BROKEN */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500 z-0">RAIL (BROKEN)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FixedStack2() {
  return (
    <div className="fixed inset-0 bg-purple-950 overflow-hidden">
      {/* SCROLL CONTENT */}
      <div className="absolute inset-0 overflow-y-auto z-0">
        <div className="h-[2000px] p-10">
          <h1 className="text-3xl">FIXED STACK</h1>

          <div className="mt-10 h-40 bg-white/10">Workspace Area</div>
        </div>
      </div>

      {/* FIXED OVERLAY RAIL */}
      <div className="fixed top-0 right-0 h-full w-40 bg-red-500 z-50">RAIL (FIXED)</div>

      {/* FIXED HUD */}
      <div className="fixed top-4 left-4 z-50 bg-black/60 p-2">HUD</div>
    </div>
  );
}
// I need two of these actually, becausee they're different problems. I just happened to need both of them.
// Give me the same thing, focused on JUST Z Index/Context/etc(whatever is appropriate)
// 1. Give me a root with a working z index stage. 1 Page where a child creates an over lay which covers parent with z index only
// 2. Same root, same page, but a thing which breaks that(or a list of them). When debugging previously uve sai things like "if any parent transforms...?" Something like that
// 3. Fix to this issue, the break caused 2
// 4. Working 2 context z index working. simplest example possible. There should be two seperate pages that can make 2 seperate overlays that dont conflict.
// 5. Break it with whatever we just did...?
