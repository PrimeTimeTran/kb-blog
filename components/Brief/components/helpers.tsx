import { motions } from '../motions';

export const LAPTOP_FRAME = {
  width: 1200,
  height: 720,

  viewport: {
    x: 120,
    y: 80,
    width: 960,
    height: 560,
  },
};

export function interpolateStyles(a = {}, b = {}, t = 1) {
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

export function resolveTimelineStyle(frame, time, phase) {
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

export function resolveMotionStyle(frame: any, t: number) {
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

export function resolveExitMotionStyle(frame: any, t: number) {
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

export function applyLayoutTree(root) {
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

export function resolveLayout(frame, parent) {
  const area = parent?.viewport ?? {
    x: 0,
    y: 0,
    width: parent?.width ?? frame.width ?? 0,
    height: parent?.height ?? frame.height ?? 0,
  };

  let next = {
    ...frame,
  };

  const viewport = {
    x: area.x,
    y: area.y,
    width: frame.width ?? area.width,
    height: frame.height ?? area.height,
  };

  next.viewport = viewport;

  // 2. FLEX LAYOUT
  if (frame.layout?.type === 'flex') {
    const children = frame.children ?? [];
    const gap = frame.layout.gap ?? 0;

    const totalWidth = children.reduce((sum, c) => sum + (c.width ?? 0), 0) + gap * Math.max(children.length - 1, 0);

    let cursorX = viewport.x + (viewport.width - totalWidth) / 2;
    const centerY = viewport.y + viewport.height / 2;

    next.children = children.map((child) => {
      const width = child.width ?? 0;
      const height = child.height ?? 0;

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

      return resolveLayout(resolvedChild, next); // 🔥 recurse here
    });

    return next;
  }

  // 3. NON-FLEX: still recurse
  if (frame.children?.length) {
    next.children = frame.children.map((child) => resolveLayout(child, next));
  }

  return next;
}

export function buildTransform(style: any) {
  const x = style.x ?? 0;
  const y = style.y ?? 0;
  const scale = style.scale ?? 1;
  const rotate = style.rotate ?? 0;

  return `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
}

function clamp(t: number) {
  return Math.max(0, Math.min(1, t));
}
