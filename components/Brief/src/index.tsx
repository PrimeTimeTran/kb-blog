import * as types from '../types';

export function dumpSceneWithCamera(
  root: HTMLElement,
  camera: { x: number; y: number; zoom: number },
): types.FrameRecord[] {
  const nodes = root.querySelectorAll("[data-frame='true']");

  return Array.from(nodes).map((el: any) => {
    const rect = el.getBoundingClientRect();

    return {
      id: el.dataset.id,
      type: el.dataset.type,

      x: (rect.left - camera.x) / camera.zoom,
      y: (rect.top - camera.y) / camera.zoom,

      width: rect.width / camera.zoom,
      height: rect.height / camera.zoom,
    };
  });
}
export function dumpScene(root: HTMLElement): types.FrameRecord[] {
  const nodes = root.querySelectorAll("[data-frame='true']");

  return Array.from(nodes).map((el: any) => {
    const rect = el.getBoundingClientRect();

    return {
      id: el.dataset.id,
      type: el.dataset.type,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  });
}
export function toWorldCoords(rect: DOMRect, camera: { x: number; y: number; zoom: number }) {
  return {
    x: (rect.left - camera.x) / camera.zoom,
    y: (rect.top - camera.y) / camera.zoom,
    width: rect.width / camera.zoom,
    height: rect.height / camera.zoom,
  };
}
export function groupFrames(frames: types.Scene[]) {
  return frames.reduce<Record<string, types.Scene[]>>((acc, frame) => {
    const key = frame.group ?? 'root';

    if (!acc[key]) acc[key] = [];
    acc[key].push(frame);

    return acc;
  }, {});
}
