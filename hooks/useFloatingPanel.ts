import { useState, useRef, useEffect, useCallback } from 'react';

interface UseFloatingPanelProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  hasContent: boolean;
  panelWidth?: number;
}

export const useFloatingPanel = ({
  position,
  disabled,
  hasContent,
  panelWidth = 256, // w-64
}: UseFloatingPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [coordsLoaded, setCoordsLoaded] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const padding = 12;
    let t = 0;
    let l = 0;

    switch (position) {
      case 'bottom':
        t = rect.bottom + padding;
        l = rect.left + rect.width / 2;
        break;
      case 'top':
        t = rect.top - padding;
        l = rect.left + rect.width / 2;
        break;
      case 'left':
        t = rect.top + rect.height / 2;
        l = rect.left - padding;
        break;
      case 'right':
        t = rect.top + rect.height / 2;
        l = rect.right + padding;
        break;
    }

    // Viewport Clamping (Horizontal)
    const halfWidth = panelWidth / 2;
    const minL = halfWidth + 8;
    const maxL = window.innerWidth - halfWidth - 8;
    l = Math.max(minL, Math.min(l, maxL));

    setCoords({ top: t, left: l });
    setCoordsLoaded(true);
  }, [position, panelWidth]);

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener('scroll', updateCoords, true);
      window.addEventListener('resize', updateCoords);
    } else {
      setCoordsLoaded(false);
    }
    return () => {
      window.removeEventListener('scroll', updateCoords, true);
      window.removeEventListener('resize', updateCoords);
    };
  }, [isOpen, updateCoords]);

  const unfoldingClasses = {
    top: 'origin-bottom -translate-x-1/2 -translate-y-full animate-in fade-in slide-in-from-bottom-1 zoom-in-95',
    bottom: 'origin-top -translate-x-1/2 animate-in fade-in slide-in-from-top-1 zoom-in-95',
    left: 'origin-right -translate-y-1/2 -translate-x-full animate-in fade-in slide-in-from-right-1 zoom-in-95',
    right: 'origin-left -translate-y-1/2 animate-in fade-in slide-in-from-left-1 zoom-in-95',
  };

  const shouldShow = isOpen && !disabled && hasContent && coordsLoaded;

  return {
    isOpen,
    setIsOpen,
    coords,
    triggerRef,
    shouldShow,
    animationClass: unfoldingClasses[position],
  };
};
