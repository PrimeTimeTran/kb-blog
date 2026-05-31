import {
  buildTransform,
  resolveExitMotionStyle,
  resolveLayout,
  resolveMotionStyle,
  resolveTimelineStyle,
} from './helpers';

import { FrameRenderer } from './Frames';

export function AnimatedFrame({ frame, time, phase }: any) {
  if (!frame) return null;

  const motionEnter = phase === 'enter' ? resolveMotionStyle(frame, time) : {};
  const motionExit = phase === 'exit' ? resolveExitMotionStyle(frame, time) : {};
  const timelineStyle = resolveTimelineStyle(frame, time, phase) ?? {};

  // -----------------------------------
  // 🧠 RUN LAYOUT HERE (parent = frame)
  // -----------------------------------
  const layoutFrame = resolveLayout(frame, null);

  const style = {
    ...layoutFrame.style,
    ...timelineStyle,
    ...motionEnter,
    ...motionExit,
  };

  const layout = layoutFrame.layoutResolved ?? {};
  const offset = layoutFrame.layoutOffset ?? { x: 0, y: 0 };

  const finalX = layout.x + offset.x;
  const finalY = layout.y + offset.y;

  const transform = buildTransform({
    ...style,
    x: finalX,
    y: finalY,
  });

  const opacity = typeof style.opacity === 'number' ? style.opacity : 1;

  const containerStyle = {
    position: 'absolute',
    inset: 0,
    opacity,
    transform,
    transformOrigin: '0 0',
    willChange: 'transform, opacity',
  };

  return (
    <div style={containerStyle}>
      <FrameRenderer frame={layoutFrame}>
        {layoutFrame.children?.map((child) => (
          <AnimatedFrame key={child.id} frame={child} time={time} phase={phase} />
        ))}
      </FrameRenderer>
    </div>
  );
}
