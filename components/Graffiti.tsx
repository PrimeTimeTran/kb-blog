'use client';
// | class           | reason                          |
// | --------------- | ------------------------------- |
// | relative        | anchor graffiti                 |
// | flex            | flex child behavior             |
// | flex-1          | fill remaining space            |
// | min-h-0         | allow scrolling child to shrink |
// | overflow-hidden | prevent document overflow       |

import { graffitiWords } from '@/data/graffiti';
import { useScroll } from '@/providers/ScrollProvider';

// https://storytelling.noomoagency.com/
// water effect

// https://www.awwwards.com/inspiration/random-shapes-page-transitions-igma-im

// Random overlay icons
// https://igma.im/
import type { GraffitiMarkType, GraffitiStyle, GenerateGraffitiOptions } from './graffiti-types';

const STYLE: GraffitiStyle = {
  baseFonts: ['font-sans', 'font-serif', 'font-mono'],
  heroFonts: ['font-marker'],
  colorClass: ['text-on-surface', 'text-on-surface/80', 'text-on-surface/60'],
  sizeClass: ['text-3xl', 'text-4xl', 'text-5xl'],
};
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function pickWeightedFont(r: number, style: GraffitiStyle) {
  if (r > 0.85) {
    return style.heroFonts[0]; // Permanent Marker
  }

  return style.baseFonts[Math.floor(r * style.baseFonts.length)];
}
const FONT_BY_WORD: Record<string, string> = {
  CODE: 'font-mono',
  DSA: 'font-mono',
  BUILD: 'font-sans',
  SHIP: 'font-display',
};
const zones = [
  { min: 5, max: 25 }, // header zone
  { min: 25, max: 55 }, // main field
  { min: 55, max: 85 }, // lower field
];
export function getDrift(scrollY: number, depth: number) {
  return scrollY * depth;
}
export function generateGraffitiMarks({
  words,
  seed = 1,
  padding = 8,
  style = STYLE,
}: GenerateGraffitiOptions): GraffitiMarkType[] {
  const marks: GraffitiMarkType[] = [];

  const cols = 3;
  const rows = Math.ceil(words.length / cols);

  const usableWidth = 100 - padding * 2;
  const usableHeight = 100 - padding * 2;

  for (let i = 0; i < words.length; i++) {
    const text = words[i];

    const r1 = seededRandom(seed + i * 11);
    const r2 = seededRandom(seed + i * 21);
    const r3 = seededRandom(seed + i * 31);
    const r4 = seededRandom(seed + i * 41);
    const r5 = seededRandom(seed + i * 51);
    const rFont = seededRandom(seed + i * 71);

    // ----------------------------
    // 🧠 STRUCTURED GRID POSITIONING
    // ----------------------------

    const row = Math.floor(i / cols);

    const cellW = usableWidth / cols;
    const cellH = usableHeight / rows;

    const COLS = 5;

    const col = i % COLS;
    const colWidth = usableWidth / COLS;

    const x = padding + col * colWidth + (r1 - 0.5) * colWidth * 0.6;

    // const x = col * colWidth + (r1 - 0.5) * colWidth * 0.8
    const stagger = (Math.floor(i / 3) % 2) * (colWidth / 2);

    const y = padding + row * cellH + (r2 - 0.5) * cellH * 0.9;

    // ----------------------------
    // 🎨 TYPOGRAPHY SYSTEM
    // ----------------------------

    const isHero = rFont > 0.86;

    const forcedFont = FONT_BY_WORD[text];
    const fontClass = forcedFont ?? pickWeightedFont(rFont, style);

    const size = isHero ? 'text-6xl' : r3 > 0.66 ? 'text-4xl' : 'text-2xl';

    const color = r4 > 0.7 ? 'text-on-surface' : r4 > 0.4 ? 'text-on-surface/70' : 'text-on-surface/40';

    const opacity = isHero ? 0.9 : 0.35 + r5 * 0.5;

    // ----------------------------
    // 🧭 MOTION / DEPTH SYSTEM
    // ----------------------------

    const depth = isHero ? 0.06 + r3 * 0.02 : 0.01 + r3 * 0.04;

    const groupRotation = (r4 - 0.5) * (isHero ? 45 : 30);

    const textRotation = (r5 - 0.5) * (isHero ? 25 : 10);

    const skew = (r3 - 0.5) * (isHero ? 10 : 6);

    // ----------------------------
    // FINAL MARK
    // ----------------------------

    marks.push({
      text,
      x,
      y,
      opacity,
      depth,
      groupRotation,
      textRotation,
      skew,

      className: [fontClass, size, color].join(' '),
    });
  }

  return marks;
}
const MARKS = generateGraffitiMarks({
  words: graffitiWords,
  seed: graffitiWords.length,
});
export function GraffitiMark({ mark, scrollY }: { mark: GraffitiMarkType; scrollY: number }) {
  const parallaxY = scrollY * mark.depth * -1;

  return (
    <div
      className={`select-none ${mark.className}`}
      style={{
        opacity: mark.opacity,
        top: `${mark.y}%`,
        left: `${mark.x}%`,
        transform: `translate3d(0, ${parallaxY}px, 0) rotate(${mark.groupRotation}deg) skew(${mark.skew}deg)`,
      }}
    >
      <span
        className="inline-block"
        style={{
          transform: `rotate(${mark.textRotation}deg)`,
        }}
      >
        {mark.text}
      </span>
    </div>
  );
}
export function Graffiti() {
  const { scrollY } = useScroll();
  if (false) {
  }
  const container = document.getElementById('scroll-container');
  const totalInnerHeight = container?.scrollHeight;
  const visibleInnerHeight = container?.clientHeight;
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {MARKS.map((m) => (
        <GraffitiMark key={m.text} mark={m} scrollY={scrollY} />
      ))}{' '}
      <div
        className="
          fixed
          right-6
          top-1/2
          -translate-y-1/2
          pointer-events-auto
          w-72
          rounded-2xl
          bg-surface/80
          backdrop-blur-md
          border border-on-surface/10
          p-4
          shadow-lg
        "
      >
        <div className="text-on-surface text-lg font-semibold">Study Layer</div>

        <div className="text-on-surface/70 text-sm mt-2">Scroll-reactive graffiti system active.</div>

        <div className="mt-4 space-y-2 text-on-surface/60 text-xs">
          <div>• CALCULUS III</div>
          <div>• VECTORS</div>
          <div>• GEOMETRY</div>
        </div>
      </div>
    </div>
  );
}
