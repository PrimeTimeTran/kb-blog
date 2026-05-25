'use client';

import { EditorLayout2, EditorLayout3 } from '@/layouts/ThreeColumnLayout';

export default function Layout({ left, right, children }) {
  return <EditorLayout3 />;
  return (
    <div className="flex w-full">
      {/* Example Sidebar Structure */}
      <aside className="group flex flex-col bg-lime-400 w-16 hover:w-64 transition-all duration-300 ease-in-out overflow-hidden">
        {/* Nav Item Example */}
        <div className="flex items-center p-4 whitespace-nowrap">
          <div className="min-w-[24px]">🏠</div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 ml-4 translate-x-4 group-hover:translate-x-0 transition-transform">
            Dashboard
          </span>
        </div>
      </aside>

      <div className="flex-1">{children}</div>

      <aside className="group flex flex-col bg-red-500 w-16 hover:w-64 transition-all duration-300 ease-in-out overflow-hidden">
        {/* Add items similarly here */}
      </aside>
    </div>
  );
}
