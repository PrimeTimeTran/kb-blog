import { AnimatedFrame, CameraController, WorldLayer, useCamera } from './';
import { useEffect, useMemo, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { groupFrames } from './src';
import { sceneRegistry } from './scenes';

export function BriefExhibit() {
  const { scene } = useTickScenes(sceneRegistry.motion.enter);
  const { camera, setCamera } = useCamera();
  return (
    <div className="relative w-full h-full overflow-hidden bg-red-100">
      <CameraController camera={camera} setCamera={setCamera}>
        <WorldLayer camera={camera}>
          <SceneComposer camera={camera} sceneFrames={scene} />
        </WorldLayer>
      </CameraController>
    </div>
  );
}

export function SceneComposer({ sceneFrames }) {
  const groups = useMemo(() => groupFrames(sceneFrames), [sceneFrames]);

  return (
    <div className="relative w-full h-full bg-orange-400">
      {(groups.root ?? []).map((frame) => (
        <AnimatePresence mode="wait">
          <AnimatedFrame key={frame.id} frame={frame} />
        </AnimatePresence>
      ))}
    </div>
  );
}

export function useTickScenes(sceneSet) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sceneSet.length);
    }, 3000);

    return () => clearInterval(id);
  }, [sceneSet.length]);

  function tick() {
    setIndex((i) => (i + 1) % sceneSet.length);
  }

  const scene = sceneSet[index];

  return { scene, index, tick };
}
