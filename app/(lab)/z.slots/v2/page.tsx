'use client';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// This page is composed by these slots/partials
const dir = `
├── @left
│   └── page.tsx
├── @right
│   └── page.tsx
├── layout.tsx
`;

export default function Page() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-on-surface">{FILE_PATH}</h1>
      <h1 className="text-2xl text-on-surface">{pathname}</h1>
      <PageClient tree={dir} />
    </div>
  );
}

const PageClient = dynamic(() => import('@/components/SlotGuide'), {
  ssr: false,
});

export const FILE_PATH = 'app/(lab)/slots/v2/page.tsx';
