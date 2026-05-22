'use client';

import { CounterControls } from '@/app/shell/CounterControls';
import { useShellCounter } from '@/app/shell/useShellCounter';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

export default function Page() {
  const counter = useShellCounter();
  const segment = useSelectedLayoutSegment('left');
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-surface h-full p-2">
      <h1 className="font-bold text-2xl text-indigo-600-600">{FILE_PATH}</h1>
      <div>
        <h1 className="text-xl font-bold text-emerald-400">Static State across page renders</h1>
        <CounterControls {...counter} />
      </div>
      {pathname}
      {segment}
    </div>
  );
}

export const FILE_PATH = 'app/@right/default.tsx';
