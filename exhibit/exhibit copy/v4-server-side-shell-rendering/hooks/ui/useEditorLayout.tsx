import { useState, useRef, useCallback } from 'react';

interface UseSplitPaneOptions {
  direction: 'horizontal' | 'vertical';
  initialSize: number;
  minSize?: number;
  maxSize?: number;
}

export function useSplitPane({ direction, initialSize, minSize = 120, maxSize }: UseSplitPaneOptions) {
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);

      // Store original tracking measurements based on targeted axis
      startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
      startSizeRef.current = size;

      // Capture the pointer immediately to neutralize iframe cursor dropping
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [direction, size],
  );

  const onDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;

      // Calculate displacement delta
      // NOTE: Vertical drawer pulls UP to expand, so we invert the delta calculation path
      const delta = direction === 'horizontal' ? currentPos - startPosRef.current : startPosRef.current - currentPos;

      let newSize = startSizeRef.current + delta;

      // Determine absolute bounding boundaries
      const maxBoundary =
        maxSize ?? (direction === 'horizontal' ? window.innerWidth * 0.85 : window.innerHeight * 0.85);
      newSize = Math.max(minSize, Math.min(maxBoundary, newSize));

      setSize(newSize);
    },
    [isDragging, direction, minSize, maxSize],
  );

  const stopDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    [isDragging],
  );

  return {
    size,
    isDragging,
    containerRef,
    dragProps: {
      onPointerDown: startDrag,
      onPointerMove: onDrag,
      onPointerUp: stopDrag,
      onPointerCancel: stopDrag,
    },
  };
}

export function useEditorLayout() {
  const mainPane = useSplitPane({
    direction: 'horizontal',
    initialSize: 600,
    minSize: 200,
  });

  const consolePane = useSplitPane({
    direction: 'vertical',
    initialSize: 320,
    minSize: 120,
  });

  return {
    containerRef: mainPane.containerRef,
    isAnyDragging: mainPane.isDragging || consolePane.isDragging,
    editorProps: {
      style: { width: mainPane.size },
    },
    consoleProps: {
      style: { height: consolePane.size },
    },
    mainDragProps: mainPane.dragProps,
    consoleDragProps: consolePane.dragProps,
  };
}
