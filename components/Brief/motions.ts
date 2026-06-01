import { MotionRegistry } from './types';
import { getConfig } from './config';

export const MOTIONS = {
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
} as const;

export const motions: MotionRegistry = {
  fromLeft: {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },

  fromRight: {
    initial: { x: 200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },

  fromTop: {
    initial: { y: -200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },

  fromBottom: {
    initial: { y: 200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },

  toLeft: {
    initial: { x: 0, opacity: 1 },
    animate: { x: -200, opacity: 0 },
  },

  toRight: {
    initial: { x: 0, opacity: 1 },
    animate: { x: 200, opacity: 0 },
  },
};
