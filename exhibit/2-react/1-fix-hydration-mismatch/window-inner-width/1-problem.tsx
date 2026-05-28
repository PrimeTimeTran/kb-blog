import { useState, useEffect } from 'react';

export function useViewportWidth() {
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);

    update();

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return width;
}

export default function Problem() {
  const width = useViewportWidth();

  return <h1>Problem: {width}</h1>;
}
