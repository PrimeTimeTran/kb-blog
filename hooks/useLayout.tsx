import { useState, useRef, useEffect, PointerEvent, useSyncExternalStore } from 'react';

export function useMultiSplitter() {
  const width = useSyncExternalStore<number>(
    (callback: () => void) => {
      window.addEventListener('resize', callback);

      return () => {
        window.removeEventListener('resize', callback);
      };
    },
    (): number => window.innerWidth,
    (): number => 1200,
  );

  const [initialSizes, minSize]: [number[], number] = getWidthsFromWeights(width, [3, 6, 3]);
  const [sizes, setSizes] = useState<number[]>(initialSizes);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const startPosRef = useRef(0);
  const startSizeLeftRef = useRef(0);
  const startSizeRightRef = useRef(0);

  const startDrag = (index: number) => (e: PointerEvent) => {
    setDraggingIndex(index);
    startPosRef.current = e.clientX;
    startSizeLeftRef.current = sizes[index];
    startSizeRightRef.current = sizes[index + 1];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDrag = (e: PointerEvent) => {
    if (draggingIndex === null) return;

    const delta = e.clientX - startPosRef.current;

    setSizes((prev) => {
      const next = [...prev];
      const newLeft = Math.max(minSize, startSizeLeftRef.current + delta);
      const totalSpace = startSizeLeftRef.current + startSizeRightRef.current;

      next[draggingIndex] = newLeft;
      next[draggingIndex + 1] = Math.max(minSize, totalSpace - newLeft);
      return next;
    });
  };

  const stopDrag = (e: PointerEvent) => {
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
      onPointerDown: (e: PointerEvent) => {
        setIsResizing(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      },
    },
  };
}

const getWidthsFromWeights = (totalWidth: number, weights: number[]): [number[], number] => {
  const totalWeight = weights.reduce((acc: number, w: number) => acc + w, 0);

  return [weights.map((w: number) => (w / totalWeight) * totalWidth), 100];
};
