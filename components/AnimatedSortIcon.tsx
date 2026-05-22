import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { RichTooltip } from './ToolTipRich';

interface AnimatedSortIconProps {
  watch: any;
  children: React.ReactNode;
  tooltipTitle?: string;
  tooltipDescription?: string;
}

export const AnimatedSortIcon = ({ watch, children, tooltipTitle, tooltipDescription }: AnimatedSortIconProps) => {
  const content = (
    /* w-5 h-5 matches the 20px size of a standard text-lg icon */
    <div className="relative flex items-center justify-center w-5 h-5 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={watch}
          /* The "Beautiful" part: 3D-like flip and slide */
          initial={{ y: -12, opacity: 0, rotateX: -90, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
          exit={{ y: 12, opacity: 0, rotateX: 90, scale: 0.8 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            mass: 0.5,
          }}
          className="absolute flex items-center justify-center text-lg"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  if (tooltipTitle || tooltipDescription) {
    return (
      <RichTooltip title={tooltipTitle ?? ''} description={tooltipDescription ?? ''}>
        {/* We wrap in a div so the tooltip has a valid ref target */}
        <div className="flex items-center justify-center">{content}</div>
      </RichTooltip>
    );
  }

  return content;
};
