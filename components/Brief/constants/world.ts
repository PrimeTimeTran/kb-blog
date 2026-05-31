export const WORLD_SCALE = 1;

export const WORLD_W = 1920;
export const WORLD_H = 1080;

export const WORLD = {
  scale: WORLD_SCALE,
  width: WORLD_W,
  height: WORLD_H,
};

export const WORLD_CENTER = Object.freeze({
  x: WORLD_W / 2,
  y: WORLD_H / 2,
});

const FRAME_W = 1200;
const FRAME_H = 750;

export const VIEWPORT_FRAME = {
  width: FRAME_W,
  height: FRAME_H,

  x: WORLD_CENTER.x - FRAME_W / 2,
  y: WORLD_CENTER.y - FRAME_H / 2,
};

export const camera = {
  worldCenter: WORLD_CENTER,
  viewportFrame: VIEWPORT_FRAME,
  position: {
    x: 0,
    y: 0,
    zoom: 0.5,
  },
  paths: [],

  // paths: [
  //   { x: -250, y: 0, zoom: 1 },
  //   { x: 250, y: 0, zoom: 1 },
  // ],
};
