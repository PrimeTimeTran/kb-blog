import { WORLD, camera } from './constants/world';

import { scenes } from './scene';

export function getConfig() {
  return {
    isSceneTickOn: true,
    isCameraTickOn: false,
    isCameraBypassed: true,
    sceneTickDuration: 10000,
    cameraTickDuration: 3000,
    camera,
    world: WORLD,
    activeScene: scenes.focus,
    // activeScene: scenes.sizing,
    // activeScene: scenes.transform,
    // activeScene: scenes.motion,
    // activeScene: scenes.composition,
  };
}
