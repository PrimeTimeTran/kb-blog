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

const VIEWPORT_W = 1200;
const VIEWPORT_H = 675;

export const VIEWPORT = {
  width: VIEWPORT_W,
  height: VIEWPORT_H,
};

export const VIEWPORT_FRAME = {
  layout: {
    x: 0,
    y: 0,
    ...VIEWPORT,
  },
};

export const camera = {
  worldCenter: WORLD_CENTER,
  viewportFrame: VIEWPORT_FRAME,
  position: {
    x: 0,
    y: 0,
    zoom: 0.75,
  },
  paths: [],

  // paths: [
  //   { x: -250, y: 0, zoom: 1 },
  //   { x: 250, y: 0, zoom: 1 },
  // ],
};
