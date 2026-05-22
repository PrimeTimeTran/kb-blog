'use client';
import { ResizableColumn } from '@/components/layout/ResizableColumn';
import SidebarTree from './SidebarTree';

export default function PageClient({ tree, children }) {
  return (
    <div className="w-full h-full flex flex-row gap-6 overflow-hidden">
      <ResizableColumn side="left">
        <SidebarTree data={tree} />
      </ResizableColumn>

      <main className="flex-1 min-w-0 h-full overflow-hidden">{children}</main>
    </div>
  );
}
