// https://nearform.com/open-source/react-live/docs/api/
// https://github.com/react-simple-code-editor/react-simple-code-editor

'use client';
import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';

import { Editor } from './Editor';
import { useLiveEditor } from './useLiveEditor';
import { registry } from 'registry.generated';
import { buildRegistry } from '@/lib/buildScope';

import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-monokai';

export default function Exhibit() {
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
              <Editor
                value={code}
                mode="typescript"
                onChange={onUpdateCode}
                setEditorReady={undefined}
                showPrintMargin={undefined}
              />
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
  );
}

type RenderLabShellProps = {
  setupCode?: string;
  scope?: Record<string, any>;
  title?: string;
};
