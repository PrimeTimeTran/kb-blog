import { motionVariants } from './data';

export type MotionKey = keyof typeof motionVariants;
export type FrameType =
  | 'browserFrame'
  | 'ideFrame'
  | 'sidebar'
  | 'editor'
  | 'terminal'
  | 'chart'
  | 'stats'
  | 'card'
  | 'laptopFrame'
  | 'browserWindow';

export type Scene = Frame[];
export type SceneRegistry = Record<SceneType, Scene>;
export type SceneType = 'float' | 'motion' | 'composition' | 'scroll';
export type Frame = {
  id: string;
  type: FrameType;
  className: string;
  motion?: string;
  group?: string;
};
export type PresentationScene = {
  id: string;
  frames: FrameRecord[];
};
export type FrameRecord = {
  id: string;
  type: FrameType;

  x: number;
  y: number;
  width: number;
  height: number;

  motion?: MotionKey;
};
