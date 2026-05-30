import { SurfacePreviewLeft, SurfacePreviewMain, SurfacePreviewRight } from '@/lib';
import { useMultiSplitter, useOverlay, useResizablePanel } from '@/hooks/useLayout';

import { JSX } from 'react';
import { OverlayHost } from './global/Overlay';

export function ExhibitLayout({ left, right, children, childrenWrapperClassName }: ColProps) {
  const { sizes, getHandleProps, isDragging } = useMultiSplitter();

  return (
    <div className="absolute inset-x-0 top-16 bottom-0 overflow-hidden">
      <div className={`flex h-full min-h-0 overflow-hidden ${isDragging ? 'select-none' : ''}`}>
        <div style={{ width: sizes[0] }} className="relative min-h-0">
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface">
            {left || <SurfacePreviewLeft />}
          </div>
        </div>

        <ResizeHandle {...getHandleProps(0)} />

        <div
          style={{ width: sizes[1] }}
          className={`relative flex-1 min-w-0 min-h-0 ${childrenWrapperClassName ?? ''}`}
        >
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface">
            {children || <SurfacePreviewMain />}
          </div>
        </div>

        <ResizeHandle {...getHandleProps(1)} />

        <div style={{ width: sizes[2] }} className="relative min-h-0 border-l border-white/5">
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface">
            {right || <SurfacePreviewRight />}
          </div>
        </div>
      </div>
      <BottomPanel />
      <OverlayHost />
    </div>
  );
}

export function BottomPanel() {
  const { isOpen, toggle } = useOverlay();
  const { height, resizeProps } = useResizablePanel(250);
  return (
    <div
      style={{ height: isOpen ? `${height}px` : '0px' }}
      className={`z-20 absolute bottom-0 left-0 w-full bg-level transition-[height] duration-300 ease-in-out ${isOpen ? 'border-t-2 border-gray-600' : ''}`}
    >
      <div {...resizeProps} className="w-full h-4 -top-2 absolute cursor-row-resize group">
        <div className="w-full bg-transparent group-hover:bg-gray-500 transition-colors" />
      </div>
      <button onClick={toggle}>Close Console</button>
    </div>
  );
}

const ResizeHandle = ({ ...props }) => (
  <div {...props} className="group w-2 flex justify-center cursor-col-resize relative">
    <div className="handlebar" />
  </div>
);

type ColProps = {
  left: JSX.Element;
  right: JSX.Element;
  children: JSX.Element;
  childrenWrapperClassName?: string;
};
