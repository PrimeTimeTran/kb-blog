'use client';
import React from 'react';

import { Difficulty, PremiumFilter } from '@/hooks/useProblemEngine';
import { RichTooltip } from '@/components/ToolTipRich';
import { AnimatedSortIcon } from '@/components/AnimatedSortIcon';

import {
  HiOutlineRefresh,
  HiOutlineChevronRight,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiOutlineCubeTransparent,
} from 'react-icons/hi';
import { VscBeaker, VscLayers, VscListFilter } from 'react-icons/vsc';

import { OmniPanel } from '../../components/OmniPanel';
import { StyledButton } from '../../components/StyledButton';
import { StyledSelection } from '../../components/StyledSelection';

const LIST_OPTIONS = [
  { key: 'all', label: 'All', icon: <VscLayers className="text-xs" /> },
  { key: 'pareto', label: 'Pareto' },
  { key: 'blind75', label: 'Blind 75' },
  { key: 'neetCode150', label: 'NC 150' },
  { key: 'neetCode250', label: 'NC 250' },
];

export const FilterToolbar = ({ actions, filters, resetFilters }) => {
  const isDirty =
    filters.selectedList !== 'all' || filters.selectedDifficulties.length < 3 || filters.selectedPremium.length < 2;

  function renderListSelection() {
    return (
      <StyledSelection
        forceDropdown={true}
        options={LIST_OPTIONS}
        value={filters.selectedList}
        onChange={actions.setSelectedList}
        icon={<VscListFilter />}
      />
    );
  }

  return (
    <OmniPanel variant="none" className="mx-auto w-fit transition-all">
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 md:gap-y-3 px-4 py-2">
        <div className="flex items-center justify-center gap-2">
          <div className="shrink-0">{renderListSelection()}</div>

          <div className="h-4 w-px bg-outline-variant/50" />

          <div className="shrink-0">{renderDifficultyAndClassSelect()}</div>
        </div>
        <div className="hidden md:block h-6 w-px bg-outline-variant" />
        <div className="flex items-center justify-center gap-3">
          <div className="shrink-0">{renderSortSelect()}</div>
          <div className="h-6 w-px bg-outline-variant/50" />
          <div className="flex items-center gap-2 shrink-0">{renderActionGroup()}</div>
        </div>
      </div>
    </OmniPanel>
  );

  function renderActionGroup() {
    return (
      <section className="flex items-center gap-0.5 bg-high/40 rounded-lg p-0.5 border border-outline-variant">
        {[
          [actions.handleShuffle, <HiOutlineCubeTransparent />, 'Shuffle', 'Alt+O'],
          [actions.handleNext, <HiOutlineChevronRight />, 'Next', 'Alt+P'],
          [actions.handleRandom, <VscBeaker />, 'Random', 'Alt+R'],
        ].map(([fn, icon, title, shortcut], i) => (
          <RichTooltip key={i} title={title as string} description={shortcut as string}>
            <button
              onClick={fn as () => void}
              className="p-1.5 text-(--on-surface-variant)/70 hover:bg-primary-container hover:text-primary rounded-md transition-all active:scale-90"
            >
              <span className="text-lg">{icon as React.ReactNode}</span>
            </button>
          </RichTooltip>
        ))}
      </section>
    );
  }

  function renderSortSelect() {
    const isDesc = filters.sortBy === 'difficulty-desc';
    return (
      <div className="flex items-center gap-0.5">
        <StyledButton
          isActive={true}
          onClick={() => actions.setSortBy(isDesc ? 'difficulty-asc' : 'difficulty-desc')}
          text={
            <AnimatedSortIcon
              watch={isDesc}
              tooltipTitle="Difficulty Order"
              tooltipDescription={isDesc ? 'Sorting: Hard → Easy' : 'Sorting: Easy → Hard'}
            >
              {isDesc ? <HiOutlineSortDescending /> : <HiOutlineSortAscending />}
            </AnimatedSortIcon>
          }
        />

        {/* The "Clear All" button can stay or go, but it's now a "luxury" feature */}
        <div className="min-w-[85px] flex justify-center">
          {isDirty && (
            <RichTooltip title="Reset" description="Clear all active filters">
              <button
                onClick={resetFilters}
                className="
                group flex items-center gap-1.5 px-2 py-1 text-[9px] font-black tracking-tighter rounded-md transition-all
                text-success opacity-80 hover:opacity-100 hover:bg-success/10 cursor-pointer
                animate-in fade-in zoom-in-95 duration-200
              "
              >
                <HiOutlineRefresh className="text-xs group-hover:rotate-[-45deg] transition-transform" />
                RESET
              </button>
            </RichTooltip>
          )}
        </div>
      </div>
    );
  }

  function renderDifficultyAndClassSelect() {
    return (
      <div className="flex items-center gap-1.5 rounded-xl border border-outline-variant/10">
        <section className="flex items-center gap-1">
          {(['e', 'm', 'h'] as const).map((d) => {
            // 1. Direct state check: if it's in the array, it's lit up.
            const isActive = filters.selectedDifficulties.includes(d);

            const labels = { e: 'Easy', m: 'Med', h: 'Hard' };
            const shortLabels = { e: 'E', m: 'M', h: 'H' };
            const tones = { e: 'success', m: 'warning', h: 'error' } as const;

            return (
              <StyledButton
                key={d}
                tone={tones[d]}
                isActive={isActive}
                onClick={() => {
                  const current = filters.selectedDifficulties;
                  const isSelected = current.includes(d);

                  let next: Difficulty[];
                  if (isSelected) {
                    // If this is the last one active, clicking it resets everything to ALL
                    if (current.length === 1) {
                      next = ['e', 'm', 'h'];
                    } else {
                      // Otherwise, just remove this specific difficulty
                      next = current.filter((item) => item !== d);
                    }
                  } else {
                    // If it wasn't active, add it back to the filter
                    next = [...current, d];
                  }

                  actions.setSelectedDifficulties(next);
                }}
                className="whitespace-nowrap min-w-[32px] sm:min-w-[64px]"
                text={
                  <span className="flex items-center">
                    <span className="hidden sm:inline">{labels[d]}</span>
                    <span className="inline sm:hidden">{shortLabels[d]}</span>
                  </span>
                }
              />
            );
          })}
        </section>

        <div className="h-4 w-px bg-outline-variant/30" />

        <section className="flex items-center gap-0.5">
          {['free', 'premium'].map((p) => {
            const isSelected = filters.selectedPremium.includes(p);

            return (
              <StyledButton
                key={p}
                text={p.toUpperCase()}
                isActive={isSelected}
                onClick={() => {
                  const current = filters.selectedPremium;

                  let next: PremiumFilter[];
                  if (isSelected) {
                    // If it's the last one active, reset to BOTH (All)
                    if (current.length === 1) {
                      next = ['free', 'premium'];
                    } else {
                      // Otherwise, just remove this specific filter
                      next = current.filter((item) => item !== p);
                    }
                  } else {
                    // If it wasn't active, add it back to the group
                    next = [...current, p];
                  }

                  actions.setSelectedPremium(next);
                }}
                className="whitespace-nowrap px-2 sm:px-3"
              />
            );
          })}
        </section>
      </div>
    );
  }
};
