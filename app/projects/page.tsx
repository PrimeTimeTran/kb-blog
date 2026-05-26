'use client';

import { useState } from 'react';

import { images, LightBox } from '@/components/LightBox';

export default function Page() {
  const [tab, setTab] = useState('images');
  const len = images.length;
  return (
    <div className={`flex flex-col h-full w-full min-h-0`}>
      {/* TABS */}
      <div className="shrink-0 flex border-b">
        <button
          onClick={() => setTab('main')}
          className={`px-4 py-2 text-sm ${tab === 'main' ? 'border-b-2 border-black font-semibold' : ''}`}
        >
          Main
        </button>

        <button
          onClick={() => setTab('images')}
          className={`px-4 py-2 text-sm ${tab === 'images' ? 'border-b-2 border-black font-semibold' : ''}`}
        >
          Images
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 min-h-0 overflow-auto">
        {tab === 'main' ? (
          <div className="h-full w-full flex items-center justify-center text-center">Main Content</div>
        ) : (
          <LightBox images={images} len={len} />
        )}
      </div>
    </div>
  );
}
