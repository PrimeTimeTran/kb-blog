import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { createPortal } from 'react-dom';

function ToastViewport({ children }) {
  if (typeof window === 'undefined') return null;

  return createPortal(<div className="fixed bottom-6 right-6 z-[9999]">{children}</div>, document.body);
}

const TOKENS = [
  // Core
  ['bg-background', 'text-on-background'],
  ['bg-surface', 'text-on-surface'],
  ['bg-surface-dim', 'text-on-surface'],
  ['bg-surface-bright', 'text-on-surface'],

  // Surface Containers
  ['bg-lowest', 'text-on-surface'],
  ['bg-low', 'text-on-surface'],
  ['bg-level', 'text-on-surface'],
  ['bg-high', 'text-on-surface'],
  ['bg-highest', 'text-on-surface'],

  // Primary
  ['bg-primary', 'text-on-primary'],
  ['bg-primary-container', 'text-on-primary-container'],

  // Secondary
  ['bg-secondary', 'tex-on-secondary'],
  ['bg-secondary-container', 'tex-on-secondary'],

  // Tertiary
  ['bg-tertiary', 'text-on-tertiary'],
  ['bg-tertiary-container', 'text-on-tertiary-container'],

  // Error
  ['bg-error', 'text-on-error'],
  ['bg-error-container', 'text-on-error-container'],

  // Fixed
  ['bg-primary', 'text-on-primary'],
  ['bg-primary-dim', 'text-on-primary'],
  ['bg-secondary', 'tex-on-secondary'],
  ['bg-secondary-dim', 'tex-on-secondary'],
  ['bg-tertiary', 'text-on-tertiary'],
  ['bg-tertiary-dim', 'text-on-tertiary'],

  // Inverse
  ['bg-inverse-surface', 'text-inverse-on-surface'],
  ['bg-inverse-primary', 'text-on-primary'],
];

function Toast({ copied }: { copied: string | null }) {
  return (
    <div
      className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-200 ${
        copied ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-outline/20 bg-high px-4 py-3 shadow-2xl backdrop-blur-xl">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary">
          <Check className="h-4 w-4" />
        </div>

        <div>
          <div className="text-sm font-bold">Copied Token Pair</div>
          <div className="text-xs text-on-surface-variant">{copied}</div>
        </div>
      </div>
    </div>
  );
}

function TokenTile({ bg, fg, onCopy }: { bg: string; fg: string; onCopy: (value: string) => void }) {
  const value = `${bg} ${fg}`;

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        onCopy(value);
      }}
      className={`group relative overflow-hidden rounded-2xl border border-outline/10 transition duration-150 hover:z-10 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99] ${bg} ${fg}`}
    >
      <div className="flex h-full min-h-[112px] flex-col justify-between p-3 text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">Token</div>

            <div className="mt-1 line-clamp-2 text-sm font-black leading-tight">{bg.replace('bg-', '')}</div>
          </div>

          <div className="rounded-lg bg-black/10 p-1.5 opacity-0 transition group-hover:opacity-100">
            <Copy className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs opacity-90">Aa Semantic UI</div>

          <div className="truncate text-[10px] opacity-70">{fg}</div>
        </div>
      </div>
    </button>
  );
}

export default function MaterialColorPalette() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string) => {
    setCopied(value);

    setTimeout(() => {
      setCopied(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-outline/10 bg-background/80 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6">
          <div>
            <h1 className="text-xl font-black tracking-tight">Omni Material Tokens</h1>
            <p className="text-xs text-on-surface-variant">Click any token tile to copy semantic pair.</p>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-outline/20 bg-level px-3 py-2 text-xs text-on-surface-variant md:flex">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Compact semantic token explorer
          </div>
        </div>
      </header>

      {/* GRID */}
      <main className="mx-auto max-w-[1800px] p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {TOKENS.map(([bg, fg]) => (
            <TokenTile key={bg} bg={bg} fg={fg} onCopy={handleCopy} />
          ))}
        </div>
      </main>
      <ToastViewport>
        <Toast copied={copied} />
      </ToastViewport>
    </div>
  );
}
