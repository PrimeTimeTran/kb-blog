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
    <div
      className="
      flex items-center justify-between
      rounded-xl
      bg-low/40
      px-3 py-2
      backdrop-blur-sm
    "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Search */}
        <div
          className="
          relative group
          flex items-center
        "
        >
          <VscSearch
            className="
            absolute left-2.5 top-1/2 -translate-y-1/2
            text-[11px]
            text-on-surface-variant/40
            group-focus-within:text-primary
            transition-colors
          "
          />

          <StyledInput
            value={search}
            onChange={setSearch}
            className="
            h-8
            pl-7
            pr-2
            text-xs
            bg-background/40
            border border-outline-variant/50
            rounded-lg
          "
          />
        </div>

        {/* Count */}
        <div
          className="
          h-6 px-2
          flex items-center
          rounded-md
          border border-primary/10
          bg-primary/5
          text-[9px]
          font-black
          uppercase
          tracking-[0.14em]
          text-primary/70
          whitespace-nowrap
        "
        >
          {displayedTags.length} Found
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* Sort group */}
        <section
          className="
          flex items-center gap-0.5
          rounded-lg
          border border-outline-variant/60
          bg-background/50
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
                      bg-high
                      text-primary
                      shadow-[0_0_0_1px_rgba(255,255,255,0.03)]
                    `
                    : `
                      text-on-surface-variant/45
                      hover:text-on-surface
                      hover:bg-high/40
                    `
                }
              `}
              >
                <span className="text-[13px]">{opt.icon}</span>
              </button>
            );
          })}
        </section>

        {/* Reset */}
        {isFiltering && (
          <RichTooltip title="Reset" description="Enable all categories">
            <button
              type="button"
              onClick={() => actions.setSelectedTags([])}
              className="
              h-7 px-2.5
              rounded-md
              border border-(--error)/20
              bg-(--error-container)/10
              text-[9px]
              font-black
              tracking-[0.14em]
              text-error
              transition-all
              hover:bg-(--error-container)/20
              hover:border-(--error)/30
              animate-in fade-in zoom-in-95 duration-200
            "
            >
              RESET
            </button>
          </RichTooltip>
        )}
      </div>
    </div>
  );

  return (
    <OmniPanel variant="trace" header={headerContent}>
      <div className="relative group/scroll-container max-w-5xl mx-auto">
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 z-20 md:hidden group-hover/scroll-container:opacity-100 transition-opacity">
          <div className="animate-bounce-horizontal text-primary">→</div>
        </div>
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden md:block group-hover/scroll-container:opacity-100 transition-opacity">
          <div className="animate-bounce text-primary">↓</div>
        </div>
        <div className="p-2 md:max-h-[300px] overflow-x-auto md:overflow-y-auto custom-scrollbar no-scrollbar">
          <div className="flex flex-wrap gap-2">
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
        </div>
      </div>
    </OmniPanel>
  );
}
