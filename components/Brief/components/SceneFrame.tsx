import { useEffect, useRef } from 'react';

import { AnimatedFrame } from './AnimatedFrame-1';
import { FrameRenderer } from './Frames';
import { getConfig } from '../config';
import { motion } from 'framer-motion';

export function SceneFrame({ frame, time, camera, parent = { x: 0, y: 0 } }) {
  const enter = frame.motion && tmotion.enter[frame.motion];
  const exit = frame.exitMotion && tmotion.exit?.[frame.exitMotion];
  const mountTimeRef = useRef<number>(performance.now());
  const variants = {
    initial: enter?.initial ?? { opacity: 0 },
    animate: enter?.animate ?? { opacity: 1 },
    exit: exit?.exit ?? { opacity: 0 },
  };

  const resolved = resolveFrame(frame, parent);
  const localTime = time - mountTimeRef.current;

  useEffect(() => {
    console.log('SceneFrame Render');
  }, []);

  return (
    <motion.div
      className="absolute border bg-green-400/10 overflow-hidden"
      style={{
        left: resolved.x,
        top: resolved.y,
        width: frame.width,
        height: frame.height,
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

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          outline: '2px solid red',
        }}
      >
        {frame.children?.map((child) => (
          <AnimatedFrame key={child.id} frame={child} time={localTime} parent={frame} />
        ))}
      </div>
    </motion.div>
  );
}

export const tmotion = {
  enter: {
    fromLeft: {
      initial: { x: -getConfig().world.width, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    fromRight: {
      initial: { x: getConfig().world.width, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    fromTop: {
      initial: { y: -getConfig().world.height, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    fromBottom: {
      initial: { y: getConfig().world.height, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
  },

  exit: {
    toLeft: { exit: { x: -getConfig().world.width, opacity: 0 } },
    toRight: { exit: { x: getConfig().world.width, opacity: 0 } },
    toTop: { exit: { y: -getConfig().world.height, opacity: 0 } },
    toBottom: { exit: { y: getConfig().world.height, opacity: 0 } },
  },
};

function resolveFrame(frame, parent = { x: 0, y: 0 }) {
  return {
    ...frame,
    x: parent.x + (frame.x ?? 0) + (frame.offset?.x ?? 0),
    y: parent.y + (frame.y ?? 0) + (frame.offset?.y ?? 0),
  };
}
