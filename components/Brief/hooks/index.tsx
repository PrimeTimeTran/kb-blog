import { useEffect, useRef } from 'react';

export function useDraggableFrame(onUpdate: (pos: any) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let dragging = false;

    const onMove = (e: MouseEvent) => {
      if (!dragging) return;

      const rect = el.getBoundingClientRect();

      onUpdate({
        x: rect.left + e.movementX,
        y: rect.top + e.movementY,
      });
    };

    el.addEventListener('mousedown', () => (dragging = true));
    window.addEventListener('mouseup', () => (dragging = false));
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', () => (dragging = false));
    };
  }, [onUpdate]);

  return ref;
}
export function useSceneRecorder(enabled: boolean) {
  const framesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const id = setInterval(() => {
      const snapshot = snapshotScene();
      framesRef.current.push({
        t: Date.now(),
        snapshot,
      });
    }, 100);

    return () => clearInterval(id);
  }, [enabled]);

  return framesRef;
}
export function useFrameInspector(enabled: boolean) {
  const getProps = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();

    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const copy = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  return { getProps, copy };
}
export function snapshotScene(rootSelector = '#scene-root') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const nodes = root.querySelectorAll('[data-scene-block]');

  const frames = Array.from(nodes).map((el: any) => {
    const rect = el.getBoundingClientRect();

    return {
      id: el.dataset.id,
      type: el.dataset.type,
      className: el.dataset.className,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  });

  console.log('SNAPSHOT:', frames);
  return frames;
}
