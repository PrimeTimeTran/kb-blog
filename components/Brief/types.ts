import { Dispatch, SetStateAction } from 'react';

import { MOTIONS } from './motions';

export type Coordinates = { x: number; y: number };

type Layout = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type Style = {
  borderRadius?: number | string;
};

type Transform = {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
};

export type MotionDefinition = {
  initial: Transform;
  animate: Transform;
  exit?: Transform;

  duration?: number;
  delay?: number;
  easing?: string;
};
export type MotionRegistry = typeof MOTIONS;
export type EnterMotionKey = keyof typeof MOTIONS.enter;
export type ExitMotionKey = keyof typeof MOTIONS.exit;

export type Keyframe = {
  at: number; // ms or normalized time
  layout?: Partial<Layout>;
  transform?: Partial<Transform>;
  style?: Partial<Style>;
};

export type Timeline = Keyframe[];

export type Node = {
  id: string;

  type: FrameType;

  layout?: Layout;

  transform?: Transform;

  style?: Style;

  props?: FrameProps;

  children?: Node[];

  motion?: {
    enter?: EnterMotionKey;
    exit?: ExitMotionKey;
  };

  timeline?: Timeline;
};

export type Scene = {
  id: string;
  nodes: Node[];
};

export type SceneLayer = Node[];
export type SceneDefinition = SceneLayer[];
export type SceneRegistry = Record<string, Scene>;

export type FrameType = 'shape' | 'image' | 'text' | 'browserFrame' | 'ideFrame' | 'terminal' | 'card';
export type FrameProps =
  | {
      type: 'shape';
      shape?: 'square' | 'circle' | 'pentagon' | 'octagon';
    }
  | {
      type: 'image';
      src: string;
    }
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'browserFrame';
      url?: string;
    }
  | {
      type: 'card';
      title?: string;
      description?: string;
    }
  | {
      type: 'terminal';
      command?: string;
    };

export type ResolvedFrame = {
  id: string;
  type: FrameType;

  layout: Required<Layout>;
  transform: Transform;
  style: Style;

  props?: FrameProps;
};

export type ResolvedNode = Node & {
  resolved: Coordinates;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export type useCameraTypes = {
  camera: Camera;
  index: number;
  setCamera: Dispatch<SetStateAction<Coordinates>>;
  updateCamera: (delta: Partial<Camera>) => void;
};
