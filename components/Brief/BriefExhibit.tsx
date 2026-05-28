import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import * as types from './types';
import { groupFrames } from './src';
import { sceneRegistry } from './scenes';
import { AnimatedFrame, CameraController } from './components';

export { sceneRegistry };

export function BriefExhibit() {
  // const scenes = useMemo(() => sceneRegistry.motion., []);
  const scenes = useMemo(() => sceneRegistry.composition.nested, []);
  const [index, setIndex] = useState(0);
  const [camera, setCamera] = useState({
    x: 350,
    y: 220,
    zoom: 0.5,
  });

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <CameraController camera={camera} setCamera={setCamera}>
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2"
          style={{
            transformOrigin: 'center',
          }}
          animate={{
            x: camera.x,
            y: camera.y,
            scale: camera.zoom,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <SceneComposer sceneFrames={scenes[index]} />
        </motion.div>
      </CameraController>
    </div>
  );
}

export function SceneComposer({ sceneFrames }: { sceneFrames: types.FrameUI[] }) {
  const groups = useMemo(() => groupFrames(sceneFrames), [sceneFrames]);
  return (
    <div
      id="scene-root"
      className="absolute left-1/2 top-1/2 w-[1200px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-green-500/10 border border-green-400"
    >
      {/* CENTER MARK (debug origin) */}
      <div className="absolute right-0 bottom-0 -translate-x-1/2 -translate-y-1/2" />

      {/* ROOT */}
      {(groups.root ?? []).map((frame) => (
        <AnimatedFrame key={frame.id} frame={frame} />
      ))}

      {/* GROUPS */}
      {Object.entries(groups)
        .filter(([k]) => k !== 'root')
        .map(([groupId, groupframes]) => (
          <div key={groupId} className="absolute inset-0">
            {groupframes.map((frame) => (
              <AnimatedFrame
                key={frame.id}
                frame={frame}
                // type={frame.type}
                // motionType={frame.motion}
                // className={frame.className}
              />
            ))}
          </div>
        ))}
    </div>
  );
}
