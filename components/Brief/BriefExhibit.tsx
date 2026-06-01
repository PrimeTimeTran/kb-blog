import { CameraController, WorldLayer, useCamera } from './';
import { useSceneClock, useTickScenes } from './hooks/useScene';

import { AnimatePresence } from 'framer-motion';
import { SceneFrame } from './components/SceneFrame';
import { getConfig } from './config';

export function BriefExhibit() {
  const { camera, setCamera } = useCamera();
  const { scene } = useTickScenes(getConfig().activeScene);
  // const time = useSceneClock(4000);
  const time = 0;

  return (
    <div className="relative w-full h-full overflow-hidden ">
      <CameraController camera={camera} setCamera={setCamera}>
        <WorldLayer camera={camera}>
          <SceneComposer camera={camera} scene={scene} time={time} />
        </WorldLayer>
      </CameraController>
    </div>
  );
}

export function SceneComposer({ time, camera, scene }) {
  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {scene.map((frame) => (
          <SceneFrame key={frame.id} frame={frame} time={time} camera={camera} />
        ))}
      </AnimatePresence>
    </div>
  );
}
