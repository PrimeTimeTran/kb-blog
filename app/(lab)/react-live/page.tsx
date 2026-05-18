// https://nearform.com/open-source/react-live/docs/api/
// https://github.com/react-simple-code-editor/react-simple-code-editor

'use client'
import React, { useState, useEffect } from 'react'
import { LiveProvider, LiveError, LivePreview } from 'react-live'

import { buildRegistry } from '@/lib/buildScope'
import { BaseEditor } from '@/components/BaseEditor'
import { useLiveEditor } from '@/hooks/useLiveEditor'
import { ResizableColumn } from '@/components/layout/ResizableColumn'
import { registry } from '../../../registry.generated'

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
  }
  const code2 = registry['Page6_ScrollContextAndFixedPositioning']
  // The registry works because of this script.
  // $ node scripts/buildRegistry.js
  return <RenderLabShell scope={scope} setupCode={code2} />
}

export function RenderLabShell({ setupCode, scope = {}, title }: RenderLabShellProps) {
  const { code, onUpdateCode } = useLiveEditor(setupCode)
  return (
    <LiveProvider code={code} scope={scope} noInline>
      <div className="h-screen w-screen flex flex-col bg-zinc-950 text-white overflow-hidden">
        <div className="h-12 flex items-center justify-between px-4 border-b border-white/10">
          <div className="text-sm text-white/70">{title ?? 'RenderLab'}</div>
          <div className="text-xs text-white/40">editor ↔ preview sandbox</div>
        </div>
        <div className="p-2 text-xs text-red-400 bg-red-950/20 min-h-[32px]">
          <LiveError />
        </div>
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <div className="flex min-w-0 h-full border-r border-white/10 overflow-hidden">
              <ResizableColumn side="left">
                <BaseEditor value={code} mode="typescript" onChange={onUpdateCode} />
              </ResizableColumn>
            </div>
            <div
              id="LiveEditorPreview"
              className="relative flex-1 min-w-0 overflow-hidden isolate overflow-y-auto no-scrollbar"
            >
              <div className="absolute inset-0 overflow-auto">
                <LivePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LiveProvider>
  )
}

type RenderLabShellProps = {
  setupCode?: string
  scope?: Record<string, any>
  title?: string
}
