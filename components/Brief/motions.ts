import { MotionRegistry } from './types';

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
export const motions2 = {
  enter: {
    fromLeft: (t) => interpolate(tmotion.enter.fromLeft.initial, tmotion.enter.fromLeft.animate, t),

    fromRight: (t) => interpolate(tmotion.enter.fromRight.initial, tmotion.enter.fromRight.animate, t),

    fromTop: (t) => interpolate(tmotion.enter.fromTop.initial, tmotion.enter.fromTop.animate, t),

    fromBottom: (t) => interpolate(tmotion.enter.fromBottom.initial, tmotion.enter.fromBottom.animate, t),
  },

  exit: {
    toLeft: (t) => interpolate({ x: 0, opacity: 1 }, tmotion.exit.toLeft.exit, t),

    toRight: (t) => interpolate({ x: 0, opacity: 1 }, tmotion.exit.toRight.exit, t),

    toTop: (t) => interpolate({ y: 0, opacity: 1 }, tmotion.exit.toTop.exit, t),

    toBottom: (t) => interpolate({ y: 0, opacity: 1 }, tmotion.exit.toBottom.exit, t),
  },
};
function interpolate(a, b, t) {
  const out = {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const k of keys) {
    const av = a[k];
    const bv = b[k];

    if (typeof av === 'number' && typeof bv === 'number') {
      out[k] = av + (bv - av) * t;
    } else {
      out[k] = t < 1 ? av : bv;
    }
  }

  return out;
}
