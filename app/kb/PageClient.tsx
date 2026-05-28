'use client';
import { ExhibitLayout } from '@/layouts';
import { SidebarTree, useTreeNavigation } from '@/pkg/exhibit/components/SidebarTree';
import { BaseScroll } from '@/components/BaseScroll';

export function PageClient({ tree, content, toc }) {
  const { onSelect } = useTreeNavigation();
  return (
    <ExhibitLayout left={<SidebarTree data={tree} activePath={null} onSelect={onSelect} />} right={toc}>
      <div className="flex h-full w-full min-h-0 min-w-0">
        <BaseScroll>
          <div className="prose dark:prose-invert px-3 no-scrollbar suppressHydrationWarning">{content}</div>
        </BaseScroll>
      </div>
    </ExhibitLayout>
  );
}
