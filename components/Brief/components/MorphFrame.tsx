import { useEffect, useMemo, useRef, useState } from 'react';

import { interpolate as flubberInterpolate } from 'flubber';
import { scale } from 'framer-motion';

function toPath(points: number[][]) {
  return 'M ' + points.map(([x, y]) => `${x} ${y}`).join(' L ') + ' Z';
}
const order = ['square', 'triangle', 'pentagon', 'octagon', 'square'];
const shapes: Record<string, number[][]> = {
  square: [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
  ],
  triangle: [
    [50, 0],
    [100, 100],
    [0, 100],
  ],
  pentagon: [
    [50, 0],
    [100, 35],
    [80, 100],
    [20, 100],
    [0, 35],
  ],
  octagon: [
    [30, 0],
    [70, 0],
    [100, 30],
    [100, 70],
    [70, 100],
    [30, 100],
    [0, 70],
    [0, 30],
  ],
};

export function MorphFrame() {
  const HOLD_MS = 600;

  const isHolding = useRef(false);
  const holdStart = useRef(0);
  const paths = useMemo(() => {
    return order.map((name) => toPath(shapes[name]));
  }, []);

  const interpolators = useMemo(() => {
    const result: ((t: number) => string)[] = [];

    for (let i = 0; i < paths.length - 1; i++) {
      result.push(
        flubberInterpolate(paths[i], paths[i + 1], {
          maxSegmentLength: 2,
        }),
      );
    }

    return result;
  }, [paths]);

  const tRef = useRef(0);
  const indexRef = useRef(0);
  const [, force] = useState(0);

  useEffect(() => {
    let raf: number;

    const loop = (now: number) => {
      if (isHolding.current) {
        // wait until hold finishes
        if (now - holdStart.current >= HOLD_MS) {
          isHolding.current = false;
        } else {
          raf = requestAnimationFrame(loop);
          return;
        }
      }

      tRef.current += 0.01;

      if (tRef.current >= 1) {
        tRef.current = 0;

        indexRef.current = (indexRef.current + 1) % interpolators.length;

        // enter hold phase AFTER switching shape
        isHolding.current = true;
        holdStart.current = now;
      }

      force((x) => x + 1);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [interpolators.length]);

  const easedT = tRef.current * tRef.current * (3 - 2 * tRef.current);
  const path = interpolators[indexRef.current]?.(easedT);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
        }}
      >
        <path d={path} fill="currentColor" />
      </svg>
    </div>
  );
}
