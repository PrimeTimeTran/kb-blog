export const WORLD_SCALE = 1;
export const WORLD_W = 1920;
export const WORLD_H = 1080;
export const ENABLE_CAMERA_TICK = false;

export const WORLD_CENTER = Object.freeze({
  x: WORLD_W / 2,
  y: WORLD_H / 2,
});

export const WORLD = {
  width: WORLD_W,
  height: WORLD_H,
};

export const worldToScreen = (v, camera) => ({
  x: (v.x + camera.x) * camera.zoom,
  y: (v.y + camera.y) * camera.zoom,
  width: v.width * camera.zoom,
  height: v.height * camera.zoom,
});

const FRAME_W = 1200;
const FRAME_H = 750;

export const CENTERED_FRAME = {
  width: FRAME_W,
  height: FRAME_H,

  x: WORLD_CENTER.x - FRAME_W / 2,
  y: WORLD_CENTER.y - FRAME_H / 2,
};

const offset = {
  x: 0,
  y: 0,
};

export const cameraConfig = {
  default: {
    position: {
      x: 0,
      y: 0,
      zoom: 0.5,
    },

    paths: [
      { x: -250, y: 0, zoom: 1 },
      { x: 250, y: 0, zoom: 1 },
    ],
  },
};
