import { useLayout } from '../providers/LayoutProvider';

export function useResize(side) {
  const { layout, setLayout } = useLayout();

  return (e) => {
    const startX = e.clientX;
    const startWidth = layout[side];

    const isRight = side === 'right';

    const onMove = (ev) => {
      const delta = ev.clientX - startX;

      const viewportWidth = window.innerWidth;

      const nextWidth = isRight ? startWidth - delta : startWidth + delta;

      const min = 180;
      const max = viewportWidth * 0.5;

      const clamped = Math.min(Math.max(min, nextWidth), max);

      setLayout((prev) => ({
        ...prev,
        [side]: clamped,
      }));
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };
}
