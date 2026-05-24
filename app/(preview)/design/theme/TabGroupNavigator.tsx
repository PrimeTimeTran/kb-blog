'use client';

import { useTheme } from '@teispace/next-themes';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCube, HiSun, HiMoon } from 'react-icons/hi2';

import { FloatingPicker } from './Components';
import { useThemeStore } from '@/hooks/useThemeStore';
import { applyMaterialTheme, applyTheme } from '@/lib/theme/palette';
import clsx from 'clsx';

export function TabGroupNavigator({ tabs, title = 'OMNI UI', subtitle = 'DESIGN SYSTEM' }: TabGroupNavigatorProps) {
  const { seed, setSeed } = useThemeStore();
  const [currentTab, setCurrentTab] = useState(tabs[0]?.id);
  const { setTheme, resolvedTheme } = useTheme();
  const activeTab = tabs.find((t) => t.id === currentTab);

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    applyMaterialTheme(seed, isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, [seed, isDark]);

  return (
    <div className="h-full w-full min-h-0 flex flex-col bg-background">
      {renderHeader()}
      {renderMainContent()}

      <FloatingPicker
        seed={seed}
        setSeed={(seed) => {
          applyTheme(seed);
          setSeed(seed);
        }}
      />
    </div>
  );

  function renderMainContent() {
    return (
      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="max-w-7xl mx-auto">{activeTab?.content}</div>
          </motion.div>
        </AnimatePresence>
      </main>
    );
  }
  function renderHeader() {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
              <HiCube size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none mr-2">{title}</h1>
              <p className="text-[9px] font-bold opacity-40 uppercase tracking-[0.2em] mt-1">{subtitle}</p>
            </div>
          </div>

          {/* RIGHT */}
          <nav className="flex items-center overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={clsx(
                    'relative px-4 rounded-full text-sm font-bold whitespace-nowrap transition-all',
                    isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface',
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    {tab.icon && <span className="text-base mx-1">{tab.icon}</span>}
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-surface-container-highest text-primary border border-outline-variant/50 hover:bg-primary/10 transition-colors"
          >
            {resolvedTheme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
          </button>
        </div>
      </div>
    );
  }
}

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabGroupNavigatorProps {
  tabs: TabItem[];
  title?: string;
  subtitle?: string;
}
