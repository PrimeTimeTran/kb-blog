export const motions = {
  fromTop: {
    initial: { y: -200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 200, opacity: 0 },
  },

  fromBottom: {
    initial: { y: 200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -200, opacity: 0 },
  },

  fromLeft: {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 200, opacity: 0 },
  },

  fromRight: {
    initial: { x: 200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -200, opacity: 0 },
  },
} as const;
export const motionVariants = {
  scrollInUp: {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.98 },
  },

  scrollInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },

  fadeSoft: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  pop: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
} as const;
export const motionVariants1 = {
  fadeInUp: {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
  },

  pop: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },

  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },

  scrollDrift: {
    animate: {
      y: [0, -10, 0],
    },
  },

  slowScrollUp: {
    animate: {
      y: [10, -10, 10],
    },
  },

  fadeInScale: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
  },
};
export const motionVariants2 = {
  scrollInUp: {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.98 },
  },

  scrollInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },

  fadeSoft: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  pop: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};
export const motionRegistry = {
  enter: {
    fromTop: {
      initial: { y: -200, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 200, opacity: 0 },
    },

    fromBottom: {
      initial: { y: 200, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -200, opacity: 0 },
    },

    fromLeft: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 200, opacity: 0 },
    },

    fromRight: {
      initial: { x: 200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -200, opacity: 0 },
    },
  },
};
