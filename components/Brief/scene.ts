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
  // - Focus on a screen.
  focus: sceneFrameFocused,
  // - View frames.
  frames: sceneFrames,
  // - We can render frames
  sizing: sceneFrameSized,
  // - We can animate frames shape
  transform: sceneFrameTransformations,
  // - We can animate frames in/out of viewport
  motion: sceneViewPortBounded,
  // - We can compose frames relative to one another
  composition: sceneComposition,
};
