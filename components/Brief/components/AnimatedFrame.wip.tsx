import { FrameRenderer } from './Frames';
import { motions } from '../motions';

function clamp(t: number) {
  return Math.max(0, Math.min(1, t));
}

export function getVisibleSteps(motion, time) {
  const ENTER = 600;
  const EXIT = 600;

  return motion
    .map((step, i) => {
      const next = motion[i + 1];

      const enterStart = step.at;
      const exitStart = next?.at ?? Infinity;

      const enterT = clamp((time - enterStart) / ENTER);
      const hold = time >= enterStart + ENTER && time < exitStart;
      const exitT = clamp((time - exitStart) / EXIT);

      const isAlive = time < exitStart + EXIT && time >= enterStart;

      if (!isAlive) return null;

      return {
        step,
        phase: time < enterStart + ENTER ? 'enter' : time < exitStart ? 'hold' : 'exit',
        t: time < enterStart + ENTER ? enterT : time < exitStart ? 1 : exitT,
      };
    })
    .filter(Boolean);
}

// -------------------------
// TIMELINE RESOLUTION
// -------------------------
function interpolateStyles(a = {}, b = {}, t = 1) {
  const out: any = {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const key of keys) {
    const av = (a as any)[key];
    const bv = (b as any)[key];

    if (typeof av === 'number' && typeof bv === 'number') {
      out[key] = av + (bv - av) * t;
    } else {
      out[key] = t < 1 ? av : bv;
    }
  }

  return out;
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

// -------------------------
// TRANSFORM
// -------------------------
function buildTransform(style: any) {
  const x = style.x ?? 0;
  const y = style.y ?? 0;
  const scale = style.scale ?? 1;
  const rotate = style.rotate ?? 0;

  return `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
}

// -------------------------
// MAIN COMPONENT
// -------------------------
export function AnimatedFrame({ frame, time, phase }: any) {
  if (!frame) return null;

  // -------------------------
  // MOTION LAYERS
  // -------------------------
  const motionEnter = phase === 'enter' ? resolveMotionStyle(frame, time) : {};

  const motionExit = phase === 'exit' ? resolveExitMotionStyle(frame, time) : {};

  // -------------------------
  // TIMELINE (always active except optionally during exit)
  // -------------------------
  const timelineStyle = resolveTimelineStyle(frame, time, phase) ?? {};

  // -------------------------
  // FINAL STYLE MERGE (CRITICAL ORDER)
  // -------------------------
  const style = {
    ...frame.style, // base
    ...timelineStyle, // keyframes
    ...motionEnter, // enter animation
    ...motionExit, // exit animation
  };

  const transform = buildTransform(style);
  const opacity = typeof style.opacity === 'number' ? style.opacity : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: frame.x ?? 0,
        top: frame.y ?? 0,
        width: frame.width ?? 'auto',
        height: frame.height ?? 'auto',
        opacity,
        transform,
        transformOrigin: 'center',
        willChange: 'transform, opacity',
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <FrameRenderer frame={frame} style={style} />

        {Array.isArray(frame.children) &&
          frame.children.map((child) => <AnimatedFrame key={child.id} frame={child} time={time} phase={phase} />)}
      </div>
    </div>
  );
}
