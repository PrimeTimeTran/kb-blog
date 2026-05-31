import { AnimatedFrame, getVisibleSteps } from './components/SceneFrame';
import { CameraController, WorldLayer, useCamera } from '.';
import { useEffect, useMemo, useState } from 'react';

import { sceneRegistry } from './scene-registry';

export function BriefExhibit() {
  const time = useClock();
  const { camera, setCamera } = useCamera();

  const motion = sceneRegistry.motion;

  const visibleSteps = getVisibleSteps(motion, time);

  return (
    <CameraController camera={camera} setCamera={setCamera}>
      <WorldLayer camera={camera}>
        {visibleSteps.map(({ step, phase, t }) =>
          step.frames.map((frame) => (
            <AnimatedFrame key={`${frame.id}-${phase}`} frame={frame} time={t} phase={phase} />
          )),
        )}
      </WorldLayer>
    </CameraController>
  );
}
function getActiveStep(scene, time) {
  const steps = scene;

  let active = steps[0];

  for (let i = 0; i < steps.length; i++) {
    if (time >= steps[i].at) {
      active = steps[i];
    }
  }

  return active;
}

function useSceneController(scenes, sceneDuration = 3000) {
  const time = useClock();

  const sceneIndex = Math.floor(time / sceneDuration);
  const sceneStart = sceneIndex * sceneDuration;

  const sceneTime = time - sceneStart;

  const currentScene = scenes[sceneIndex] ?? scenes[scenes.length - 1];

  return {
    sceneIndex,
    currentScene,
    sceneTime,
    presentationTime: time,
  };
}

function useClock(fps = 60) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const id = setInterval(() => {
      setTime(performance.now() - start);
    }, 1000 / fps);

    return () => clearInterval(id);
  }, []);

  return time;
}

function useSceneClock(duration = 2000, fps = 60) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(999);

    const id = setInterval(() => {
      console.log('TICK');
      setTime((t) => t + 16);
    }, 1000 / fps);

    return () => {
      console.log('CLEANUP');
      clearInterval(id);
    };
  }, []);

  return time;
}
