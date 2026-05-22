'use client';

import { CounterControls } from '@/app/shell/CounterControls';
import { useShellCounter } from '@/app/shell/useShellCounter';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
export const FILE_PATH = 'app/(lab)/slots/@right/page.tsx';

export default function Page() {
  const pathname = usePathname();
  const counter = useShellCounter();
  const segment = useSelectedLayoutSegment('left');
  return (
    <div className="flex flex-col p-2 h-full bg-indigo-500">
      <h1 className="text-2xl font-bold text-on-surface">{FILE_PATH}</h1>
      {pathname}
      <CounterControls {...counter} />
      {segment}
    </div>
  );
}
