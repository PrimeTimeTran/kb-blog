'use client';
import Prism from 'prismjs';
import React from 'react';

import { LANG_MAP } from '@/data/constants';

export function Pre(props) {
  const { code, children, codemeta } = props;

  // 1. CRITICAL GUARD: If children is already a React element structure
  // (like a nested div or another component generated downstream),
  // just pass it through directly to avoid processing it twice.
  if (React.isValidElement(children) && children.type !== 'code') {
    return <>{children}</>;
  }
  // ---- 1. Meta Parsing (Maintained Exactly) ----
  const meta =
    codemeta || children?.props?.codemeta ? JSON.parse(codemeta || children?.props?.codemeta || '{}') : props;

  const { lang, showLineNumbers, fileName: title, highlight = [] } = meta;

  // ---- 2. Code Extraction & Prism Highlight ----
  const rawCode = (code ?? extractText(children)).trim();
  const resolvedLang = LANG_MAP[lang] || lang || 'text';
  const grammar = Prism.languages[resolvedLang];

  // Run Prism highlighting
  const html = grammar ? Prism.highlight(rawCode, grammar, resolvedLang) : rawCode;

  // Split the highlighted HTML string safely into lines
  const lines = html.split(/\r?\n/);

  const highlightSet = new Set(highlight);
  const hasHighlights = highlightSet.size > 0;

  return (
    <div className="not-prose overflow-hidden bg-slate-50 dark:bg-[#0d1117] text-slate-200">
      {title && (
        <div className="w-full px-4 py-2 font-mono text-xs text-slate-400 border-l-2 border-blue-500 bg-blue-500/10">
          {title}
        </div>
      )}

      <pre className="m-0! overflow-x-auto bg-slate-100 py-2 font-mono text-sm leading-relaxed dark:bg-slate-950">
        <code className="block min-w-full">
          {(lines ?? []).map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = hasHighlights && highlightSet.has(lineNumber);

            const bgClass = isHighlighted ? 'bg-green-500/10 border-l-green-400' : 'border-l-transparent';

            return (
              <div key={index} className={`flex px-4 border-l-4 ${bgClass}`}>
                {showLineNumbers && (
                  <span className="mr-4 w-8 shrink-0 text-right opacity-20 select-none font-mono">{lineNumber}</span>
                )}
                {/* 
                  Instead of wrapping the entire block in one innerHTML container,
                  we pass the safely isolated HTML string per-line to React. 
                  This stops string truncation bugs dead in their tracks.
                */}
                <span className="flex-1 whitespace-pre" dangerouslySetInnerHTML={{ __html: line || ' ' }} />
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

// Fallback helper in case it isn't defined in your scope
function extractText(children) {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children.props?.children) return extractText(children.props.children);
  return '';
}
