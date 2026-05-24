'use client';

import React, {   useLayoutEffect, useRef, useState } from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

import { useScroll } from '@/providers/ScrollProvider';
import { graffitiWords } from '@/data/graffiti';

function GraffitiItem({ a, scrollY, time }: any) {
  const idleX = useTransform(time, () => 0);
  const idleY = useTransform(time, (t) => {
    // slow upward flow
    const driftUp = -t * 0.02 * (0.5 + a.drift);

    // soft breathing (tiny, not directional)
    const breathe = Math.cos(t * 0.0006 + a.top * 0.01) * 1.2;

    return driftUp + breathe;
  });

  const speed = 0.4 + a.drift * 1.6;
  const depth = 0.6 + a.opacity;

  // 🚨 IMPORTANT: scrollY is a NUMBER, not MotionValue
  const scrollMotion = scrollY * speed * depth * -1;

  const wobble = Math.sin(scrollY * 0.002 + a.left * 0.01) * 5;

  return (
    <div
      className="absolute select-none"
      style={{
        top: a.top,
        left: a.left,
        opacity: a.opacity,
        transform: `translate3d(0, ${scrollMotion + wobble}px, 0)`,
        willChange: 'transform',
      }}
    >
      <motion.div
        className={`whitespace-nowrap animate-[wiggle_12s_ease-in-out_infinite] animate-pulse-soft-glow ${a.size} ${a.color}`}
        style={{
          x: idleX,
          y: idleY,
          rotate: a.rotate,
        }}
      >
        {a.text}
      </motion.div>
    </div>
  );
}
export default function GraffitiWrapper({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [anchors, setAnchors] = useState<GraffitiAnchor[]>([]);
  const { scrollY } = useScroll();
  const time = useTime();

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const frame1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const root = contentRef.current;
        if (!root) return;

        setAnchors(buildGraffitiAnchors(root));
      });
    });

    return () => cancelAnimationFrame(frame1);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
        {anchors.map((a) => (
          <GraffitiItem key={a.id} a={a} scrollY={scrollY} time={time} />
        ))}
      </div>

      {/* CONTENT */}
      <div ref={contentRef} className="mdx-content relative z-10">
        {children}
      </div>
    </div>
  );
}
function buildGraffitiAnchors(root: HTMLElement): GraffitiAnchor[] {
  const articles = root.querySelectorAll('article');
  return Array.from(articles).map((el, i) => {
    const rect = el.getBoundingClientRect();

    const seed = Math.floor(rect.top) * 31 + Math.floor(rect.left) * 17;

    const r1 = seededRandom(seed + 11);
    const r2 = seededRandom(seed + 21);
    const r3 = seededRandom(seed + 31);
    const r4 = seededRandom(seed + 41);

    const side = r1 > 0.5 ? 1 : -1;

    const center = rect.left + window.scrollX + rect.width / 2;
    const maxOffset = rect.width * 0.6 + 120;
    // symmetric signed offset
    const direction = r1 < 0.5 ? -1 : 1;
    const offset = r2 * maxOffset * direction;
    const jitter = (r3 - 0.5) * 30;
    const left = center + offset + jitter;
    return {
      id: `graffiti-${i}`,

      // preserve original vertical rhythm
      top: rect.top + window.scrollY,
      left,
      text: graffitiWords[i % graffitiWords.length],
      rotate: (r3 - 0.5) * 20,
      drift: 0.02 + r4 * 0.06,
      opacity: 0.15 + r1 * 0.35,
      size: r2 > 0.66 ? 'text-6xl' : r2 > 0.33 ? 'text-4xl' : 'text-2xl',

      color: graffitiColors[Math.floor(r1 * graffitiColors.length)],
    };
  });
}
const graffitiColors = [
  'text-primary',
  'text-secondary',
  'text-tertiary',

  'text-primary/80',
  'text-secondary/80',
  'text-tertiary/80',

  'text-primary-container',
  'text-secondary-container',
  'text-tertiary-container',

  'text-on-surface-variant',
  'text-outline',

  // optional vivid accents
  'text-error',
  'text-error/80',
];
const graffitiColors2 = [
  'text-on-surface/20',
  'text-on-surface/30',
  'text-on-surface-variant/40',

  'text-primary/30',
  'text-primary/40',

  'text-secondary/30',
  'text-secondary/40',

  'text-tertiary/30',
  'text-tertiary/40',
];
type GraffitiAnchor = {
  id: string;
  top: number;
  left: number;
  text: string;
  rotate: number;
  drift: number;
  opacity: number;
  size: string;
  color: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
