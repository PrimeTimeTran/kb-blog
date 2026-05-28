import { useSyncExternalStore } from 'react';

export function useViewportWidth() {
  const width = useSyncExternalStore<number>(
    (callback: () => void) => {
      window.addEventListener('resize', callback);

      return () => {
        window.removeEventListener('resize', callback);
      };
    },
    (): number => window.innerWidth,
    (): number => 1200,
  );
  return width;
}

export default function Solution() {
  const width = useViewportWidth();
  return <h1>Solution: {width}</h1>;
}
