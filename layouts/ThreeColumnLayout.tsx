import { useState, useRef, useEffect } from 'react';

export function ThreeColLayout({ left, right, children }) {
  const getWidthsFromWeights = (totalWidth: number, weights: any[]) => {
    const totalWeight = weights.reduce((acc: any, w: any) => acc + w, 0);
    return weights.map((w: number) => (w / totalWeight) * totalWidth);
  };
  const initialSizes = getWidthsFromWeights(typeof window !== 'undefined' ? window.innerWidth : 1200, [2, 8, 2]);

  const { sizes, getHandleProps, isDragging } = useMultiSplitter(initialSizes);
  const { isOpen, toggle } = useOverlay();
  const { height, resizeProps } = useResizablePanel(250);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <div className={`flex flex-1 ${isDragging ? 'select-none' : ''}`}>
        <div style={{ width: sizes[0] }}>{left}</div>
        <ResizeHandle {...getHandleProps(0)} />
        <div className="text-center" style={{ width: sizes[1] }}>
          <div className="bg-surface p-6">
            bg-surface
            {/* Nested inside: Container Lowest (e.g., a sidebar or outer panel) */}
            <div className="bg-surface-container-lowest p-4 rounded-xl">
              bg-surface-container-lowest
              {/* Nested inside: Container Low (e.g., a sub-section) */}
              <div className="bg-surface-container-low p-4 rounded-lg">
                bg-surface-container-low
                {/* Nested inside: Container (e.g., the content card) */}
                <div className="bg-surface-container p-4 rounded-md">
                  bg-surface-container
                  {/* Nested inside: Container High (e.g., an interactive element) */}
                  <div className="bg-surface-container-high p-2 rounded">bg-surface-container-high</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ResizeHandle {...getHandleProps(1)} />
        <div style={{ width: sizes[2] }}>{right}</div>
        <button onClick={toggle}>Open</button>
      </div>

      <div
        style={{ height: isOpen ? `${height}px` : '0px' }}
        className={`absolute bottom-0 left-0 w-full bg-surface-container transition-[height] duration-300 ease-in-out ${isOpen ? 'border-t-2 border-gray-600' : ''}`}
      >
        <div {...resizeProps} className="w-full h-4 -top-2 absolute cursor-row-resize group">
          <div className="w-full bg-transparent group-hover:bg-gray-500 transition-colors" />
        </div>
        <button onClick={toggle}>Close Console</button>
      </div>
    </div>
  );
}

export function useMultiSplitter(initialSizes: number[], minSize = 100) {
  const [sizes, setSizes] = useState(initialSizes);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const startPosRef = useRef(0);
  const startSizeLeftRef = useRef(0);
  const startSizeRightRef = useRef(0);

  const startDrag = (index: number) => (e: React.PointerEvent) => {
    setDraggingIndex(index);
    startPosRef.current = e.clientX;
    startSizeLeftRef.current = sizes[index];
    startSizeRightRef.current = sizes[index + 1];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDrag = (e: React.PointerEvent) => {
    if (draggingIndex === null) return;

    const delta = e.clientX - startPosRef.current;

    setSizes((prev) => {
      const next = [...prev];
      const newLeft = Math.max(minSize, startSizeLeftRef.current + delta);
      const newRight = Math.max(minSize, startSizeRightRef.current - delta);

      // Calculate how much space is actually available to shift
      const totalSpace = startSizeLeftRef.current + startSizeRightRef.current;

      next[draggingIndex] = newLeft;
      next[draggingIndex + 1] = Math.max(minSize, totalSpace - newLeft);
      return next;
    });
  };

  const stopDrag = (e: React.PointerEvent) => {
    setDraggingIndex(null);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return {
    sizes,
    isDragging: draggingIndex !== null,
    // Helper to generate props for each handle
    getHandleProps: (index: number) => ({
      onPointerDown: startDrag(index),
      onPointerMove: onDrag,
      onPointerUp: stopDrag,
      onPointerCancel: stopDrag,
    }),
  };
}

export function useOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, toggle: () => setIsOpen(!isOpen) };
}

export function useResizablePanel(initialHeight: number) {
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (e: PointerEvent) => {
      // movementY is reliable, but calculating from a ref is often smoother
      setHeight((prev) => Math.max(100, Math.min(window.innerHeight * 0.8, prev - e.movementY)));
    };

    const handlePointerUp = () => setIsResizing(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizing]);

  return {
    height,
    isResizing,
    resizeProps: {
      onPointerDown: (e: React.PointerEvent) => {
        setIsResizing(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      },
    },
  };
}

const ResizeHandle = ({ ...props }) => (
  <div {...props} className="group w-4 flex justify-center cursor-col-resize relative">
    {/* This is the invisible interaction area (wider for easy grabbing) */}
    {/* This is the visual line that appears on hover */}
    <div className="h-full w-[1px] bg-transparent group-hover:bg-gray-500 transition-colors" />
  </div>
);

export default function EditorLayout() {
  const { sizes, getHandleProps, isDragging } = useMultiSplitter([300, 400, 300]);
  const { isOpen, toggle } = useOverlay();

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Three Columns - Standard Flow */}
      <div className={`flex flex-1 ${isDragging ? 'select-none' : ''}`}>
        <div style={{ width: sizes[0] }}>Left</div>
        <div {...getHandleProps(0)} className="w-2 bg-gray-300 cursor-col-resize" />
        <div style={{ width: sizes[1] }}>Center</div>
        <div {...getHandleProps(1)} className="w-2 bg-gray-300 cursor-col-resize" />
        <div style={{ width: sizes[2] }}>Right</div>
        <button onClick={toggle}>Toggle Console</button>
      </div>

      {/* Bottom Panel - Positioned Absolutely to overlap */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-slate-800 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 h-64' : 'translate-y-full h-64'
        }`}
      >
        {/* Content here */}
      </div>
    </div>
  );
}
