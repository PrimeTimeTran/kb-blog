import * as types from './types';

import {
  sceneComposition,
  sceneFrameFocused,
  sceneFrameSized,
  sceneFrameTransformations,
  sceneFrames,
  sceneViewPortBounded,
} from './scene-registry';

export const scenes: types.SceneRegistry = {
  focus: sceneFrameFocused,
  frames: sceneFrames,
  // 1. We can render frames
  sizing: sceneFrameSized,
  // 2. We can animate frames shape
  transform: sceneFrameTransformations,
  // 3. We can animate frames in/out of viewport
  motion: sceneViewPortBounded,
  // 4. We can compose frames relative to one another
  composition: sceneComposition,
  // float: {
  //   a: [
  //     [
  //       {
  //         id: 'browser-frame',
  //         type: 'browserFrame',
  //         className: 'left-[8%] top-[10%] w-[760px] h-[460px]',
  //       },
  //       {
  //         id: 'floating-editor',
  //         type: 'editor',
  //         className: 'right-[6%] top-[18%] w-[360px] h-[220px]',
  //       },
  //       {
  //         id: 'floating-terminal',
  //         type: 'terminal',
  //         className: 'right-[14%] bottom-[14%] w-[280px] h-[160px]',
  //       },
  //     ],

  //     [
  //       {
  //         id: 'ide-frame',
  //         type: 'ideFrame',
  //         className: 'left-[4%] top-[6%] w-[92%] h-[86%]',
  //       },
  //       {
  //         id: 'ide-sidebar',
  //         type: 'sidebar',
  //         className: 'left-[6%] top-[12%] w-[220px] h-[70%]',
  //       },
  //       {
  //         id: 'ide-editor',
  //         type: 'editor',
  //         className: 'left-[24%] top-[12%] w-[52%] h-[70%]',
  //       },
  //       {
  //         id: 'ide-terminal',
  //         type: 'terminal',
  //         className: 'right-[6%] bottom-[10%] w-[300px] h-[220px]',
  //       },
  //     ],
  //   ],
  // },
  // scroll: {
  //   c: [
  //     [
  //       {
  //         id: 'editor1',
  //         className: 'left-[5%] top-[10%] w-[420px] h-[260px]',
  //         type: 'editor',
  //       },
  //       {
  //         id: 'terminal1',
  //         className: 'right-[8%] top-[22%] w-[260px] h-[160px]',
  //         type: 'terminal',
  //       },
  //     ],

  //     [
  //       {
  //         id: 'editor2',
  //         className: 'left-[18%] top-[18%] w-[500px] h-[280px]',
  //         type: 'editor',
  //       },
  //       {
  //         id: 'terminal2',
  //         className: 'right-[15%] bottom-[12%] w-[300px] h-[180px]',
  //         type: 'terminal',
  //       },
  //     ],
  //   ],

  //   d: [
  //     [
  //       {
  //         id: 'frame',
  //         type: 'frame',
  //         className: 'left-[6%] top-[8%] w-[620px] h-[360px]',
  //       },
  //       {
  //         id: 'editor',
  //         type: 'editor',
  //         className: 'left-[12%] top-[14%] w-[420px] h-[260px]',
  //         motion: 'fadeInUp',
  //       },
  //     ],
  //   ],
  // },
};
