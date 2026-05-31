import * as types from '../types';

import { AnimatedFrame } from './AnimatedFrame-1';
// import { AnimatedFrame } from './AnimatedFrame';
import { FrameRenderer } from './Frames';
import { MOTIONS } from '../motions';
import React from 'react';
import { motion } from 'framer-motion';

type SceneFrameProps = {
  frame: types.Node;
  time: number;
  camera: types.Node;
  parent: {};
};

export function SceneFrame({ frame, time, camera, parent = { x: 0, y: 0 } }: SceneFrameProps) {
  const enter = frame.motion?.enter && MOTIONS.enter[frame.motion.enter];

  const exit = frame.motion?.exit && MOTIONS.exit[frame.motion.exit];

  const localTime = time;

  const variants = {
    initial: enter?.initial ?? { opacity: 0 },
    animate: enter?.animate ?? { opacity: 1 },
    exit: exit?.exit ?? { opacity: 0 },
  };

  const resolved = resolveFrame(frame, parent);

  return (
    <motion.div
      className="absolute border overflow-hidden"
      style={{
        left: resolved.resolved.x - camera.x,
        top: resolved.resolved.y - camera.y,

        // IMPORTANT: layout now comes from layout, not root frame fields
        width: frame.layout?.width,
        height: frame.layout?.height,
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 z-0">
        <FrameRenderer frame={frame} />
      </div>
      {/* Renders Nested Scenes */}
      <div
        // className="bg-red-400"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          outline: '2px solid red',
        }}
      >
        {frame.children?.map((child) => (
          <AnimatedFrame
            key={child.id}
            frame={child}
            time={localTime}
            parent={{
              x: resolved.resolved.x,
              y: resolved.resolved.y,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function resolveFrame(frame: types.Node, parent = { x: 0, y: 0 }) {
  return {
    ...frame,
    resolved: {
      x: parent.x + (frame.layout?.x ?? 0),
      y: parent.y + (frame.layout?.y ?? 0),
    },
  };
}
