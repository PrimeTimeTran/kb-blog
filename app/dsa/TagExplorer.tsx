'use client';
import { useState } from 'react';

import { RichTooltip } from '@/components/ToolTipRich';
import { VscSearch, VscSymbolNumeric, VscSortPrecedence } from 'react-icons/vsc';

import { OmniPanel } from '../../components/OmniPanel';
import { StyledButton } from '../../components/StyledButton';
import { StyledInput } from '../../components/StyledInput';

export function TagExplorer({ disabledToolbar = false, actions, filters, orderedTags, tagCounts }) {
  const [search, setSearch] = useState('');
  const isFiltering = filters.selectedTags.length > 0;
  const sortMode = 'asc';

  const displayedTags = orderedTags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));

  const headerContent = !disabledToolbar && (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <VscSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors text-xs" />
          <StyledInput value={search} onChange={setSearch} />
        </div>
        <div className="text-[9px] font-black text-primary/70 uppercase tracking-tighter bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
          {displayedTags.length} Found
        </div>
      </div>
      <div className="flex items-center gap-1">
        <section className="flex bg-highest/60 rounded-lg p-0.5 border border-outline-variant">
          {[
            { id: 'alpha', icon: <VscSortPrecedence />, label: 'A-Z' },
            { id: 'count', icon: <VscSymbolNumeric />, label: 'Count' },
          ].map((opt) => (
            <button
              key={opt.id}
              className={`
                    p-1.5 rounded-md transition-all
                    ${
                      sortMode === opt.id
                        ? 'bg-primary-container text-primary shadow-sm'
                        : 'text-on-surface-variant/40 hover:text-primary hover:bg-primary/5'
                    }
                  `}
            >
              <span className="text-sm">{opt.icon}</span>
            </button>
          ))}
        </section>

        <div className="h-4 w-px bg-outline-variant/50 mx-2" />
        <div className="flex items-center justify-center min-w-[100px] h-8">
          {isFiltering && (
            <RichTooltip title="Reset" description="Enable all categories">
              <button
                type="button"
                onClick={() => actions.setSelectedTags([])}
                className="text-[9px] font-black tracking-tighter px-3 py-1 rounded-md border border-dashed transition-all bg-(--error-container)/20 text-error border-(--error)/40 hover:bg-(--error-container)/40 animate-in fade-in zoom-in-95 duration-200"
              >
                ENABLE ALL
              </button>
            </RichTooltip>
          )}
        </div>
      </div>
      {/* Sorting / Reset logic here... */}
    </div>
  );

  return (
    <OmniPanel variant="trace" header={headerContent}>
      <div className="relative group/scroll-container w-full">
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
