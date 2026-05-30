im
port * as types from './types';
import { CENTERED_FRAME, WORLD, WORLD_CENTER } from './constants';

export const demoScene = Object.freeze([
  {
    id: 'shape',
    type: 'shape',
    x: 600,
    y: 360,
    width: 300,
    height: 300,

    timeline: [
      {
        at: 0,
        style: {
          shape: 'square',
          scale: 1,
          opacity: 1,
        },
      },
      {
        at: 800,
        style: {
          shape: 'pentagon',
          scale: 1.1,
          opacity: 1,
        },
      },
      {
        at: 1600,
        style: {
          shape: 'octagon',
          scale: 1,
          opacity: 1,
        },
      },
      {
        at: 2400,
        style: {
          shape: 'square',
          scale: 1,
          opacity: 1,
        },
      },
    ],
  },
]);

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
    {
      at: 0,
      frames: [
        {
          id: 'fromBottom',
          type: 'browserFrame',
          ...CENTERED_FRAME,
          motion: 'fromBottom',
          exitMotion: 'toTop',
        },
      ],
    },

    {
      at: 800,
      frames: [
        {
          id: 'fromLeft',
          type: 'ideFrame',
          ...CENTERED_FRAME,
          motion: 'fromLeft',
          exitMotion: 'toRight',
        },
      ],
    },

    {
      at: 1600,
      frames: [
        {
          id: 'fromTop',
          type: 'browserFrame',
          ...CENTERED_FRAME,
          motion: 'fromTop',
          exitMotion: 'toBottom',
        },
      ],
    },

    {
      at: 2400,
      frames: [
        {
          id: 'fromRight',
          type: 'ideFrame',
          ...CENTERED_FRAME,
          motion: 'fromRight',
          exitMotion: 'toLeft',
        },
      ],
    },
  ] satisfies MotionStep[],
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

const sceneRegistry: types.SceneRegistry = Object.freeze({
  demoScene: demoScene,
  motion: Object.freeze(motionScene.enter),
});

export { sceneRegistry };
