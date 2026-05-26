'use client';

import dynamic from 'next/dynamic';

const ExhibitLayout = dynamic(() => import('@/layouts/ExhibitLayout').then((mod) => ({ default: mod.ExhibitLayout })), {
  ssr: false,
  loading: () => <div className="flex-1 animate-pulse bg-gray-100 dark:bg-gray-800 rounded" />,
});

export default function Layout({ left, right, children }) {
  return (
    // 1. Ignore Slots
    <ExhibitLayout>{children}</ExhibitLayout>

    // // 2. Define Slots
    // <ExhibitLayout left={<div>left</div>} right={<div>right</div>}>
    //   {children}
    // </ExhibitLayout>

    // // 3. Define slots
    // <ExhibitLayout left={left} right={right}>
    //   {children}
    // </ExhibitLayout>
  );
}
