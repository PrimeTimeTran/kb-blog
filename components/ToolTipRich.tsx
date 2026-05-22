import { useFloatingPanel } from '@/hooks/useFloatingPanel';
import React from 'react';
import { createPortal } from 'react-dom';

const unfoldingClasses = {
  top: 'origin-bottom -translate-x-1/2 -translate-y-full animate-in fade-in slide-in-from-bottom-1 zoom-in-95',
  bottom: 'origin-top -translate-x-1/2 animate-in fade-in slide-in-from-top-1 zoom-in-95',
  left: 'origin-right -translate-y-1/2 -translate-x-full animate-in fade-in slide-in-from-right-1 zoom-in-95',
  right: 'origin-left -translate-y-1/2 animate-in fade-in slide-in-from-left-1 zoom-in-95',
};

interface TooltipAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface InteractiveTooltipProps {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: TooltipAction[];
  actionsPosition?: 'top' | 'bottom';
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  compact?: boolean;
}

export const RichTooltip = ({
  title,
  description,
  actions = [],
  actionsPosition = 'top',
  position = 'bottom',
  disabled = false,
  compact = true,
  children,
}: InteractiveTooltipProps) => {
  const { isOpen, setIsOpen, coords, triggerRef, shouldShow, animationClass } = useFloatingPanel({
    position,
    disabled,
    hasContent: !!(title || description || actions.length > 0),
  });

  const renderActions = () => {
    if (actions.length === 0) return null;
    const isTop = actionsPosition === 'top';

    return (
      <div
        className={`flex items-center gap-1 px-2 py-1 bg-(--surface-container-high) ${
          isTop ? 'border-b rounded-t-lg' : 'border-t rounded-b-lg'
        } border-outline-variant/30 relative`}
      >
        {actions.map((action, idx) => (
          <div key={idx} className="group/mini relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className="p-1.5 rounded-md text-(--on-surface-variant) hover:text-(--primary) hover:bg-(--surface-container-highest) transition-all active:scale-95"
            >
              <span className="text-base leading-none flex items-center justify-center">{action.icon}</span>
            </button>

            {/* MINI TOOLTIP: Explicit contrast and fixed positioning */}
            <div
              className={`
                invisible opacity-0 scale-90 group-hover/mini:visible group-hover/mini:opacity-100 group-hover/mini:scale-100
                absolute left-1/2 -translate-x-1/2 px-2 py-1
                /* Force a dark/high-contrast background */
                bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                text-[9px] font-bold rounded shadow-xl pointer-events-none transition-all duration-100 z-[100]
                ${isTop ? 'bottom-full mb-2' : 'top-full mt-2'}
              `}
            >
              {action.label}
              <div
                className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
                  isTop
                    ? 'top-full border-t-gray-900 dark:border-t-gray-100'
                    : 'bottom-full border-b-gray-900 dark:border-b-gray-100'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={triggerRef}
      className="inline-block relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative z-[1]">{children}</div>

      {shouldShow &&
        createPortal(
          <div
            style={{ top: coords.top, left: coords.left, position: 'fixed' }}
            className={`z-[10000] pointer-events-auto w-64 ${animationClass}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* 
              THE BRIDGE: 
              This invisible div extends 20px in the direction of the trigger 
              to ensure the hover doesn't break during the "transit".
            */}
            <div
              className={`absolute h-6 w-full -z-10 ${
                position === 'bottom' ? 'bottom-full' : position === 'top' ? 'top-full' : ''
              }`}
            />

            <div className="flex flex-col bg-(--background) border border-outline-variant shadow-elevation-2 rounded-lg text-left">
              {actionsPosition === 'top' && renderActions()}
              <div className="px-3 py-2 flex flex-col gap-0.5">
                <h4 className="text-label-medium text-(--primary) font-bold leading-tight">{title}</h4>
                <p className="text-[11px] text-(--on-surface-variant) leading-snug">{description}</p>
              </div>
              {actionsPosition === 'bottom' && renderActions()}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
