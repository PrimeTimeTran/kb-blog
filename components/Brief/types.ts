// =========================
// BASIC PRIMITIVES
// =========================

export type Transform = {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
};

export type Style = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
  rotate?: number;
  borderRadius?: number | string;
};

export type FrameProps = {
  shape?: 'square' | 'circle' | 'pentagon' | 'octagon';
  src?: string;
  text?: string;
};

// =========================
// MOTION SYSTEM
// =========================

export type MotionKey = string;

export type MotionDefinition = {
  initial: Transform;
  animate: Transform;
  exit?: Transform;
};

export type MotionRegistry = Record<MotionKey, MotionDefinition>;

// =========================
// TIMELINE SYSTEM
// =========================

export type Keyframe = {
  at: number;
  style?: Partial<Style>;
};

export type Timeline = Keyframe[];

// =========================
// SCENE GRAPH (KEYNOTE CORE)
// =========================

export type NodeBase = {
  id: string;
  type: FrameType;
  props?: FrameProps;
};

export type ShapeNode = NodeBase & {
  type: 'shape';
  style: Style;
  timeline?: Timeline;

  motion?: MotionKey;
  exitMotion?: MotionKey;

  children?: Node[];
};

export type ContainerNode = NodeBase & {
  type: 'container';
  children: Node[];
  timeline?: Timeline;
};

export type MotionNode = NodeBase & {
  type: 'motion';
  children: Node[];
  enter?: Timeline;
  exit?: Timeline;
};

export type Node = ShapeNode | ContainerNode | MotionNode;

// =========================
// SCENE
// =========================

export type Scene = {
  id: string;
  nodes: Node[];
};

export type SceneRegistry = Record<string, Scene>;

// =========================
// RUNTIME OUTPUT
// =========================

export type ResolvedFrame = {
  id: string;
  type: FrameType;
  style: Style;
  transform: Transform;
  props?: FrameProps;
};

// =========================
// FRAME TYPE
// =========================

export type FrameType = 'shape' | 'container' | 'browserFrame' | 'ideFrame' | 'terminal' | 'card';
