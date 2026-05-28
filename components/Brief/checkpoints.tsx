import { PresentationScene } from './types';

export const demoScene: PresentationScene = {
  id: 'demo',
  frames: [
    {
      id: 'laptop',
      type: 'laptopFrame',
      x: 100,
      y: 60,
      width: 900,
      height: 560,
    },
    {
      id: 'browser-1',
      type: 'browserWindow',
      x: 140,
      y: 120,
      width: 520,
      height: 320,
      motion: 'fromLeft',
    },
    {
      id: 'browser-2',
      type: 'browserWindow',
      x: 240,
      y: 220,
      width: 520,
      height: 320,
      motion: 'fromBottom',
    },
  ],
};
