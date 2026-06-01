import * as types from '../types';

import { useEffect, useState } from 'react';

import { camera as defaultCamera } from '../constants/world';
import { getConfig } from '../config';

export function useCamera(
  initial = getConfig().camera.position ?? defaultCamera,
  paths = getConfig().camera.paths ?? [],
  interval = getConfig().cameraTickDuration,
) {
  const [camera, setCamera] = useState<types.Camera>(initial);
  const [index, setIndex] = useState(0);

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
    zoom: 0,
  });

  useEffect(() => {
    if (!getConfig().isCameraTickOn) return;
    if (!paths?.length) return;

    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % paths.length;
        setCamera(paths[next]);
        return next;
      });
    }, interval);

    return () => clearInterval(id);
  }, [paths, interval]);

  function updateCamera(delta: Partial<typeof offset>) {
    setOffset((o) => ({
      x: o.x + (delta.x ?? 0),
      y: o.y + (delta.y ?? 0),
      zoom: o.zoom + (delta.zoom ?? 0),
    }));
  }

  return {
    camera,
    index,
    setCamera,
    updateCamera,
  };
}

export function applyCamera(world: types.Coordinates, camera: types.Coordinates) {
  return {
    x: world.x - camera.x,
    y: world.y - camera.y,
  };
}
