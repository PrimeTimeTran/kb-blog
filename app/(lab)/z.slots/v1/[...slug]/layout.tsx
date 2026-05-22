'use client';

export default function Layout({ children, left, right }) {
  return (
    <div className="flex w-full h-full overflow-x-scroll">
      <div className="bg-green-400 p-2 h-full w-full">
        <h1>{FILE_PATH} Left</h1>
      </div>
      <div className="flex">{left}</div>
      <div className="flex-2 ">{children}</div>
      <div className="flex">{right}</div>
      <div className="bg-red-400 p-2 h-full w-full">
        <h1>{FILE_PATH} Right</h1>
      </div>
    </div>
  );
}

export const FILE_PATH = 'app/(lab)/slots/v1/[...slug]/layout.tsx';
