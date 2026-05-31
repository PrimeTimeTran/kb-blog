import * as types from './types';

import { VIEWPORT_FRAME } from './constants/world';

export const sceneFrameFocused: types.SceneDefinition = [
  [
    {
      id: 'ideFrame',
      type: 'ideFrame',
      ...VIEWPORT_FRAME,

      // motion: {
      //   enter: 'fromLeft',
      //   exit: 'toRight',
      // },
    },
  ],
];
export const sceneFrames: types.SceneDefinition = [
  [
    {
      id: 'ideFrame',
      type: 'ideFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'card',
      type: 'card',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'stats',
      type: 'stats',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'chart',
      type: 'chart',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'terminal',
      type: 'terminal',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'editor',
      type: 'editor',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'sidebar',
      type: 'sidebar',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],

  [
    {
      id: 'shape',
      type: 'shape',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'absolute',
      type: 'absolute',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'relative',
      type: 'relative',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'browserWindow',
      type: 'browserWindow',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'laptopFrame',
      type: 'laptopFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'browserFrame',
      type: 'browserFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'containerFrame',
      type: 'containerFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
];
export const sceneFrameSized: types.SceneDefinition = [
  [
    {
      id: 'fromTop',
      type: 'absolute' as types.FrameType,
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromBottom',
      },
    },
  ],
  [
    {
      id: 'fromBottom',
      type: 'relative' as types.FrameType,
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromBottom',
      },
    },
  ],
];
export const sceneFrameTransformations: types.SceneDefinition = [
  [
    {
      id: 'fromBottom',
      type: 'shape',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromBottom',
        exit: 'toTop',
      },
    },
  ],
];
export const sceneViewPortBounded: types.SceneDefinition = [
  [
    {
      id: 'fromBottom',
      type: 'browserFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromBottom',
        exit: 'toTop',
      },
    },
  ],
  [
    {
      id: 'fromLeft',
      type: 'ideFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromLeft',
        exit: 'toRight',
      },
    },
  ],
  [
    {
      id: 'fromTop',
      type: 'browserFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromTop',
        exit: 'toBottom',
      },
    },
  ],
  [
    {
      id: 'fromRight',
      type: 'ideFrame',
      ...VIEWPORT_FRAME,
      motion: {
        enter: 'fromRight',
        exit: 'toLeft',
      },
    },
  ],
];
export const sceneComposition: types.SceneDefinition = [
  [
    {
      id: 'laptop',
      type: 'laptopFrame' as types.FrameType,
      ...VIEWPORT_FRAME,

      layout: {
        width: 1200,
        height: 720,
      },

      motion: {
        enter: 'fromTop',
        exit: 'toBottom',
      },

      children: [
        {
          id: 'container',
          type: 'card',
          layout: {
            x: 0,
            y: 0,
          },

          children: [
            {
              id: 'browser-1',
              type: 'browserFrame',
              layout: {
                width: 100,
                height: 100,
              },
              transform: {
                x: 500,
                y: 500,
              },
            },
            {
              id: 'browser-2',
              type: 'browserFrame',
              layout: {
                width: 200,
                height: 200,
              },
              transform: {
                x: 0,
                y: 0,
              },
            },
          ],
        },
      ],
    },
  ],
];
