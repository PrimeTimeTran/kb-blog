'use client';

import dynamic from 'next/dynamic';

const ThreeColLayout = dynamic(
  () => import('@/layouts/ThreeColumnLayout').then((mod) => ({ default: mod.ThreeColLayout })),
  {
    ssr: false,
    loading: () => <div className="flex-1 animate-pulse bg-gray-100 dark:bg-gray-800 rounded" />,
  },
);

export default function Layout({ left, right, children }) {
  return (
    // 1. Ignore Slots
    <ThreeColLayout>{children}</ThreeColLayout>

    // // 2. Define Slots
    // <ThreeColLayout left={<div>left</div>} right={<div>right</div>}>
    //   {children}
    // </ThreeColLayout>

    // // 3. Define slots
    // <ThreeColLayout left={left} right={right}>
    //   {children}
    // </ThreeColLayout>
  );
}
