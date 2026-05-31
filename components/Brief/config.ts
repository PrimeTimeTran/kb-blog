import { WORLD, camera } from './constants/world';

import { scenes } from './scene';

export function getConfig() {
  return {
    isSceneTickOn: true,
    isCameraTickOn: false,
    sceneTickDuration: 3000,
    cameraTickDuration: 3000,
    camera,
    world: WORLD,
    // activeScene: scenes.sizing,
    // activeScene: scenes.transform,
    activeScene: scenes.motion,
    // activeScene: scenes.composition,
  };
}
