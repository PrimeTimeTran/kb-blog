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
  const resolved = resolveLayout(frame, {
    viewport: {
      x: 0,
      y: 0,
      width: frame.width ?? 1200,
      height: frame.height ?? 720,
    },
  });

  const layout = resolved.layoutResolved ?? {};
  const offset = resolved.layoutOffset ?? { x: 0, y: 0 };

  const finalX = layout.x + offset.x;
  const finalY = layout.y + offset.y;

  const style = {
    ...resolved.style,
    ...timelineStyle,
    ...motionEnter,
    ...motionExit,
  };

  const transform = buildTransform({
    ...style,
    x: finalX,
    y: finalY,
  });

  const opacity = typeof style.opacity === 'number' ? style.opacity : 1;

  // const containerStyle = {
  //   position: 'absolute',
  //   transform,
  //   opacity,
  //   transformOrigin: '0 0',
  //   willChange: 'transform, opacity',

  //   width: layout.width ?? frame.width ?? 300,
  //   height: layout.height ?? frame.height ?? 200,
  // };

  const containerStyle = {
    position: 'absolute',
    transform,
    opacity,
    transformOrigin: '0 0',
    width: layout.width ?? 520,
    height: layout.height ?? 300,
  };

  console.log('FRAME:', frame.id, frame.type, frame.layoutResolved);
  console.log('CHILDREN:', frame.children);

  return (
    <div style={containerStyle}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <FrameRenderer frame={frame} />

        {frame.children?.filter(Boolean).map((child) => (
          <AnimatedFrame key={child.id} frame={child} time={time} phase={phase} />
        ))}
      </div>
    </div>
  );
}
