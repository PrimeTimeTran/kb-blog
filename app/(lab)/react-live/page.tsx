// https://nearform.com/open-source/react-live/docs/api/
// https://github.com/react-simple-code-editor/react-simple-code-editor

'use client';
import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';

import { buildRegistry } from '@/lib/buildScope';
import { BaseEditor } from '@/components/BaseEditor';
import { useLiveEditor } from '@/hooks/useLiveEditor';
import { ResizableColumn } from '@/components/layout/ResizableColumn';
import { registry } from '../../../registry.generated';

// Write src to string registry so that CJS (Live Editor dep)
// can parse it client side.
// How to "Run module code (import/export + JSX) inside a system that only executes plain strings via eval/new Function on the client"?
// Basically “We intentionally downgrade real TSX modules into raw strings because we don’t have a bundler.”
// - We are not running modules.
// - We are executing compiled strings in a sandboxed JS function environment.
// - Therefore all module syntax must be removed and replaced with scope injection.
// $ node scripts/buildRegistry.js

// export default Page1_SharedStackingContext
// export default Page2_StackingContextIsolation
// export default Page3_NoStackingIsolation
// export default Page4_SiblingStackingCompetition
// export default Page5_SubtreeStackingContext
// export default Page6_OverlapAndZIndexResolution
// export default Page6_ScrollContextAndFixedPositioning

export default function Page() {
  const scope = {
    React,
    useState,
    useEffect,
    ...buildRegistry(registry, React),
  };
  const code2 = registry['Page6_ScrollContextAndFixedPositioning'];
  // The registry works because of this script.
  // $ node scripts/buildRegistry.js
  return <RenderLabShell scope={scope} setupCode={code2} />;
}

export function RenderLabShell({ setupCode, scope = {}, title }: RenderLabShellProps) {
  const { code, onUpdateCode } = useLiveEditor(setupCode);
  return (
    <LiveProvider code={code} scope={scope} noInline>
      <div className="h-screen w-screen flex bg-zinc-950 text-white overflow-hidden not-prose">
        <LeftRail />

        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* <Topbar /> */}

          <div className="p-2 text-xs bg-red-950/20 min-h-[32px] shrink-0">
            <LiveError />
          </div>

          {/* MAIN SPLIT */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* EDITOR SIDE */}
            <div className="w-1/2 min-w-0 h-full border-r border-white/10 overflow-hidden">
              <div className="h-full overflow-auto">
                <BaseEditor value={code} mode="jsx" onChange={onUpdateCode} />
              </div>
            </div>

            {/* PREVIEW SIDE */}
            <div className="w-1/2 min-w-0 min-h-0 overflow-hidden">
              <div className="h-full overflow-auto">
                <div className="relative min-h-full">
                  <LivePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LiveProvider>
  );
}

type RenderLabShellProps = {
  setupCode?: string;
  scope?: Record<string, any>;
  title?: string;
};

function Topbar() {
  return <div></div>;
}
function LeftRail() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`
        relative h-full shrink-0
        border-r border-white/10
        bg-zinc-900/70 backdrop-blur
        transition-all duration-200
        ${expanded ? 'w-[280px]' : 'w-[48px]'}
      `}
    >
      {/* trigger */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="
          h-12 w-12
          flex items-center justify-center
          hover:bg-white/5
          text-white/50 hover:text-white
        "
      >
        ≡
      </button>

      {/* expanded content */}
      {expanded && (
        <div className="absolute inset-0 top-12 overflow-auto">
          <div className="p-3 text-sm text-white/70">future tree view</div>
        </div>
      )}
    </div>
  );
}
