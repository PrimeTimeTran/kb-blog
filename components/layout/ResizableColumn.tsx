'use client';
import { ReactNode } from 'react';
import { useResize } from '@/hooks/useResize';
import { useLayout } from '@/providers/LayoutProvider';

function Resizer({ onMouseDown }) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="w-2 h-full cursor-col-resize relative opacity-0 transition-opacity group-hover:opacity-100"
    >
      {/* 
        NOTE:
        Ignore suggestion from editor.
        "The class `group-hover:bg-[var(--outline-variant)]` can be written as `group-hover:bg-(--outline-variant)`(suggestCanonicalClasses)"
        This breaks the hover.
       */}
      <div className="w-px absolute inset-y-0 left-1/2 bg-transparent group-hover:bg-(--outline-variant) group-active:bg-(--outline-variant-active)" />
    </div>
  );
}

type ResizableColumnProps = {
  side: 'left' | 'right';
  className?: string;
  children: ReactNode;
};

export function ResizableColumn({ side, className, children }: ResizableColumnProps) {
  const { layout } = useLayout();
  const resize = useResize(side);
  const isLeft = side === 'left';

  return (
    <div
      className={`group flex h-full  shrink-0 ${className ? className : ''} ${isLeft ? 'overflow-hidden left-sidebar' : 'right-sidebar'}`}
      style={{
        width: layout[side],
        minWidth: layout[side],
        maxWidth: layout[side],
        flexShrink: 0,
      }}
    >
      {!isLeft && <Resizer onMouseDown={resize} />}

      {/* <div className="flex-1 min-w-0 h-full overflow-hidden">{children}</div> */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto no-scrollbar border-0">{children}</div>

      {isLeft && <Resizer onMouseDown={resize} />}
    </div>
  );
}
