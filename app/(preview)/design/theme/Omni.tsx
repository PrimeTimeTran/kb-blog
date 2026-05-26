'use client';

import React, { useState } from 'react';
import { HiCube, HiSun, HiMoon } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { useTheme } from '@teispace/next-themes';
import { OmniPanel } from '@/components/OmniPanel';
import { BaseScroll } from '@/components/BaseScroll';

export function OmniShowcase() {
  const [currentTab, setCurrentTab] = useState('default');
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="min-h-screen bg-surface">
        <header className="p-6 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-xl sticky top-0 z-40 space-y-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
                <HiCube size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black tracking-tight leading-none">OMNI UI</h1>
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase">
                    {resolvedTheme}
                  </span>
                </div>
                <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest mt-1">Material HCT Logic</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl bg-highest text-primary hover:scale-105 active:scale-95 transition-all border border-outline-variant/50"
              >
                {resolvedTheme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>
            </div>
          </div>

          {/* Tab Navigation Row */}
          <nav className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`
                  relative px-4 py-2 rounded-full text-sm font-bold transition-all
                  ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-low'}
                `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-xs">{tab.icon}</span>
                    {tab.label}
                  </span>

                  {/* Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-container rounded-full z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto p-6 lg:p-12">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabs(currentTab)}
          </motion.div>
        </main>
      </div>
    </div>
  );

  function renderTabs(key) {
    switch (key) {
      case 'default':
        return (
          <div className="space-y-16 pb-24">
            {/* 1. INTERACTION BEHAVIORS (The "How it moves" section) */}
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight">Interaction Behaviors</h2>
                <p className="text-sm text-on-surface-variant">Defining how the panel physically responds to hover.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="none"</p>
                  <OmniPanel hoverEffect="none" elevation="low">
                    <div className="p-8 text-center text-sm font-medium">Static Surface</div>
                  </OmniPanel>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="shadow"</p>
                  <OmniPanel hoverEffect="shadow" elevation="low">
                    <div className="p-8 text-center text-sm font-semibold text-primary">
                      Tactile Button Interaction.
                    </div>
                  </OmniPanel>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="lift"</p>
                  <OmniPanel hoverEffect="lift" elevation="low">
                    <div className="p-8 text-center text-sm font-medium">Subtle Lift (-2px)</div>
                  </OmniPanel>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="pop"</p>
                  <OmniPanel hoverEffect="pop" elevation="low">
                    <div className="p-8 text-center text-sm font-medium">Emphasis Pop (Scale + Y)</div>
                  </OmniPanel>
                </div>
              </div>
            </section>
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight">Interaction Behaviors</h2>
                <p className="text-sm text-on-surface-variant">Defining how the panel physically responds to hover.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Physical Compression</p>
                  <OmniPanel
                    variant="none"
                    hoverEffect="shadow"
                    elevation="low"
                    header="TACTILE CARD"
                    footer="scale-95 | shadow-inner | bg-primary/[0.08]"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Navigating to high-level framework pages (React/Vue)</li>
                        <li>Large clickable grid items in a dashboard</li>
                        <li>Avoid using if the card contains other clickable buttons</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">SVG Path Animation</p>
                  <OmniPanel
                    variant="trace"
                    elevation="default"
                    header="TRACE PANEL"
                    footer="stroke-dasharray | drop-shadow-glow | transition-all"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Tag Explorers and Category Lists</li>
                        <li>Highlighting active vs. inactive state via color</li>
                        <li>Pairs well with 'none' hoverEffect to keep text readable</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Sunken Depth</p>
                  <OmniPanel
                    variant="inset"
                    elevation="low"
                    header="INSET WELL"
                    footer="shadow-inner | bg-black/20 | border-outline/10"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Code snippets and Terminal outputs</li>
                        <li>Search bars and Form input groupings</li>
                        <li>Gives a "contained" feel to technical data</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Backdrop Blurring</p>
                  <OmniPanel
                    variant="glass"
                    elevation="high"
                    header="GLASS OVERLAY"
                    footer="backdrop-blur-xl | bg-white/10 | ring-1 ring-inset"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Sticky headers and Floating toolbars</li>
                        <li>Context menus and Modals</li>
                        <li>Use when you want to maintain context of the background</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Z-Axis Translation</p>
                  <OmniPanel
                    variant="none"
                    hoverEffect="lift"
                    elevation="default"
                    header="LIFT CARD"
                    footer="shadow-md | -translate-y-1 | transition-transform"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Blog post previews and Project cards</li>
                        <li>Generic interactive elements</li>
                        <li>Most common pattern for general browsing</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
            </section>
            {/* 2. AESTHETIC VARIANTS (The "How it looks" section) */}
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight">Aesthetic Variants</h2>
                <p className="text-sm text-on-surface-variant">Visual styles that can be applied to any interaction.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-primary">
                    color="primary"
                  </p>
                  <OmniPanel
                    variant="none"
                    elevation="low"
                    color="primary"
                    className="bg-primary-container/20 border-primary/20"
                    header="PRIMARY FEATURE"
                    footer="bg-primary-container | text-on-primary-container"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Highlighting the "main" framework in a list</li>
                        <li>Active navigation items or selected states</li>
                        <li>Use sparingly to avoid overwhelming the user</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-secondary">
                    color="secondary"
                  </p>
                  <OmniPanel
                    variant="none"
                    elevation="low"
                    color="secondary"
                    className="bg-secondary-container/20 border-secondary/20"
                    header="SECONDARY UTILITY"
                    footer="bg-secondary-container | tex-on-secondary"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-secondary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Filter toolbars and Sidebar navigation</li>
                        <li>Informational callouts that aren't urgent</li>
                        <li>Mapping to "Secondary" HCT tones for a balanced UI</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-error">color='error'</p>
                  <OmniPanel
                    variant="none"
                    elevation="low"
                    color="error"
                    className="bg-error-container/20 border-error/20"
                    header="DANGER ZONE"
                    footer="bg-error-container | text-on-error-container"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-error">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Displaying compiler errors in the monorepo</li>
                        <li>Critical alerts that require immediate attention</li>
                        <li>Pairs perfectly with a "shake" animation on hover</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-tertiary">
                    color="tertiary"
                  </p>
                  <OmniPanel
                    variant="none"
                    elevation="low"
                    color="tertiary"
                    className="bg-tertiary-container/20 border-tertiary/20"
                    header="TERTIARY ACCENT"
                    footer="bg-tertiary-container | text-on-tertiary-container"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-tertiary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>"New Feature" or "Beta" announcements</li>
                        <li>Specialized metadata (e.g., GitHub Stars or Version numbers)</li>
                        <li>Adding a third level of hierarchy to complex dashboards</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">variant="none"</p>
                  <OmniPanel
                    variant="none"
                    elevation="default"
                    header="STANDARD CONTAINER"
                    footer="bg-level | border-outline-variant/30 | backdrop-blur-md"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>Default layout container for sidebar or main content areas</li>
                        <li>When content inside is high-density (prevents visual noise)</li>
                        <li>Best for "static" information that doesn't need to scream for attention</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">variant="trace"</p>
                  <OmniPanel
                    color="primary"
                    variant="trace"
                    elevation="default"
                    header="TRACING GLOW"
                    hoverEffect="none"
                    footer="framer-motion | pathLength: 0 -> 1 | stroke-primary"
                  >
                    <div className="p-6 text-sm">
                      <p className="font-bold mb-2 text-primary">Proper Usage:</p>
                      <ul className="space-y-1 list-disc list-inside opacity-80">
                        <li>"Active" or "Focused" cards in a framework gallery</li>
                        <li>Elements that need to be distinct but shouldn't shift (Y-axis)</li>
                        <li>Providing immediate visual feedback without changing the layout height</li>
                      </ul>
                    </div>
                  </OmniPanel>
                </div>
              </div>
            </section>

            {/* 3. ELEVATION TIERS (The "Where it sits" section) */}
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight">Tonal Elevations</h2>
                <p className="text-sm text-on-surface-variant">Mapping to Material Design 3 Surface Containers.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['low', 'default', 'high'] as const).map((lvl) => (
                  <div key={lvl} className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">elevation="{lvl}"</p>
                    <OmniPanel elevation={lvl}>
                      <div className="p-6">
                        <div className="h-20 w-full rounded-xl border border-dashed border-outline-variant/50 flex items-center justify-center text-[10px] font-mono">
                          {lvl.toUpperCase()} SURFACE
                        </div>
                      </div>
                    </OmniPanel>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. REAL WORLD COMPOSITIONS */}
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight">Real-World Compositions</h2>
                <p className="text-sm text-on-surface-variant">Combining props for specific UI patterns.</p>
              </div>
              <div className="space-y-8">
                {/* Filter Toolbar Pattern */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                    Toolbar Pattern (None + Lift)
                  </p>
                  <OmniPanel variant="none" hoverEffect="lift" elevation="low" className="w-fit">
                    <div className="flex items-center gap-4 px-4 py-2 text-sm font-medium">
                      <span>Filter By</span>
                      <div className="h-4 w-px bg-outline-variant" />
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">React</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Next.js</span>
                      </div>
                    </div>
                  </OmniPanel>
                </div>

                {/* Tag Explorer Pattern */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                    Explorer Pattern (Trace + Static)
                  </p>
                  <OmniPanel variant="trace" hoverEffect="none" elevation="default" header="Tag Explorer">
                    <div className="p-4 grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-8 bg-level rounded-lg border border-outline-variant/20" />
                      ))}
                    </div>
                  </OmniPanel>
                </div>
              </div>
            </section>
          </div>
        );
      case 'elevation':
        return (
          <section className="space-y-8">
            <h1 className="text-5xl font-black tracking-tight">Elevation</h1>
            <p>
              To deeply document and study Elevation in your system, we need to move beyond just "shadows." In a modern
              Design System (especially one following MD3 logic), elevation is a combination of Shadow, Tonal Overlay,
              and Z-index logic.
            </p>
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tight">1. The Level Hierarchy (The "Steps")</h2>
                <p className="text-sm text-on-surface-variant">
                  This is the baseline study of the 5-6 levels of elevation in your system. It demonstrates how a panel
                  "rises" from the background.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Level 0: Flat */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Elevation: None</p>
                  <OmniPanel elevation="none" header="Level 0: Flat">
                    <div className="p-8 text-sm opacity-70">
                      Flush with the background. No shadow. Used for base layout sections and content dividers.
                    </div>
                  </OmniPanel>
                </div>

                {/* Level 1: Low */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Elevation: Low</p>
                  <OmniPanel elevation="low" header="Level 1: Surface">
                    <div className="p-8 text-sm opacity-80">
                      Subtle separation. Ideal for cards in a grid or items that need a distinct boundary without
                      feeling heavy.
                    </div>
                  </OmniPanel>
                </div>

                {/* Level 5: High */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Elevation: High</p>
                  <OmniPanel elevation="high" header="Level 5: Floating">
                    <div className="p-8 text-sm">
                      Maximum depth. Used for high-priority floating elements like Modals, FABs, or primary tooltips.
                    </div>
                  </OmniPanel>
                </div>
              </div>
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black tracking-tight">2. Tonal Elevation (The "Tint" Study)</h2>
                  <p className="text-sm text-on-surface-variant">
                    In dark mode, shadows are less effective. MD3 solves this by making higher-elevation surfaces
                    lighter (adding a primary-colored overlay).
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-lowest p-8 rounded-[32px]">
                  {/* Comparison A: Low Elevation in Dark */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Tonal Step: 1</p>
                    <OmniPanel elevation="low" variant="none" header="Low Tonal Tint">
                      <div className="p-12 text-center text-sm">Slightly lighter than the background.</div>
                    </OmniPanel>
                  </div>

                  {/* Comparison B: High Elevation in Dark */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Tonal Step: 5</p>
                    <OmniPanel elevation="high" variant="none" header="High Tonal Tint">
                      <div className="p-12 text-center text-sm font-bold">
                        Noticeably brighter. This uses a higher opacity of the brand overlay.
                      </div>
                    </OmniPanel>
                  </div>
                </div>
              </section>
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black tracking-tight">
                    3. Dynamic Elevation (The "Interaction" Physics)
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    Elevation shouldn't always be static. We need to document how a panel transitions between levels
                    during a user's interaction.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Lift Interaction */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Interaction: Lift</p>
                    <OmniPanel hoverEffect="lift" elevation="low" header="Elevating on Hover">
                      <div className="p-8 text-sm italic">
                        Hover to see the Y-axis translation and shadow expansion. This is the "Discovery" pattern.
                      </div>
                    </OmniPanel>
                  </div>

                  {/* Shadow Interaction */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Interaction: Shadow</p>
                    <OmniPanel hoverEffect="shadow" elevation="default" header="Tactile Compression">
                      <div className="p-8 text-sm italic">
                        Hover to see the "Button press." The card compresses while the shadow deepens internally.
                      </div>
                    </OmniPanel>
                  </div>
                </div>
              </section>
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black tracking-tight">4. Grouped Elevation</h2>
                  <p className="text-sm text-on-surface-variant">
                    The "Parent-Child" protocol: Preventing shadow-stacking and visual muddying.
                  </p>
                </div>

                <OmniPanel elevation="low" header="Parent Container (L1)">
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-low/50">
                    {/* SUCCESS: Level 0 Child */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary font-bold">
                        Standard: Level 0
                      </p>
                      <OmniPanel elevation="none" className="bg-lowest border-dashed">
                        <div className="p-6 text-xs italic">
                          Child is flush. We use a dashed border or a slight color shift instead of a shadow to show
                          containment.
                        </div>
                      </OmniPanel>
                    </div>

                    {/* WARNING: Level 1 Child */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-error font-bold">
                        Avoid: Level 1+
                      </p>
                      <OmniPanel elevation="low">
                        <div className="p-6 text-xs opacity-60">
                          Nesting shadows (L1 inside L1) creates "Shadow Bleed," making the parent's surface look dirty.
                        </div>
                      </OmniPanel>
                    </div>
                  </div>
                </OmniPanel>
              </section>
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black tracking-tight">5. Contextual Elevation</h2>
                  <p className="text-sm text-on-surface-variant">
                    Temporal depth: Animating elevation based on scroll-state and viewport context.
                  </p>
                </div>

                <div className="relative h-64 w-full rounded-[32px] overflow-hidden border border-outline-variant/20 bg-lowest">
                  {/* Floating Header Spec */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 z-20 px-6 py-4 bg-level/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-xl"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black tracking-tighter text-primary">OMNI_NAV_SYSTEM</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Elevated: L2
                      </span>
                    </div>
                  </motion.div>

                  <div className="p-8 pt-20 space-y-4 opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-3 w-full bg-on-surface rounded-full" />
                    ))}
                  </div>

                  {/* Floating Action Spec */}
                  <div className="absolute bottom-6 right-6">
                    <OmniPanel
                      elevation="high"
                      className="rounded-full h-14 w-14 flex items-center justify-center bg-primary text-on-primary"
                    >
                      <span className="font-bold">+</span>
                    </OmniPanel>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                  <div className="p-4 rounded-xl bg-level">
                    <p className="font-bold mb-1">Z-Stack Architecture</p>
                    <ul className="list-mono space-y-1 opacity-70">
                      <li>z-0: Document Base</li>
                      <li>z-10: Sticky Elements (Resting)</li>
                      <li>z-50: Modals / Overlays</li>
                      <li>z-100: Critical Alerts (Toasts)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-level">
                    <p className="font-bold mb-1">Scroll Trigger Logic</p>
                    <p className="opacity-70 leading-relaxed">
                      We use a "useScroll" hook to monitor "scrollY". When "y greater than 0", the header elevation
                      transitions from "none" to `low` to visually separate it from the content passing underneath.
                    </p>
                  </div>
                </div>
              </section>
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black tracking-tight">6. The Glass Layer</h2>
                  <p className="text-sm text-on-surface-variant">
                    High-Z overlays that utilize backdrop-blur to maintain environmental context. The final boss of
                    elevation. It combines Maximum Elevation with Backdrop Diffusion. This signals to the user that the
                    element is "Above the Document," existing in the same physical space as the glass of the screen
                    itself.
                  </p>
                </div>

                <div className="relative h-64 w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-primary/20 via-tertiary/20 to-secondary/20 flex items-center justify-center">
                  {/* Floating Glass Panel */}
                  <div className="z-10 w-2/3">
                    <OmniPanel
                      elevation="high"
                      className="bg-surface/10 backdrop-blur-xl border-white/20"
                      header="Glass Overlay"
                      footer="Filter: blur(24px) | Elevation: 5"
                    >
                      <div className="p-6 text-sm text-center">
                        By blurring the background, we allow the user to see "movement" behind the panel without
                        sacrificing the legibility of the foreground.
                      </div>
                    </OmniPanel>
                  </div>

                  {/* Decorative background shapes to show blur effect */}
                  <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-primary blur-2xl opacity-50" />
                  <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-tertiary blur-3xl opacity-50" />
                </div>
              </section>
            </section>
          </section>
        );
      default:
        return null;
    }
  }
}

const BEHAVIOR = (
  <div className="space-y-16 pb-24">
    {/* 1. INTERACTION BEHAVIORS (The "How it moves" section) */}
    <section className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black tracking-tight">Interaction Behaviors</h2>
        <p className="text-sm text-on-surface-variant">Defining how the panel physically responds to hover.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="none"</p>
          <OmniPanel hoverEffect="none" elevation="low">
            <div className="p-8 text-center text-sm font-medium">Static Surface</div>
          </OmniPanel>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="shadow"</p>
          <OmniPanel hoverEffect="shadow" elevation="low">
            <div className="p-8 text-center text-sm font-semibold text-primary">Tactile Button Interaction.</div>
          </OmniPanel>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="lift"</p>
          <OmniPanel hoverEffect="lift" elevation="low">
            <div className="p-8 text-center text-sm font-medium">Subtle Lift (-2px)</div>
          </OmniPanel>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">hoverEffect="pop"</p>
          <OmniPanel hoverEffect="pop" elevation="low">
            <div className="p-8 text-center text-sm font-medium">Emphasis Pop (Scale + Y)</div>
          </OmniPanel>
        </div>
      </div>
    </section>
    <section className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black tracking-tight">Interaction Behaviors</h2>
        <p className="text-sm text-on-surface-variant">Defining how the panel physically responds to hover.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Physical Compression</p>
          <OmniPanel
            variant="none"
            hoverEffect="shadow"
            elevation="low"
            header="TACTILE CARD"
            footer="scale-95 | shadow-inner | bg-primary/[0.08]"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Navigating to high-level framework pages (React/Vue)</li>
                <li>Large clickable grid items in a dashboard</li>
                <li>Avoid using if the card contains other clickable buttons</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">SVG Path Animation</p>
          <OmniPanel
            variant="trace"
            elevation="default"
            header="TRACE PANEL"
            footer="stroke-dasharray | drop-shadow-glow | transition-all"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Tag Explorers and Category Lists</li>
                <li>Highlighting active vs. inactive state via color</li>
                <li>Pairs well with 'none' hoverEffect to keep text readable</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Sunken Depth</p>
          <OmniPanel
            variant="inset"
            elevation="low"
            header="INSET WELL"
            footer="shadow-inner | bg-black/20 | border-outline/10"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Code snippets and Terminal outputs</li>
                <li>Search bars and Form input groupings</li>
                <li>Gives a "contained" feel to technical data</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Backdrop Blurring</p>
          <OmniPanel
            variant="glass"
            elevation="high"
            header="GLASS OVERLAY"
            footer="backdrop-blur-xl | bg-white/10 | ring-1 ring-inset"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Sticky headers and Floating toolbars</li>
                <li>Context menus and Modals</li>
                <li>Use when you want to maintain context of the background</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Z-Axis Translation</p>
          <OmniPanel
            variant="none"
            hoverEffect="lift"
            elevation="default"
            header="LIFT CARD"
            footer="shadow-md | -translate-y-1 | transition-transform"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Blog post previews and Project cards</li>
                <li>Generic interactive elements</li>
                <li>Most common pattern for general browsing</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </section>
    {/* 2. AESTHETIC VARIANTS (The "How it looks" section) */}
    <section className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black tracking-tight">Aesthetic Variants</h2>
        <p className="text-sm text-on-surface-variant">Visual styles that can be applied to any interaction.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-primary">color="primary"</p>
          <OmniPanel
            variant="none"
            elevation="low"
            color="primary"
            className="bg-primary-container/20 border-primary/20"
            header="PRIMARY FEATURE"
            footer="bg-primary-container | text-on-primary-container"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Highlighting the "main" framework in a list</li>
                <li>Active navigation items or selected states</li>
                <li>Use sparingly to avoid overwhelming the user</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-secondary">color="secondary"</p>
          <OmniPanel
            variant="none"
            elevation="low"
            color="secondary"
            className="bg-secondary-container/20 border-secondary/20"
            header="SECONDARY UTILITY"
            footer="bg-secondary-container | tex-on-secondary"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-secondary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Filter toolbars and Sidebar navigation</li>
                <li>Informational callouts that aren't urgent</li>
                <li>Mapping to "Secondary" HCT tones for a balanced UI</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-error">color='error'</p>
          <OmniPanel
            variant="none"
            elevation="low"
            color="error"
            className="bg-error-container/20 border-error/20"
            header="DANGER ZONE"
            footer="bg-error-container | text-on-error-container"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-error">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Displaying compiler errors in the monorepo</li>
                <li>Critical alerts that require immediate attention</li>
                <li>Pairs perfectly with a "shake" animation on hover</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-tertiary">color="tertiary"</p>
          <OmniPanel
            variant="none"
            elevation="low"
            color="tertiary"
            className="bg-tertiary-container/20 border-tertiary/20"
            header="TERTIARY ACCENT"
            footer="bg-tertiary-container | text-on-tertiary-container"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-tertiary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>"New Feature" or "Beta" announcements</li>
                <li>Specialized metadata (e.g., GitHub Stars or Version numbers)</li>
                <li>Adding a third level of hierarchy to complex dashboards</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">variant="none"</p>
          <OmniPanel
            variant="none"
            elevation="default"
            header="STANDARD CONTAINER"
            footer="bg-level | border-outline-variant/30 | backdrop-blur-md"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>Default layout container for sidebar or main content areas</li>
                <li>When content inside is high-density (prevents visual noise)</li>
                <li>Best for "static" information that doesn't need to scream for attention</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">variant="trace"</p>
          <OmniPanel
            color="primary"
            variant="trace"
            elevation="default"
            header="TRACING GLOW"
            hoverEffect="none"
            footer="framer-motion | pathLength: 0 -> 1 | stroke-primary"
          >
            <div className="p-6 text-sm">
              <p className="font-bold mb-2 text-primary">Proper Usage:</p>
              <ul className="space-y-1 list-disc list-inside opacity-80">
                <li>"Active" or "Focused" cards in a framework gallery</li>
                <li>Elements that need to be distinct but shouldn't shift (Y-axis)</li>
                <li>Providing immediate visual feedback without changing the layout height</li>
              </ul>
            </div>
          </OmniPanel>
        </div>
      </div>
    </section>

    {/* 3. ELEVATION TIERS (The "Where it sits" section) */}
    <section className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black tracking-tight">Tonal Elevations</h2>
        <p className="text-sm text-on-surface-variant">Mapping to Material Design 3 Surface Containers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['low', 'default', 'high'] as const).map((lvl) => (
          <div key={lvl} className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">elevation="{lvl}"</p>
            <OmniPanel elevation={lvl}>
              <div className="p-6">
                <div className="h-20 w-full rounded-xl border border-dashed border-outline-variant/50 flex items-center justify-center text-[10px] font-mono">
                  {lvl.toUpperCase()} SURFACE
                </div>
              </div>
            </OmniPanel>
          </div>
        ))}
      </div>
    </section>

    {/* 4. REAL WORLD COMPOSITIONS */}
    <section className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black tracking-tight">Real-World Compositions</h2>
        <p className="text-sm text-on-surface-variant">Combining props for specific UI patterns.</p>
      </div>
      <div className="space-y-8">
        {/* Filter Toolbar Pattern */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Toolbar Pattern (None + Lift)</p>
          <OmniPanel variant="none" hoverEffect="lift" elevation="low" className="w-fit">
            <div className="flex items-center gap-4 px-4 py-2 text-sm font-medium">
              <span>Filter By</span>
              <div className="h-4 w-px bg-outline-variant" />
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">React</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Next.js</span>
              </div>
            </div>
          </OmniPanel>
        </div>

        {/* Tag Explorer Pattern */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            Explorer Pattern (Trace + Static)
          </p>
          <OmniPanel variant="trace" hoverEffect="none" elevation="default" header="Tag Explorer">
            <div className="p-4 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-8 bg-level rounded-lg border border-outline-variant/20" />
              ))}
            </div>
          </OmniPanel>
        </div>
      </div>
    </section>
  </div>
);

function Elevation() {
  return (
    <div className="space-y-16 pb-24">
      <section className="space-y-8">
        <h1 className="text-5xl font-black tracking-tight">Elevation</h1>
        <p>
          To deeply document and study Elevation in your system, we need to move beyond just "shadows." In a modern
          Design System (especially one following MD3 logic), elevation is a combination of Shadow, Tonal Overlay, and
          Z-index logic.
        </p>
        <section className="space-y-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black tracking-tight">1. The Level Hierarchy (The "Steps")</h2>
            <p className="text-sm text-on-surface-variant">
              This is the baseline study of the 5-6 levels of elevation in your system. It demonstrates how a panel
              "rises" from the background.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level 0: Flat */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Elevation: None</p>
              <OmniPanel elevation="none" header="Level 0: Flat">
                <div className="p-8 text-sm opacity-70">
                  Flush with the background. No shadow. Used for base layout sections and content dividers.
                </div>
              </OmniPanel>
            </div>

            {/* Level 1: Low */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Elevation: Low</p>
              <OmniPanel elevation="low" header="Level 1: Surface">
                <div className="p-8 text-sm opacity-80">
                  Subtle separation. Ideal for cards in a grid or items that need a distinct boundary without feeling
                  heavy.
                </div>
              </OmniPanel>
            </div>

            {/* Level 5: High */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Elevation: High</p>
              <OmniPanel elevation="high" header="Level 5: Floating">
                <div className="p-8 text-sm">
                  Maximum depth. Used for high-priority floating elements like Modals, FABs, or primary tooltips.
                </div>
              </OmniPanel>
            </div>
          </div>
          <section className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight">2. Tonal Elevation (The "Tint" Study)</h2>
              <p className="text-sm text-on-surface-variant">
                In dark mode, shadows are less effective. MD3 solves this by making higher-elevation surfaces lighter
                (adding a primary-colored overlay).
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-lowest p-8 rounded-[32px]">
              {/* Comparison A: Low Elevation in Dark */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Tonal Step: 1</p>
                <OmniPanel elevation="low" variant="none" header="Low Tonal Tint">
                  <div className="p-12 text-center text-sm">Slightly lighter than the background.</div>
                </OmniPanel>
              </div>

              {/* Comparison B: High Elevation in Dark */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Tonal Step: 5</p>
                <OmniPanel elevation="high" variant="none" header="High Tonal Tint">
                  <div className="p-12 text-center text-sm font-bold">
                    Noticeably brighter. This uses a higher opacity of the brand overlay.
                  </div>
                </OmniPanel>
              </div>
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight">3. Dynamic Elevation (The "Interaction" Physics)</h2>
              <p className="text-sm text-on-surface-variant">
                Elevation shouldn't always be static. We need to document how a panel transitions between levels during
                a user's interaction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lift Interaction */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Interaction: Lift</p>
                <OmniPanel hoverEffect="lift" elevation="low" header="Elevating on Hover">
                  <div className="p-8 text-sm italic">
                    Hover to see the Y-axis translation and shadow expansion. This is the "Discovery" pattern.
                  </div>
                </OmniPanel>
              </div>

              {/* Shadow Interaction */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Interaction: Shadow</p>
                <OmniPanel hoverEffect="shadow" elevation="default" header="Tactile Compression">
                  <div className="p-8 text-sm italic">
                    Hover to see the "Button press." The card compresses while the shadow deepens internally.
                  </div>
                </OmniPanel>
              </div>
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight">4. Grouped Elevation</h2>
              <p className="text-sm text-on-surface-variant">
                The "Parent-Child" protocol: Preventing shadow-stacking and visual muddying.
              </p>
            </div>

            <OmniPanel elevation="low" header="Parent Container (L1)">
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-low/50">
                {/* SUCCESS: Level 0 Child */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary font-bold">
                    Standard: Level 0
                  </p>
                  <OmniPanel elevation="none" className="bg-lowest border-dashed">
                    <div className="p-6 text-xs italic">
                      Child is flush. We use a dashed border or a slight color shift instead of a shadow to show
                      containment.
                    </div>
                  </OmniPanel>
                </div>

                {/* WARNING: Level 1 Child */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-error font-bold">
                    Avoid: Level 1+
                  </p>
                  <OmniPanel elevation="low">
                    <div className="p-6 text-xs opacity-60">
                      Nesting shadows (L1 inside L1) creates "Shadow Bleed," making the parent's surface look dirty.
                    </div>
                  </OmniPanel>
                </div>
              </div>
            </OmniPanel>
          </section>
          <section className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight">5. Contextual Elevation</h2>
              <p className="text-sm text-on-surface-variant">
                Temporal depth: Animating elevation based on scroll-state and viewport context.
              </p>
            </div>

            <div className="relative h-64 w-full rounded-[32px] overflow-hidden border border-outline-variant/20 bg-lowest">
              {/* Floating Header Spec */}
              <motion.div
                className="absolute top-0 left-0 right-0 z-20 px-6 py-4 bg-level/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-xl"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black tracking-tighter text-primary">OMNI_NAV_SYSTEM</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">Elevated: L2</span>
                </div>
              </motion.div>

              <div className="p-8 pt-20 space-y-4 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 w-full bg-on-surface rounded-full" />
                ))}
              </div>

              {/* Floating Action Spec */}
              <div className="absolute bottom-6 right-6">
                <OmniPanel
                  elevation="high"
                  className="rounded-full h-14 w-14 flex items-center justify-center bg-primary text-on-primary"
                >
                  <span className="font-bold">+</span>
                </OmniPanel>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              <div className="p-4 rounded-xl bg-level">
                <p className="font-bold mb-1">Z-Stack Architecture</p>
                <ul className="list-mono space-y-1 opacity-70">
                  <li>z-0: Document Base</li>
                  <li>z-10: Sticky Elements (Resting)</li>
                  <li>z-50: Modals / Overlays</li>
                  <li>z-100: Critical Alerts (Toasts)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-level">
                <p className="font-bold mb-1">Scroll Trigger Logic</p>
                <p className="opacity-70 leading-relaxed">
                  We use a "useScroll" hook to monitor "scrollY". When "y greater than 0", the header elevation
                  transitions from "none" to `low` to visually separate it from the content passing underneath.
                </p>
              </div>
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight">6. The Glass Layer</h2>
              <p className="text-sm text-on-surface-variant">
                High-Z overlays that utilize backdrop-blur to maintain environmental context. The final boss of
                elevation. It combines Maximum Elevation with Backdrop Diffusion. This signals to the user that the
                element is "Above the Document," existing in the same physical space as the glass of the screen itself.
              </p>
            </div>

            <div className="relative h-64 w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-primary/20 via-tertiary/20 to-secondary/20 flex items-center justify-center">
              {/* Floating Glass Panel */}
              <div className="z-10 w-2/3">
                <OmniPanel
                  elevation="high"
                  className="bg-surface/10 backdrop-blur-xl border-white/20"
                  header="Glass Overlay"
                  footer="Filter: blur(24px) | Elevation: 5"
                >
                  <div className="p-6 text-sm text-center">
                    By blurring the background, we allow the user to see "movement" behind the panel without sacrificing
                    the legibility of the foreground.
                  </div>
                </OmniPanel>
              </div>

              {/* Decorative background shapes to show blur effect */}
              <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-primary blur-2xl opacity-50" />
              <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-tertiary blur-3xl opacity-50" />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}

export const OMNI_TABS = [
  { id: 99, label: 'Omni Cards', icon: '🃏', content: BEHAVIOR },
  { id: 100, label: 'Elevation', icon: '🏔️', content: <Elevation /> },
];
