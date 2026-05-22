'use client';

export function CenterRegion({ children }) {
  return (
    <div className="flex-1 min-w-0 min-h-0 relative z-10">
      <div className="w-full max-w-5xl px-3 mx-auto">{children}</div>
    </div>
  );
}
