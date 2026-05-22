'use client';

import { Framework } from '../lib/types';

const frameworks: Framework[] = ['react', 'next', 'react-native', 'flutter'];

export function BootSelectPage({ onSelect, loading }: { onSelect: (fw: Framework) => void; loading: boolean }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-xl font-semibold">{loading ? 'Booting environment...' : 'Select Framework'}</h1>

        <div className="flex gap-4">
          {frameworks.map((fw) => (
            <button
              key={fw}
              onClick={() => onSelect(fw)}
              disabled={loading}
              className="
                px-6 py-3 rounded border border-white/20
                hover:bg-white/10 transition
                disabled:opacity-50
              "
            >
              {fw.toUpperCase()}
            </button>
          ))}
        </div>

        <p className="text-xs text-white/40">This will initialize VFS + module graph + runtime</p>
      </div>
    </div>
  );
}
