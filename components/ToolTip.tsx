'use client';
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  delay?: number;
}

export const Tooltip = ({ text, children, delay = 200 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div className="relative flex items-center" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 px-2 py-1 
                        bg-gray-900 text-white text-xs rounded shadow-lg border border-gray-700
                        animate-in fade-in zoom-in duration-150 z-50 pointer-events-none"
        >
          {text}
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};
