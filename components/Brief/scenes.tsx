import * as types from './types';

import { CENTERED_FRAME, WORLD, WORLD_CENTER } from './constants';
import { WORLD_H, WORLD_W } from './constants';

export const scene = [
  {
    id: 'laptop',
    type: 'laptopFrame',
    group: 'root',
    x: 200,
    y: 120,
  },
  {
    id: 'browser-1',
    type: 'browserWindow',
    group: 'laptop',
    className: 'absolute left-[40px] top-[80px]',
  },
  {
    id: 'browser-2',
    type: 'browserWindow',
    group: 'laptop',
    className: 'absolute left-[80px] top-[140px]',
  },
];
export const compositionScene = [
  {
    id: 'laptop',
    type: 'laptopFrame',

    ...CENTERED_FRAME,

    width: 1200,
    height: 720,

    children: [
      {
        id: 'browser-1',
        type: 'browserWindow',

        ...CENTERED_FRAME,

        offset: { x: -600, y: -120 },

        width: 520,
        height: 300,

        motion: 'fromBottom',
        exitMotion: 'toTop',
      },
      {
        id: 'browser-2',
        type: 'browserWindow',

        ...CENTERED_FRAME,

        offset: { x: 220, y: 40 },

        width: 520,
        height: 300,

        motion: 'fromLeft',
        exitMotion: 'toRight',
      },
    ],
  },
];

export const transformsScene = [
  {
    id: 'laptop',
    type: 'laptopFrame',

    x: 0,
    y: 0,

    width: WORLD.width * 0.6,
    height: WORLD.height * 0.6,

    children: [
      {
        id: 'browser-1',
        type: 'browserWindow',

        x: -300,
        y: -120,

        width: WORLD.width * 0.25,
        height: WORLD.height * 0.25,
      },

      {
        id: 'browser-2',
        type: 'browserWindow',

        x: 200,
        y: 40,

        width: WORLD.width * 0.25,
        height: WORLD.height * 0.25,
      },
    ],
  },
];

export const motionScene = {
  enter: [
    [
      {
        id: 'fromBottom',
        type: 'browserFrame',
        ...CENTERED_FRAME,
        motion: 'fromBottom',
        exitMotion: 'toTop',
      },
    ],

    [
      {
        id: 'fromLeft',
        type: 'ideFrame',
        ...CENTERED_FRAME,
        motion: 'fromLeft',
        exitMotion: 'toRight',
      },
    ],

    [
      {
        id: 'fromTop',
        type: 'browserFrame',
        ...CENTERED_FRAME,
        motion: 'fromTop',
        exitMotion: 'toBottom',
      },
    ],

    [
      {
        id: 'fromRight',
        type: 'ideFrame',
        ...CENTERED_FRAME,
        motion: 'fromRight',
        exitMotion: 'toLeft',
      },
    ],
  ],
};

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

export const sizing = {
  preview: [
    [
      {
        id: 'fromTop',
        type: 'absolute',
        ...CENTERED_FRAME,
        motion: 'fromBottom',
      },
    ],
    [
      {
        id: 'fromBottom',
        type: 'relative',
        ...CENTERED_FRAME,
        motion: 'fromBottom',
      },
    ],
  ],
};

export const sceneRegistry: types.SceneRegistry = {
  sizing,
  transforms: {
    shapes: [transformsScene],
  },
  composition: {
    nested: [compositionScene],
  },
  motion: {
    enter: motionScene.enter,
  },
  float: {
    a: [
      [
        {
          id: 'browser-frame',
          type: 'browserFrame',
          className: 'left-[8%] top-[10%] w-[760px] h-[460px]',
        },
        {
          id: 'floating-editor',
          type: 'editor',
          className: 'right-[6%] top-[18%] w-[360px] h-[220px]',
        },
        {
          id: 'floating-terminal',
          type: 'terminal',
          className: 'right-[14%] bottom-[14%] w-[280px] h-[160px]',
        },
      ],

      [
        {
          id: 'ide-frame',
          type: 'ideFrame',
          className: 'left-[4%] top-[6%] w-[92%] h-[86%]',
        },
        {
          id: 'ide-sidebar',
          type: 'sidebar',
          className: 'left-[6%] top-[12%] w-[220px] h-[70%]',
        },
        {
          id: 'ide-editor',
          type: 'editor',
          className: 'left-[24%] top-[12%] w-[52%] h-[70%]',
        },
        {
          id: 'ide-terminal',
          type: 'terminal',
          className: 'right-[6%] bottom-[10%] w-[300px] h-[220px]',
        },
      ],
    ],
  },
  scroll: {
    c: [
      [
        {
          id: 'editor1',
          className: 'left-[5%] top-[10%] w-[420px] h-[260px]',
          type: 'editor',
        },
        {
          id: 'terminal1',
          className: 'right-[8%] top-[22%] w-[260px] h-[160px]',
          type: 'terminal',
        },
      ],

      [
        {
          id: 'editor2',
          className: 'left-[18%] top-[18%] w-[500px] h-[280px]',
          type: 'editor',
        },
        {
          id: 'terminal2',
          className: 'right-[15%] bottom-[12%] w-[300px] h-[180px]',
          type: 'terminal',
        },
      ],
    ],

    d: [
      [
        {
          id: 'frame',
          type: 'frame',
          className: 'left-[6%] top-[8%] w-[620px] h-[360px]',
        },
        {
          id: 'editor',
          type: 'editor',
          className: 'left-[12%] top-[14%] w-[420px] h-[260px]',
          motion: 'fadeInUp',
        },
      ],
    ],
  },
};
