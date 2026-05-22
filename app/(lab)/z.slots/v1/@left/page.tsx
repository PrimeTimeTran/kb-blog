'use client';

import { CounterControls } from '@/app/shell/CounterControls';
import { useShellCounter } from '@/app/shell/useShellCounter';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

export default function Page() {
  const counter = useShellCounter();
  const segment = useSelectedLayoutSegment('left');
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-lime-400 h-full">
      <h1 className="text-2xl font-bold text-on-surface">{FILE_PATH}</h1>
      {pathname}
      {segment}
      <CounterControls {...counter} />
    </div>
  );
}

export const FILE_PATH = 'app/(lab)/slots/v1/@left/page.tsx';
