'use client';

import dynamic from 'next/dynamic';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

const dir = `
.
├── @left
│   ├── default.tsx
├── @right
│   ├── default.tsx
├── [slug]
│   └── page.tsx
└── layout.tsx
`;

const PageClient = dynamic(() => import('../../PageClient'), {
  ssr: false,
  loading: () => <div className="flex-1 animate-pulse bg-gray-100 dark:bg-gray-800 rounded" />,
});

export default function Page() {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment('left');
  return (
    <div className="flex flex-col p-2">
      <h1 className="text-2xl font-bold text-on-surface">{FILE_PATH}</h1>
      {pathname}
      <PageClient isCatchAll tree={dir} />
      {segment}
    </div>
  );
}

export const FILE_PATH = 'app/(lab)/slots/v1/@left/[...slug]/page.tsx';
