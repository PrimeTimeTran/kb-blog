'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

import { CounterControls } from '@/app/shell/CounterControls';
import { useShellCounter } from '@/app/shell/useShellCounter';

export default function Page() {
  const counter = useShellCounter();
  const segment = useSelectedLayoutSegment('left');
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold text-on-surface">{FILE_PATH}</h1>
      {pathname}
      {segment}
      <CounterControls {...counter} />
    </div>
  );
}

export const FILE_PATH = 'app/@left/page.tsx';
