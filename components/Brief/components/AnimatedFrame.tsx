import { WORLD_H, WORLD_W } from '../constants';

import { FrameRenderer } from './Frames';
import { motion } from 'framer-motion';

export const tmotion = {
  enter: {
    fromLeft: {
      initial: { x: -WORLD_W, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    fromRight: {
      initial: { x: WORLD_W, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    fromTop: {
      initial: { y: -WORLD_H, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    fromBottom: {
      initial: { y: WORLD_H, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
  },

  exit: {
    toLeft: { exit: { x: -WORLD_W, opacity: 0 } },
    toRight: { exit: { x: WORLD_W, opacity: 0 } },
    toTop: { exit: { y: -WORLD_H, opacity: 0 } },
    toBottom: { exit: { y: WORLD_H, opacity: 0 } },
  },
};

function resolveFrame(frame, parent = { x: 0, y: 0 }) {
  return {
    ...frame,
    x: parent.x + (frame.x ?? 0) + (frame.offset?.x ?? 0),
    y: parent.y + (frame.y ?? 0) + (frame.offset?.y ?? 0),
  };
}

export function AnimatedFrame({ camera, frame, parent = { x: 0, y: 0 } }) {
  const enter = frame.motion && tmotion.enter[frame.motion];
  const exit = frame.exitMotion && tmotion.exit?.[frame.exitMotion];

  const variants = {
    initial: enter?.initial ?? { opacity: 0 },
    animate: enter?.animate ?? { opacity: 1 },
    exit: exit?.exit ?? { opacity: 0 },
  };

  const resolved = resolveFrame(frame, parent);

  return (
    <motion.div
      className="absolute border  bg-green-400/10 overflow-hidden"
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
      <FrameRenderer frame={frame} />

      {frame.children?.map((child) => (
        <AnimatedFrame
          key={child.id}
          frame={child}
          camera={camera}
          parent={{
            x: resolved.x,
            y: resolved.y,
          }}
        />
      ))}
    </motion.div>
  );
}
