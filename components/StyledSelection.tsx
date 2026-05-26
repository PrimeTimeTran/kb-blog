'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'; // Import Portal
import { motion, AnimatePresence } from 'framer-motion';

import { VscChevronDown, VscListFilter } from 'react-icons/vsc';
import { StyledButton } from './StyledButton';

interface SelectionOption {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface StyledSelectionProps {
  options: { key: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  forceDropdown?: boolean; // NEW PROP
}

export function StyledSelection({ options, value, onChange, icon, forceDropdown = false }: StyledSelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.key === value) || options[0];

  // Update position whenever it opens or the window resizes
  const updateCoords = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener('resize', updateCoords);
      window.addEventListener('scroll', updateCoords, true);
    }
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const renderDropdownMenu = () => {
    if (typeof document === 'undefined') return null;

    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              minWidth: Math.max(coords.width, 160),
              zIndex: 9999, // High enough to beat any panel
            }}
            className="overflow-hidden rounded-xl border border-outline-variant bg-highest shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col p-1">
              {options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    onChange(opt.key);
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors
                    ${value === opt.key ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-white/10'}
                  `}
                >
                  <span className={value === opt.key ? 'text-on-primary' : 'text-primary'}>
                    {opt.icon || <VscListFilter />}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  };

  return (
    <section className="flex items-center gap-1 shrink-0">
      <div className={forceDropdown ? 'block' : 'md:hidden'}>
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all
            bg-high dark:bg-highest
            ${isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-outline-variant hover:border-primary/50'}
          `}
        >
          <span className="text-primary text-sm">{icon || selectedOption.icon}</span>
          <span className="text-[11px] font-black uppercase tracking-tight text-on-surface">
            {selectedOption.label}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-primary/60">
            <VscChevronDown />
          </motion.div>
        </button>
        {renderDropdownMenu()}
      </div>

      {!forceDropdown && (
        <div className="hidden md:flex items-center gap-1">
          {options.map((opt) => (
            <StyledButton
              key={opt.key}
              text={opt.label}
              isActive={value === opt.key}
              icon={opt.icon}
              onClick={() => onChange(opt.key)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
