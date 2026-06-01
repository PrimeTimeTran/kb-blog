'use client';

import { VscSearch, VscSortPrecedence, VscSymbolNumeric } from 'react-icons/vsc';

import { OmniPanel } from '../../components/OmniPanel';
import { RichTooltip } from '@/components/ToolTipRich';
import { StyledButton } from '../../components/StyledButton';
import { StyledInput } from '../../components/StyledInput';
import { useState } from 'react';

export function TagExplorer({ disabledToolbar = false, actions, filters, orderedTags, tagCounts }) {
  const [search, setSearch] = useState('');
  const isFiltering = filters.selectedTags.length > 0;
  const sortMode = 'asc';

  const displayedTags = orderedTags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));

  const headerContent = !disabledToolbar && (
    <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2">
      {/* LEFT: SEARCH + COUNT */}
      <div className="flex items-center gap-3 min-w-0 w-full">
        {/* SEARCH */}
        <div className="flex-1 min-w-0">
          <StyledInput value={search} onChange={setSearch} className="w-full" />
        </div>

        {/* COUNT (soft pill, not aggressive badge) */}
        <div
          className="
        shrink-0
        flex items-center
        h-7 px-2.5
        rounded-lg
        bg-level
        border border-outline-variant/50
        text-xs font-medium
        text-on-surface-muted
        tabular-nums
        whitespace-nowrap
      "
        >
          {displayedTags.length} found
        </div>
      </div>

      {/* RIGHT: TOOLS */}
      <div className="flex items-center gap-2 shrink-0">
        {/* SORT */}
        <section
          className="
        flex items-center gap-0.5
        rounded-lg
        border border-outline-variant/50
        bg-level
        p-0.5
      "
        >
          {[
            { id: 'alpha', icon: <VscSortPrecedence />, label: 'A-Z' },
            { id: 'count', icon: <VscSymbolNumeric />, label: 'Count' },
          ].map((opt) => {
            const active = sortMode === opt.id;

            return (
              <button
                key={opt.id}
                className={`
                h-7 w-7
                flex items-center justify-center
                rounded-md
                transition-all duration-150

                ${
                  active
                    ? `
                      bg-surface
                      text-on-surface
                      shadow-sm
                      border border-outline-variant/50
                    `
                    : `
                      text-on-surface-muted
                      hover:text-on-surface
                      hover:bg-surface/60
                    `
                }
              `}
              >
                <span className="text-[13px]">{opt.icon}</span>
              </button>
            );
          })}
        </section>

        {/* RESET (de-emphasized danger, not screaming CTA) */}
        {isFiltering && (
          <RichTooltip title="Reset filters" description="Clear all selected categories">
            <button
              type="button"
              onClick={() => actions.setSelectedTags([])}
              className="
              h-7 px-3
              rounded-lg
              bg-level
              border border-outline-variant/50
              text-xs font-medium
              text-error
              transition-all

              hover:bg-level/70
              hover:border-error/30

              animate-in fade-in zoom-in-95 duration-200
            "
            >
              reset
            </button>
          </RichTooltip>
        )}
      </div>
    </div>
  );

  return (
    <OmniPanel variant="pop" header={headerContent}>
      <div className="relative group/scroll-container max-w-5xl mx-auto bg-lowest">
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 z-20 md:hidden group-hover/scroll-container:opacity-100 transition-opacity">
          <div className="animate-bounce-horizontal text-primary">→</div>
        </div>
        <div className="p-2 w-screen md:max-h-[300px] overflow-x-auto md:overflow-y-auto custom-scrollbar no-scrollbar">
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden md:block group-hover/scroll-container:opacity-100 transition-opacity">
            <div className="animate-bounce text-primary">↓</div>
          </div>
          <div className="flex flex-wrap gap-2 min-h-16">
            {displayedTags.map((tag) => (
              <StyledButton
                key={tag}
                text={tag}
                count={tagCounts[tag]}
                isActive={!isFiltering || filters.selectedTags.includes(tag)}
                onClick={() => actions.toggleTag(tag)}
                // Tooltip Props
                tooltipTitle={tag.toUpperCase()}
                tooltipDescription={`View all ${tagCounts[tag]} problems related to ${tag}.`}
                onTooltipAction={() => actions.setSelectedTags([tag])}
                tooltipActions={[
                  { label: 'Docs', icon: '📚', onClick: () => console.log('docs') },
                  { label: 'Viz', icon: '🎥', onClick: () => console.log('viz') },
                ]}
              />
            ))}
            {disabledToolbar && isFiltering ? (
              <RichTooltip title="Reset" description="Enable all categories">
                <button
                  type="button"
                  onClick={() => actions.setSelectedTags([])}
                  className="text-[9px] font-black tracking-tighter px-3 py-1.5 rounded-md border border-dashed transition-all bg-(--error-container)/20 text-error border-(--error)/40 hover:bg-(--error-container)/40 animate-in fade-in zoom-in-95 slide-in-from-right-2 duration-200"
                >
                  ENABLE ALL
                </button>
              </RichTooltip>
            ) : (
              /* Placeholder to prevent header layout snap when button disappears */
              <div className="w-[80px]" />
            )}
          </div>
          {/* Reset Action Area - Optimized for visibility */}
          <div className="flex items-center justify-end ml-auto pr-2"></div>
          {displayedTags.length == 0 && <div className="flex items-center justify-end ml-auto pr-2">Try more</div>}
        </div>
      </div>
    </OmniPanel>
  );
}
