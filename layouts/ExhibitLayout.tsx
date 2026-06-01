import { SurfacePreviewLeft, SurfacePreviewMain, SurfacePreviewRight } from '@/components/showcase/components';
import { useMultiSplitter, useOverlay, useResizablePanel } from '@/hooks/useLayout';

import { JSX } from 'react';
import { useOverlayManager } from './global/Overlay';

export function ExhibitLayout({ manifest, isPreview, left, right, children, childrenWrapperClassName }: ColProps) {
  const { sizes, getHandleProps, isDragging } = useMultiSplitter(isPreview);
  const { sidebarOpen } = useOverlayManager();
  const className = `absolute inset-x-0 bottom-0 overflow-hidden ${isPreview ? 'top-0' : 'top-16'}`;
  return (
    <div className={className}>
      <div className={`flex h-full min-h-0 overflow-hidden ${isDragging ? 'select-none' : ''}`}>
        <div
          className="relative min-h-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
          style={{
            width: sidebarOpen ? sizes[0] : 0,
            opacity: sidebarOpen ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface whitespace-nowrap">
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

        <div style={{ width: sizes[2] }} className="relative min-h-0 border-l">
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface">
            {right || <SurfacePreviewRight />}
          </div>
        </div>
      </div>
      <BottomPanel />
    </div>
  );
}

export function BottomPanel() {
  const { isOpen, toggle } = useOverlay();
  const { height, resizeProps } = useResizablePanel(250);
  return (
    <div
      style={{ height: isOpen ? `${height}px` : '0px' }}
      className={`z-20 absolute bottom-0 left-0 w-full bg-level transition-[height] duration-300 ease-in-out ${isOpen ? 'border-t' : ''}`}
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
