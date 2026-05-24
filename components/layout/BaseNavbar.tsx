'use client';

import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BaseNavbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  function open(index: number) {
    if (displayIndex !== null) {
      setDirection(index > displayIndex ? 'right' : 'left');
      setPrevIndex(displayIndex);
    }

    setDisplayIndex(index);
    setMounted(true);
  }

  function close() {
    setMounted(false);
    setDisplayIndex(null);
    setPrevIndex(null);
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!navRef.current) return;

      const rect = navRef.current.getBoundingClientRect();

      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom + 300;

      if (!inside) close();
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [displayIndex]);

  return (
    <div
      ref={navRef}
      className="fixed w-full h-16 z-20 flex border-b border-outline-variant/60 bg-surface/80 backdrop-blur-xl debug"
    >
      {items.map((item, index) => (
        <div key={index} className="flex justify-center debug px-16 group" onMouseEnter={() => open(index)}>
          <button key={item.label} className="flex items-center gap-1 py-2 text-sm">
            <span>{item.label}</span>

            <svg
              className="h-8 w-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}

      <div
        className={clsx(
          'absolute left-0 top-full w-full overflow-hidden border bg-surface shadow-xl transition-all duration-300',
          mounted ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        <div className="relative ">
          {displayIndex != null && (
            <motion.div
              className="flex w-full bg-surface will-change-transform"
              animate={{
                x: displayIndex != null ? `-${displayIndex * 100}%` : direction === 'right' ? '100%' : '-100%',
              }}
              initial={false}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {items.map((item) => (
                <div key={item.label} className="w-screen flex flex-col justify-around shrink-0 h-[220px]">
                  <div className="px-6">{item.content}</div>
                  <div className="bg-surface-variant w-screen h-16">stuff</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const items = [
  {
    label: 'Products',
    content: (
      <div className="grid grid-cols-2 gap-4">
        <Card title="Editor" />
        <Card title="Analytics" />
        <Card title="AI Tools" />
        <Card title="Automation" />
      </div>
    ),
  },
  {
    label: 'Solutions',
    content: (
      <div className="grid grid-cols-2 gap-4">
        <Card title="Frameworks" />
        <Card title="Soltuions" />
        <Card title="Skills" />
        <Card title="Stuff" />
      </div>
    ),
  },
  {
    label: 'Resources',
    content: (
      <div className="space-y-3">
        <PanelLink>Docs</PanelLink>
        <PanelLink>Guides</PanelLink>
        <PanelLink>API</PanelLink>
      </div>
    ),
  },
];

function Card({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
}

function PanelLink({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl p-3 transition-colors hover:bg-white/5">{children}</div>;
}
