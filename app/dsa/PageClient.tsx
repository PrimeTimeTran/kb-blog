'use client';
import { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// import siteMetadata from '../data/site-metadata.js'

import { BaseScroll } from '@/components/BaseScroll';
import { CenterRegion } from '@/components/layout/CenterRegion';

import { Solution } from '@/components/Solution.jsx';

import { useProblemEngine } from '@/hooks/useProblemEngine';
import { Tooltip } from '@/components/ToolTip';

import { TagExplorer } from './TagExplorer';
import { FilterToolbar } from './FilterToolbar';

export function PageClient() {
  const {
    filters,
    actions,
    solutions,
    tagCounts,
    orderedTags,
    displayedProblems,
    randomlySelected,
    getDifficulty,
    hasSolution,
  } = useProblemEngine();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [focusedSolution, setFocusedSolution] = useState(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === 'KeyO') {
        e.preventDefault();
        actions.handleShuffle();
      }
      if (e.altKey && e.code === 'KeyR') {
        e.preventDefault();
        actions.handleRandom();
      }
      if (e.altKey && e.code === 'KeyP') {
        e.preventDefault();
        actions.handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [actions]);

  const showProblemSolutions = (e, problem) => {
    e.preventDefault();
    e.stopPropagation();
    const solution = solutions.find((s) => s.id === problem.lc.id);
    if (solution) {
      setFocusedSolution(solution);
      if (!isSidebarOpen) setIsSidebarOpen(true);
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col not-prose">
      <BaseScroll>
        <div className="space-y-2 px-2 mt-2 w-full mb-2">
          <TagExplorer actions={actions} filters={filters} orderedTags={orderedTags} tagCounts={tagCounts} />
          <FilterToolbar
            actions={actions}
            filters={filters}
            resetFilters={() => {
              actions.setSelectedList('all');
              actions.setSortBy('difficulty-asc');
              actions.setSelectedPremium(['free', 'premium']);
              actions.setSelectedDifficulties(['e', 'm', 'h']);
              actions.setSelectedTags([]);
            }}
          />
        </div>
        <CenterRegion>
          <Suspense fallback={<ProblemListSkeleton count={15} />}>{renderProblemList()}</Suspense>
        </CenterRegion>
      </BaseScroll>
      {renderSidebarAndBackdrop()}
    </div>
  );
  function renderSidebarAndBackdrop() {
    return (
      <>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-scrim/30 transition-opacity" onClick={() => setIsSidebarOpen(false)} />
        )}
        {renderSidebar()}
      </>
    );
  }
  function renderSidebar() {
    return (
      <div
        ref={sidebarRef}
        className={`fixed right-0 top-0 z-50 h-full w-full md:w-1/3 lg:w-[600px] overflow-y-auto transition-transform duration-300 ease-emphasized bg-surface-container-low 
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-2 bg-surface-container-high border-b border-outline-variant/40 shadow-sm">
          <h2 className="text-title-large font-semibold">Solutions</h2>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="icon-button"
            aria-label="Close sidebar"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-4 w-full">
          {focusedSolution &&
            (focusedSolution?.solutions ?? []).map((solution, idx) => <Solution key={idx} solution={solution} />)}
        </div>
      </div>
    );
  }

  function renderProblemList() {
    return (
      <AnimatePresence>
        {(displayedProblems ?? []).map((problem, i) => (
          <motion.div
            layout
            key={problem.lc.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`flex items-start gap-2 w-full px-2 py-1  transition-colors ${i % 2 === 0 ? 'bg-surface-container' : 'bg-surface-container-low'} hover:bg-surface-container-high`}
            >
              <a
                href={problem.url}
                target="_blank"
                className="gap-2 text-lg text-on-surface dark:text-on-surface group"
                rel="noreferrer"
                onClick={() => actions.markAttempted(problem.lc.id)}
              >
                <div className="flex items-start gap-2 w-full group-hover:text-primary">
                  <span className="w-12 text-right">{i + 1}. </span>
                  <span
                    className={` ${
                      randomlySelected.map(String).includes(String(problem.lc.id)) // Force string comparison
                        ? 'line-through text-primary dark:text-primary decoration-on-primary dark:decoration-on-primary'
                        : ''
                    }`}
                  >
                    {problem.title}
                  </span>
                  <span className={'text-sm ' + getDifficulty(problem.difficulty)}>[{problem.difficulty}]</span>
                  {hasSolution(problem) && <button onClick={(e) => showProblemSolutions(e, problem)}>📝</button>}
                </div>
              </a>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }
}

export function ProblemListSkeleton({ rows = 10 }: { rows?: number }) {
  const widths = ['w-[85%]', 'w-[65%]', 'w-[75%]', 'w-[50%]', 'w-[80%]'];

  return (
    <div className="flex flex-col bg-surface-container-low">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60"
        >
          {/* 1. ICON GHOST: Slightly darker than background */}
          <div className="h-5 w-5 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />

          {/* 2. BODY GHOST: The Shimmering Text */}
          <div className="flex flex-col gap-2.5 w-full">
            <div className={`h-3 ${widths[i % widths.length]} rounded-sm animate-shimmer`} />
            {/* Optional second line for a "dense" look */}
            <div className={`h-2 w-[30%] rounded-sm opacity-50 animate-shimmer`} />
          </div>

          {/* 3. META GHOST: Action/Difficulty buttons */}
          <div className="flex gap-2 shrink-0">
            <div className="h-6 w-12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
