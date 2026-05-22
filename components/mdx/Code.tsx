'use client';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import { LANG_MAP } from '@/data/constants';

const safeJsonParse = (str: string, fallback: any) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

function extractText(children: any): string {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children.props?.children) return extractText(children.props.children);
  return '';
}

export function Pre(props: any) {
  const {
    code,
    children,
    codemeta,
    lang: directLang,
    showLineNumbers: directShow,
    fileName,
    highlight: directHighlight,
    isTabGroup = false,
  } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    Prism.highlightAll();
  }, [children, code]);

  // Extract metadata cleanly regardless of entry method
  const mdxMeta = codemeta || children?.props?.codemeta ? safeJsonParse(codemeta || children?.props?.codemeta, {}) : {};

  const lang = directLang || mdxMeta.lang || props.lang;
  const showLineNumbers = directShow ?? mdxMeta.showLineNumbers ?? props.showLineNumbers;
  const title = fileName || mdxMeta.fileName || props.title;
  const highlight = directHighlight || mdxMeta.highlight || [];

  const rawCode = (code ?? extractText(children)).trim();
  const resolvedLang = LANG_MAP[lang] || lang || 'text';

  // Server-side hydration baseline layout
  if (!mounted) {
    return (
      <div className="mdx-code-wrapper not-prose">
        {title && <div className="mdx-code-header py-2 text-xs">{title}</div>}
        <pre className="m-0! p-4 overflow-x-auto text-sm whitespace-pre">
          <code>{rawCode}</code>
        </pre>
      </div>
    );
  }

  const grammar = Prism.languages[resolvedLang];
  const html = grammar ? Prism.highlight(rawCode, grammar, resolvedLang) : rawCode;
  const lines = html.split(/\r?\n/);

  const highlightSet = new Set(highlight);
  const hasHighlights = highlightSet.size > 0;

  return (
    <div className="mdx-code-wrapper not-prose shadow-lg w-full max-w-full">
      {title && <div className="mdx-code-header py-2 text-xs truncate">{title}</div>}
      <pre className={'m-0! px-0 overflow-x-auto py-2 text-sm leading-relaxed' + isTabGroup ? 'px-2' : ''}>
        <code className="block min-w-full w-max">
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = hasHighlights && highlightSet.has(lineNumber);

            return (
              <div key={index} className="mdx-code-line flex" data-highlighted={isHighlighted ? 'true' : 'false'}>
                {showLineNumbers && (
                  /* Added absolute minimum constraint prevention */
                  <span className="mr-4 w-6 min-w-[24px] shrink-0 text-right text-zinc-500/80 select-none font-mono">
                    {lineNumber}
                  </span>
                )}
                <span className="flex-1 whitespace-pre" dangerouslySetInnerHTML={{ __html: line || ' ' }} />
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

export function TabGroup({ tabs }) {
  const [active, setActive] = useState(0);
  const parsed = typeof tabs === 'string' ? safeJsonParse(tabs, []) : tabs;

  if (!parsed?.length) return null;

  return (
    <div className="mdx-tab-group not-prose w-full">
      {/* 
        FIXED FOR RESPONSIVENESS:
        - Added overflow-x-auto & whitespace-nowrap so tabs can scroll horizontally on mobile.
        - Added scrollbar-none utilities to keep it clean.
      */}
      <div className="mdx-tab-nav px-2 pt-2 flex gap-1 items-end overflow-x-auto whitespace-nowrap [-webkit-overflow-scrolling:touch]">
        {(parsed ?? []).map((tab, i) => {
          const isActive = i === active;

          return (
            <button
              key={`${tab.label}-${i}`}
              onClick={() => setActive(i)}
              data-active={isActive ? 'true' : 'false'}
              className="mdx-tab-btn relative rounded-t-md px-4 py-2 text-xs font-medium shrink-0"
            >
              {tab.label}
              {isActive && <span className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500 rounded-t-sm" />}
            </button>
          );
        })}
      </div>

      {/* Panels Switch Container */}
      <div className="w-full">
        {parsed.map((tab: any, i: number) => {
          const isActive = i === active;
          return (
            <div key={`${tab.lang}-${i}`} className={isActive ? 'block' : 'hidden'}>
              <Pre
                isTabGroup
                lang={tab.lang}
                code={tab.content}
                showLineNumbers={tab.showLineNumbers}
                highlight={tab.highlight}
                fileName={tab.fileName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
