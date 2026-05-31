import { useEffect, useState } from 'react';

import { getConfig } from '../config';

export function useTickScenes(sceneSet: any[], interval = getConfig().sceneTickDuration) {
  const [index, setIndex] = useState(0);

  const length = sceneSet?.length ?? 0;

  useEffect(() => {
    if (!length) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, interval);

    return () => clearInterval(id);
  }, [length, interval]);

  function tick() {
    if (!length) return;
    setIndex((i) => (i + 1) % length);
  }

  const scene = sceneSet[index] ?? null;

  return {
    scene,
    index,
    tick,
  };
}

export const useSceneClock = (duration: number, fps = 60) => {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!getConfig().isSceneTickOn) return;
    const id = setInterval(() => {
      setT((prev) => (prev + 16) % duration);
    }, 1000 / fps);

    return () => clearInterval(id);
  }, [duration, fps]);

  return t;
};
