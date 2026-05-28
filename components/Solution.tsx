'use client';
import { useState } from 'react';

import { BaseEditor } from '@/components/BaseEditor';

export function Solution({ solution }) {
  const [expanded, setExpanded] = useState(false);

  const copyToClipboard = async (code) => {
    await navigator.clipboard.writeText(code ?? '');
  };

  function normalizeCode(solution) {
    return solution.code.replace(/^(\s+)/gm, (match) => {
      const spaces = match.length;
      const newSpaces = ' '.repeat(spaces / 2);
      return newSpaces;
    });
  }

  const val = typeof solution.code === 'string' ? normalizeCode(solution) : '';

  return (
    <div className="w-full relative bg-high border border-outline-variant/30 overflow-visible flex flex-col gap-2 p-3">
      <div>
        <h3 className="text-sm font-semibold text-on-surface-variant">{solution.title}</h3>
        {solution.body && <p className="text-xs text-on-surface-variant/80 mt-1">{solution.body}</p>}
      </div>
      <div className="relative group border border-outline-variant/20 overflow-visible bg-surface/50">
        <div className="absolute top-2 right-2 z-30 flex gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
          <button
            onClick={() => copyToClipboard(val)}
            className="icon-button bg-level/90 p-1.5 shadow-sm hover:bg-level backdrop-blur-md text-xs"
            title="Copy code"
          >
            📋
          </button>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="icon-button bg-level/90 p-1.5 shadow-sm hover:bg-level backdrop-blur-md text-xs"
            title="Toggle height"
          >
            {expanded ? '▢' : '▣'}
          </button>
        </div>

        <div className="w-full relative overflow-visible">
          <BaseEditor
            mode="python"
            value={val}
            expanded={expanded}
            autoHeight={true}
            showPrintMargin={false}
            highlightActiveLine={true}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* ================= FOOTER META ================= */}
      {(solution.bigOTime || solution.bigOSpace) && (
        <div className="flex gap-4 pt-2 text-xs text-on-surface-variant/70 border-t border-outline-variant/20 mt-1">
          {solution.bigOTime && (
            <span>
              Time: <b className="font-mono text-on-surface">{solution.bigOTime}</b>
            </span>
          )}
          {solution.bigOSpace && (
            <span>
              Space: <b className="font-mono text-on-surface">{solution.bigOSpace}</b>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
