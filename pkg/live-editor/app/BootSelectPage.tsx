'use client';

import { listSpecs } from '../specs';

export function BootSelectPage({ onSelect, loading }: { onSelect: (key: any) => void; loading: boolean }) {
  const specs = listSpecs();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl font-semibold">Choose Project Spec</h1>

        <div className="flex gap-3">
          {specs.map((key) => (
            <button
              key={key}
              disabled={loading}
              onClick={() => onSelect(key)}
              className="px-4 py-2 border border-white/20 rounded hover:bg-white/10"
            >
              {key}
            </button>
          ))}
        </div>

        {loading && <p className="text-white/50 text-sm">Booting spec...</p>}
      </div>
    </div>
  );
}
