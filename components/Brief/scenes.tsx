import * as types from './types';

import { CENTERED_FRAME, WORLD_CENTER } from './constants';
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
let compositionScene = [
  {
    id: 'laptop',
    type: 'laptopFrame',
    className: 'left-[5%] top-[5%] w-[90%] h-[85%]',
    group: 'root',
  },

  {
    id: 'browser-1',
    type: 'browserWindow',
    className: 'left-[12%] top-[18%] w-[520px] h-[300px]',
    group: 'laptop',
    motion: 'enter.fromLeft',
  },

  {
    id: 'browser-2',
    type: 'browserWindow',
    className: 'left-[30%] top-[35%] w-[520px] h-[300px]',
    group: 'laptop',
    motion: 'enter.fromBottom',
  },
];
compositionScene = [
  {
    id: 'laptop',
    type: 'laptopFrame',
    x: 200,
    y: 120,
    width: 900,
    height: 600,
    layout: 'viewport',
    children: [
      {
        id: 'browser-1',
        type: 'browserWindow',
        x: 120,
        y: 80,
        width: 520,
        height: 300,
        motion: 'enter.fromLeft',
      },
      {
        id: 'browser-2',
        type: 'browserWindow',
        x: 460,
        y: 180,
        width: 520,
        height: 300,
        motion: 'enter.fromBottom',
      },
    ],
  },
];

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
export { compositionScene };
export const sizing = {
  enter: [
    [
      {
        id: 'fromTop',
        type: 'absolute',
        className: 'left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[750px]',
        motion: 'fromBottom',
      },
    ],
    [
      {
        id: 'fromBottom',
        type: 'relative',
        className: 'left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[750px]',
        motion: 'fromBottom',
      },
    ],
  ],
};
export const motionEnter = {
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
export const sceneRegistry: types.SceneRegistry = {
  composition: {
    nested: [compositionScene],
  },
  motion: {
    enter: motionEnter.enter,
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
