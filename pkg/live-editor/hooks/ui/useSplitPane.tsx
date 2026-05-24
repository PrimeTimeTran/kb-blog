import React from 'react';

export function useSplitPane(initial = 600, min = 200) {
  const [leftWidth, setLeftWidth] = React.useState(initial);
  const isDragging = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const startDrag = (e: React.PointerEvent) => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.body.style.cursor = 'default';
  };

  const onDrag = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const newWidth = e.clientX - rect.left;

    setLeftWidth(Math.max(min, Math.min(rect.width - min, newWidth)));
  };

  return {
    leftWidth,
    containerRef,
    startDrag,
    stopDrag,
    onDrag,
  };
}
