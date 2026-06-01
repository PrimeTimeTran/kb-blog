import * as types from '../types';

import { JSX, useRef } from 'react';

import { VIEWPORT } from '../constants/world';
import { dumpScene } from '../src';
import { getConfig } from '../config';
import { motion } from 'framer-motion';

type WorldLayerType = {
  camera: types.Camera;
  children: JSX.Element;
};

export function WorldLayer({ camera, children }: WorldLayerType) {
  const isBypassed = getConfig().isCameraBypassed;

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
        transition={{ duration: isBypassed ? 0 : 0.3 }}
      >
        <div
          className="relative"
          style={{
            width: VIEWPORT.width,
            height: VIEWPORT.height,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

type CameraControllerProps = {
  camera: types.Camera;
  children: JSX.Element;
};
export function CameraController({ camera, setCamera, children }: CameraControllerProps) {
  const isDisabled = getConfig().isCameraBypassed;
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  // if (getConfig().isCameraBypassed) {
  //   return <div className="w-full h-full">{children}</div>;
  // }

  return (
    <div
      className="w-full h-full"
      onMouseDown={(e) => {
        if (isDisabled) return;
        dragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onMouseMove={(e) => {
        if (isDisabled) return;
        if (!dragging.current) return;

        // Use the bounding box of the element, not the zoom state,
        // to calculate the movement speed.
        // const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;

        last.current = { x: e.clientX, y: e.clientY };

        setCamera((c) => ({
          ...c,
          // If bypassed, force zoom to 1 in the calculation
          x: c.x + dx / (isDisabled ? 1 : c.zoom),
          y: c.y + dy / (isDisabled ? 1 : c.zoom),
        }));
      }}
      onWheel={(e) => {
        if (isDisabled) return;
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
