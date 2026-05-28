import * as types from './types';

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
export const sceneRegistry: types.SceneRegistry = {
  composition: {
    nested: [compositionScene],
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
  motion: {
    enter: [
      [
        {
          id: 'fromBottom',
          type: 'browserFrame',
          className: 'left-[10%] top-[10%] w-[780px] h-[460px]',
          motion: 'fromBottom',
        },
      ],

      [
        {
          id: 'fromLeft',
          type: 'ideFrame',
          className: 'left-[10%] top-[10%] w-[780px] h-[460px]',
          motion: 'fromLeft',
        },
      ],

      [
        {
          id: 'fromTop',
          type: 'browserFrame',
          className: 'left-[10%] top-[10%] w-[780px] h-[460px]',
          motion: 'fromTop',
        },
      ],

      [
        {
          id: 'fromRight',
          type: 'ideFrame',
          className: 'left-[10%] top-[10%] w-[780px] h-[460px]',
          motion: 'fromRight',
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
