import { VIEWPORT_FRAME } from './constants/world';

export const sceneFrameSized = [
  [
    {
      id: 'fromTop',
      type: 'absolute',
      ...VIEWPORT_FRAME,
      motion: 'fromBottom',
    },
  ],
  [
    {
      id: 'fromBottom',
      type: 'relative',
      ...VIEWPORT_FRAME,
      motion: 'fromBottom',
    },
  ],
];
export const sceneFrameTransformations = [
  [
    {
      id: 'fromBottom',
      type: 'shape',
      ...VIEWPORT_FRAME,
      motion: 'fromBottom',
      exitMotion: 'toTop',
    },
  ],
];
export const sceneViewPortBounded = [
  [
    {
      id: 'fromBottom',
      type: 'browserFrame',
      ...VIEWPORT_FRAME,
      motion: 'fromBottom',
      exitMotion: 'toTop',
    },
  ],

  [
    {
      id: 'fromLeft',
      type: 'ideFrame',
      ...VIEWPORT_FRAME,
      motion: 'fromLeft',
      exitMotion: 'toRight',
    },
  ],

  [
    {
      id: 'fromTop',
      type: 'browserFrame',
      ...VIEWPORT_FRAME,
      motion: 'fromTop',
      exitMotion: 'toBottom',
    },
  ],

  [
    {
      id: 'fromRight',
      type: 'ideFrame',
      ...VIEWPORT_FRAME,
      motion: 'fromRight',
      exitMotion: 'toLeft',
    },
  ],
];
export const sceneComposition = [
  [
    {
      id: 'laptop',
      type: 'laptopFrame',
      ...VIEWPORT_FRAME,
      width: 1200,
      height: 720,
      motion: 'fromTop',
      exitMotion: 'toBottom',

      children: [
        {
          type: 'containerFrame',
          layout: {
            type: 'flex',
            direction: 'row',
            gap: 40,
            justify: 'center',
            align: 'center',
          },

          children: [
            {
              id: 'browser-1',
              type: 'browserFrame',
              width: 100,
              height: 100,

              transform: {
                x: 500,
                y: 500,
              },
            },
            {
              id: 'browser-2',
              type: 'browserFrame',
              width: 200,
              height: 200,

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
