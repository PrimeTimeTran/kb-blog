import { motions } from './data';

export type MotionKey = keyof typeof motions;

export type FrameType =
  | 'absolute'
  | 'relative'
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

export type SceneType = 'float' | 'motion' | 'composition' | 'scroll' | 'enter';
export type Scene = {
  type: SceneType;
  frames: Frame[];
};
export type SceneRegistry = Record<SceneType, Scene>;

export type Frame = {
  id: string;
  type: FrameType;
  className: string;
  motion?: string;
  group?: string;
  children?: Frame[];
  x: number;
  y: number;
  width?: number;
  height?: number;
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
