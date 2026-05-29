import { ReactNode } from 'react';

export function SectionTitle({ title, preview }: { title: string; preview?: ReactNode }) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 space-y-3">
      {/* Top row: title only */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">{title}</h2>
      </div>

      {/* Bottom row: optional preview / tools */}
      {preview && <div className="flex items-center">{preview}</div>}
    </div>
  );
}

export function Box({ label }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-200 text-sm font-medium dark:bg-zinc-800">
      {label}
    </div>
  );
}
