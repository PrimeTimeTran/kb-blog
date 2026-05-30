import { ENABLE_CAMERA_TICK, WORLD, cameraConfig } from '../constants';
import { useEffect, useRef, useState } from 'react';

import { dumpScene } from '../src';
import { motion } from 'framer-motion';

export function useCamera(
  initial = cameraConfig.default.position,
  paths = cameraConfig.default.paths,
  interval = 1000,
) {
  const [camera, setCamera] = useState(initial);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
    zoom: 0,
  });
  useEffect(() => {
    if (!ENABLE_CAMERA_TICK) return;
    if (!paths?.length) return;

    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % paths.length;
        setCamera(paths[next]);
        return next;
      });
    }, interval);

    return () => clearInterval(id);
  }, [paths, interval]);

  function updateCamera(delta: Partial<typeof offset>) {
    setOffset((o) => ({
      x: o.x + (delta.x ?? 0),
      y: o.y + (delta.y ?? 0),
      zoom: o.zoom + (delta.zoom ?? 0),
    }));
  }
  return {
    camera,
    index,
    setCamera,
    updateCamera,
  };
}
export function WorldLayer({ camera, children }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ transformOrigin: '0 0' }}
        animate={{
          x: camera.x,
          y: camera.y,
          scale: camera.zoom,
        }}
      >
        <div
          className="relative"
          style={{
            width: WORLD.width,
            height: WORLD.height,
            transform: `translate(-50%, -50%)`,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
export function CameraController({ camera, setCamera, children }) {
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  return (
    <div
      className="w-full h-full"
      onMouseDown={(e) => {
        dragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onMouseMove={(e) => {
        if (!dragging.current) return;

        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;

        last.current = { x: e.clientX, y: e.clientY };

        setCamera((c) => ({
          ...c,
          x: c.x + dx / c.zoom,
          y: c.y + dy / c.zoom,
        }));
      }}
      onWheel={(e) => {
        const zoomDelta = -e.deltaY * 0.001;
        setCamera((c) => ({
          ...c,
          zoom: Math.min(2, Math.max(0.2, c.zoom + zoomDelta)),
        }));
      }}
    >
      {children}
    </div>
  );
}
export function CopySceneButton() {
  const handleCopy = () => {
    const root = document.querySelector('#scene-root') as HTMLElement;
    const frames = dumpScene(root);
    navigator.clipboard.writeText(
      JSON.stringify(
        {
          id: 'snapshot',
          frames,
        },
        null,
        2,
      ),
    );
  };

  return (
    <button onClick={handleCopy} className="fixed bottom-4 right-4 bg-black text-white px-3 py-2">
      Copy Scene
    </button>
  );
}
