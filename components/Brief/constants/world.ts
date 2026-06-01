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

export function getDefaultZoom() {
  const zoomToFit = Math.min(VIEWPORT.width / WORLD.width, VIEWPORT.height / WORLD.height);

  const ZOOM_OUT_MARGIN = 1.4;

  return zoomToFit * ZOOM_OUT_MARGIN;
}
export const zoomToFit = Math.min(VIEWPORT.width / WORLD.width, VIEWPORT.height / WORLD.height);

export const camera = {
  worldCenter: WORLD_CENTER,
  viewportFrame: VIEWPORT_FRAME,
  position: {
    x: VIEWPORT_FRAME.layout.x,
    y: VIEWPORT_FRAME.layout.y,
    zoom: getDefaultZoom(),
  },
  paths: [],
};
