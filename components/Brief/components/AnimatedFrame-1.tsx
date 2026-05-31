import { FrameRenderer } from './Frames';
import { motions } from '../motions';

function clamp(t: number) {
  return Math.max(0, Math.min(1, t));
}

function resolveTimelineStyle(frame, time, phase) {
  const steps = frame?.timeline;

  if (!steps?.length) {
    console.log('[TIMELINE] no steps', frame.id);
    return {};
  }

  if (phase === 'exit') {
    console.log('[TIMELINE] exit phase -> skipping timeline', frame.id);
    return {};
  }

  if (time <= steps[0].at) {
    console.log('[TIMELINE] before first step', frame.id, steps[0].style);
    return steps[0].style ?? {};
  }

  if (time >= steps[steps.length - 1].at) {
    console.log('[TIMELINE] after last step', frame.id, steps[steps.length - 1].style);
    return steps[steps.length - 1].style ?? {};
  }

  for (let i = 0; i < steps.length - 1; i++) {
    const from = steps[i];
    const to = steps[i + 1];

    if (time >= from.at && time <= to.at) {
      const span = to.at - from.at || 1;
      const t = (time - from.at) / span;

      const style = interpolateStyles(from.style, to.style, clamp(t));

      console.log('[TIMELINE] interpolate', {
        frame: frame.id,
        from: from.at,
        to: to.at,
        t,
        result: style,
      });

      return style;
    }
  }

  console.log('[TIMELINE] fallback', frame.id);
  return steps[0].style ?? {};
}

function resolveMotionStyle(frame: any, t: number) {
  const def = motions?.[frame.motion];
  if (!def) return {};

  const out: any = {};

  for (const key of Object.keys(def.initial ?? {})) {
    const a = def.initial[key];
    const b = def.animate[key];

    if (typeof a === 'number' && typeof b === 'number') {
      out[key] = a + (b - a) * t;
    } else {
      out[key] = t < 1 ? a : b;
    }
  }

  return out;
}

function resolveExitMotionStyle(frame: any, t: number) {
  const def = motions?.[frame.exitMotion];
  if (!def?.exit) return {};

  const out: any = {};

  for (const key of Object.keys(def.exit)) {
    const a = def.initial?.[key] ?? def.animate?.[key];
    const b = def.exit[key];

    if (typeof a === 'number' && typeof b === 'number') {
      out[key] = a + (b - a) * t;
    } else {
      out[key] = t < 1 ? a : b;
    }
  }

  return out;
}

const LAPTOP_FRAME = {
  width: 1200,
  height: 720,

  viewport: {
    x: 120,
    y: 80,
    width: 960,
    height: 560,
  },
};

function applyLayoutTree(root) {
  function walk(frame, parent = null) {
    const resolved = resolveLayout(frame, parent);

    if (!resolved.children) return resolved;

    return {
      ...resolved,
      children: resolved.children.map((child) => walk(child, resolved)),
    };
  }

  return walk(root, null);
}

function resolveLayout(frame, parent) {
  const area = parent?.viewport ?? {
    x: 0,
    y: 0,
    width: parent?.width ?? frame.width ?? 0,
    height: parent?.height ?? frame.height ?? 0,
  };

  const next = {
    ...frame,
  };

  const viewport = {
    x: area.x,
    y: area.y,
    width: frame.width ?? area.width,
    height: frame.height ?? area.height,
  };

  next.viewport = viewport;

  // -----------------------------------
  // FLEX LAYOUT
  // -----------------------------------
  if (frame.layout?.type === 'flex') {
    const children = (frame.children ?? []).filter(Boolean);
    const gap = frame.layout.gap ?? 0;

    const totalWidth = children.reduce((sum, c) => sum + (c.width ?? 520), 0) + gap * Math.max(children.length - 1, 0);

    let cursorX = viewport.x + (viewport.width - totalWidth) / 2;
    const centerY = viewport.y + viewport.height / 2;

    next.children = children.map((child) => {
      const width = child.width ?? 520;
      const height = child.height ?? 300;

      const resolvedChild = {
        ...child,
        layoutResolved: {
          x: cursorX,
          y: centerY - height / 2,
          width,
          height,
        },
      };

      cursorX += width + gap;

      // 🔥 recurse ONCE, return result
      return resolveLayout(resolvedChild, next);
    });

    return next;
  }

  // -----------------------------------
  // NON-FLEX RECURSION
  // -----------------------------------
  if (frame.children?.length) {
    next.children = frame.children.filter(Boolean).map((child) => resolveLayout(child, next));
  }

  return next;
}
function buildTransform(style: any) {
  const x = style.x ?? 0;
  const y = style.y ?? 0;
  const scale = style.scale ?? 1;
  const rotate = style.rotate ?? 0;

  return `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
}
export function AnimatedFrame({ frame, time, phase }: any) {
  if (!frame) return null;

  const motionEnter = phase === 'enter' ? resolveMotionStyle(frame, time) : {};
  const motionExit = phase === 'exit' ? resolveExitMotionStyle(frame, time) : {};
  const timelineStyle = resolveTimelineStyle(frame, time, phase) ?? {};

  // -----------------------------------
  // 🧠 RUN LAYOUT (ONLY FOR THIS NODE)
  // -----------------------------------
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
      {/* 🧠 THIS RESTORES LOCAL SPACE */}
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
