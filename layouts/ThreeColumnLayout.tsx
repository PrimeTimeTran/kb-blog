import { useState, useCallback, useRef, useEffect } from 'react';

export function ThreeColumnLayout({ children }) {
  // Pass initial pixel widths for the sidebars
  const { sizes, getHandleProps, isDragging } = useMultiSplitter([300, 300]);

  return (
    <div className={`flex w-screen h-screen overflow-hidden ${isDragging ? 'select-none' : ''}`}>
      {/* Left Sidebar */}
      <div style={{ width: sizes[0], flexShrink: 0 }}>Left Content</div>

      {/* Handle 0 */}
      <div
        {...getHandleProps(0)}
        className="group relative flex w-2 items-center justify-center cursor-col-resize hover:bg-gray-200"
      >
        <div className="h-16 w-1 rounded-full bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Main Center Pane (Flex-1 makes it take the remaining space) */}
      <div className="flex-1 min-w-0 overflow-auto">{children}</div>

      {/* Handle 1 */}
      <div
        {...getHandleProps(1)}
        className="group relative flex w-2 items-center justify-center cursor-col-resize hover:bg-gray-200"
      >
        <div className="h-16 w-1 rounded-full bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Right Sidebar */}
      <div style={{ width: sizes[1], flexShrink: 0 }}>Right Content</div>
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
export function useMultiSplitter2(initialSideWidths: number[], minSize = 100) {
  const [sizes, setSizes] = useState(initialSideWidths);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  const startDrag = (index: number) => (e: React.PointerEvent) => {
    setDraggingIndex(index);
    startPosRef.current = e.clientX;
    startSizeRef.current = sizes[index];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDrag = (e: React.PointerEvent) => {
    if (draggingIndex === null) return;

    const delta = e.clientX - startPosRef.current;

    setSizes((prev) => {
      const next = [...prev];
      
      if (draggingIndex === 0) {
        // Left Handle: Moving right increases width
        next[0] = Math.max(minSize, startSizeRef.current + delta);
      } else if (draggingIndex === 1) {
        // Right Handle: Moving left increases width
        // Moving mouse right (positive delta) makes width smaller
        // Moving mouse left (negative delta) makes width larger
        next[1] = Math.max(minSize, startSizeRef.current - delta);
      }
      
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
    getHandleProps: (index: number) => ({
      onPointerDown: startDrag(index),
      onPointerMove: onDrag,
      onPointerUp: stopDrag,
      onPointerCancel: stopDrag,
    }),
  };
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

export function useResizableOverlay(initialHeight: number, minHeight = 100) {
  const [height, setHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef(0);
  const startHeightRef = useRef(0);

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      startPosRef.current = e.clientY;
      startHeightRef.current = height;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [height],
  );

  const onDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      // Calculate delta (moving mouse UP = positive growth)
      const delta = startPosRef.current - e.clientY;
      const newHeight = Math.max(minHeight, startHeightRef.current + delta);

      setHeight(newHeight);
    },
    [isDragging, minHeight],
  );

  const stopDrag = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return {
    height,
    isDragging,
    // Provide these props to your invisible drag handle
    dragProps: {
      onPointerDown: startDrag,
      onPointerMove: onDrag,
      onPointerUp: stopDrag,
      onPointerCancel: stopDrag,
    },
  };
}
export function EditorLayout3() {
  const { sizes, getHandleProps, isDragging } = useMultiSplitter2([300, 700, 300]);
  const { height, dragProps } = useResizableOverlay(250);
  const { isOpen, toggle } = useOverlay();

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <div className={`flex flex-1 ${isDragging ? 'select-none' : ''}`}>
        <div style={{ width: sizes[0] }}>Left</div>
        <div {...getHandleProps(0)} className="w-2 bg-gray-300 cursor-col-resize" />
        <div style={{ width: sizes[1] }}>Center</div>
        <div {...getHandleProps(1)} className="w-2 bg-gray-300 cursor-col-resize" />
        <div style={{ width: sizes[2] }}>Right</div>
        <button onClick={toggle}>Toggle Console</button>
      </div>

      {/* Bottom Panel */}
      <div
        style={{ height: isOpen ? `${height}px` : '0px' }}
        className="absolute bottom-0 left-0 w-full bg-slate-800 transition-[height] duration-75"
      >
        {/* Resize Handle - positioned at the top of the panel */}
        <div {...dragProps} className="absolute -top-1 w-full h-2 cursor-row-resize z-10 group" />
        {/* <div className="group relative flex w-2 items-center justify-center cursor-col-resize"> */}
        <div className="absolute inset-y-0 -left-2 -right-2 z-10" />
        <div className="h-16 w-1 rounded-full bg-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* </div>   */}
        <div className="p-4">
          <button onClick={toggle}>Close Console</button>
          {/* Content */}
        </div>
      </div>
    </div>
  );
}

export function EditorLayout2() {
  const { sizes, getHandleProps, isDragging } = useMultiSplitter([300, 400, 300]);
  const { isOpen, toggle } = useOverlay();
  const { height, isResizing, resizeProps } = useResizablePanel(250);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <div className={`flex flex-1 ${isDragging ? 'select-none' : ''}`}>
        <div style={{ width: sizes[0] }}>Left</div>
        <div {...getHandleProps(0)} className="w-2 bg-gray-300 cursor-col-resize" />
        <div style={{ width: sizes[1] }}>Center</div>
        <div {...getHandleProps(1)} className="w-2 bg-gray-300 cursor-col-resize" />
        <div style={{ width: sizes[2] }}>Right</div>
        <button onClick={toggle}>Toggle Console</button>
      </div>

      {/* Bottom Panel */}
      <div
        style={{ height: isOpen ? `${height}px` : '0px' }}
        className={`absolute bottom-0 left-0 w-full bg-slate-800 transition-[height] duration-300 ease-in-out ${isOpen ? 'border-t-2 border-gray-600' : ''}`}
      >
        {/* Resize Handle for the panel */}
        <div
          {...resizeProps}
          className="w-full h-2 bg-transparent cursor-row-resize absolute -top-1 hover:bg-blue-500"
        />
        <button onClick={toggle}>Close Console</button>
      </div>
    </div>
  );
}

export function useOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, toggle: () => setIsOpen(!isOpen) };
}
// 3. Composite Layout
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
