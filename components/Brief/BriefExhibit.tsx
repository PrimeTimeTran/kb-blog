import { AnimatedFrame, CameraController, WorldLayer, useCamera } from './';
import { useEffect, useMemo, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { groupFrames } from './src';
import { sceneRegistry } from './scenes';

export function BriefExhibit() {
  // const { scene } = useTickScenes(sceneRegistry.transforms.shapes);
  const { scene } = useTickScenes(sceneRegistry.sizing.preview);
  // const { scene } = useTickScenes(sceneRegistry.motion.enter);

  const time = useSceneClock(4000); // full cycle
  const { camera, setCamera } = useCamera();
  return (
    <div className="relative w-full h-full overflow-hidden bg-red-100">
      <CameraController camera={camera} setCamera={setCamera}>
        <WorldLayer camera={camera}>
          <SceneComposer camera={camera} sceneFrames={scene} time={time} />
        </WorldLayer>
      </CameraController>
    </div>
  );
}

export function SceneComposer({ time, camera, sceneFrames }) {
  const groups = useMemo(() => groupFrames(sceneFrames), [sceneFrames]);

  return (
    <div className="relative w-full h-full bg-orange-400">
      <AnimatePresence mode="wait">
        {(groups.root ?? []).map((frame) => (
          <AnimatedFrame key={frame.id} time={time} camera={camera} frame={frame} />
        ))}
      </AnimatePresence>
    </div>
  );
}
export function useTickScenes(sceneSet: any[], interval = 3000) {
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

const useSceneClock = (duration: number, fps = 60) => {
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setT((prev) => (prev + 16) % duration);
    }, 1000 / fps);

    return () => clearInterval(id);
  }, [duration, fps]);

  return t;
};
