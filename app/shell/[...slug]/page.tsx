'use client';

import { useState } from 'react';
import { use } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CounterControls } from '../CounterControls';

export default function Page({ params }) {
  const useParams = use(params);
  const pathname = usePathname();
  const newPage = crypto.randomUUID();

  const [count, setCount] = useState(0);

  const parts = pathname?.split('/').filter(Boolean) ?? [];
  const result = '/' + parts.slice(1).join('/');

  return (
    <div className="flex flex-col gap-6">
      {/* MAIN CONTENT */}
      <div className="space-y-4">
        <h1 className="text-xl font-medium">
          Page: <span className="font-mono text-base">{pathname}</span>
        </h1>

        {/* LINK CARD */}
        <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 w-fit">
          <span className="text-xs text-gray-500">Next</span>

          <Link
            href={`/shell/${newPage}?prev=${encodeURIComponent(result)}`}
            className="font-mono text-sm underline hover:opacity-70"
          >
            {newPage}
          </Link>
        </div>

        {/* COUNTER (NOW CLEAN) */}
        <CounterControls
          count={count}
          inc={() => setCount((c) => c + 1)}
          dec={() => setCount((c) => c - 1)}
          reset={() => setCount(0)}
        />
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="text-sm text-gray-500 dark:text-gray-400">Dynamic right panel could go here</aside>
    </div>
  );
}
