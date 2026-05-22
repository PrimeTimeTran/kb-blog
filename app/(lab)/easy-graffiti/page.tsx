'use client';
import { useEffect, useState } from 'react';

import { Graffiti } from '@/components/Graffiti';
import { BaseScroll } from '@/components/BaseScroll';

export default function Page() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative flex flex-1 min-h-0 overflow-hidden">
      {/* <Graffiti /> */}
      <BaseScroll>
        <div className="mx-auto w-full max-w-4xl px-6 py-10 relative z-10">
          <main className="relative">
            {/* Spacer section */}
            <section className="h-[150vh] bg-neutral-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold">Scroll down</h1>
            </section>

            {/* TEXT BLOCK (anchor point) */}
            <section className="relative bg-white px-10 py-40">
              <p className="text-neutral-600 max-w-xl leading-relaxed">
                The floating card exists in a separate layer above this, but still reacts naturally to scroll.
              </p>

              {/* CARD anchored to this text */}
              <div className="relative mt-[-50px]">
                <div className="ml-auto w-72 p-4 rounded-xl bg-white shadow-xl border border-black/10 rotate-[-6deg]">
                  Floating Card
                  <div className="text-xs opacity-60 mt-2">This is positioned relative to the text above.</div>
                </div>
              </div>
            </section>

            {/* More content */}
            <section className="h-[150vh] bg-neutral-100 flex items-center justify-center">
              <h2 className="text-3xl font-semibold">Keep scrolling</h2>
            </section>
          </main>
        </div>
      </BaseScroll>
    </main>
  );
}
