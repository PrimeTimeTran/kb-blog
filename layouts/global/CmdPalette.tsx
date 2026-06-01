'use client';

import { COMMANDS, COMMAND_MAP, GROUPS } from './Commands';
import React, { useEffect, useMemo, useState } from 'react';

import { CommandRef } from './types';
import { createPortal } from 'react-dom';

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return createPortal(<PaletteUI close={onClose} />, document.body);
}
export function PaletteUI({ close }: { close: () => void }) {
  const MAX_PREVIEW_ITEMS = 5;
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const isSearching = q.length > 0;

    return GROUPS.map((group) => {
      const items = group.items
        .filter((cmd) => {
          if (!isSearching) return true;

          const haystack = [cmd.label, cmd.hint, ...(cmd.keywords ?? [])].join(' ').toLowerCase();

          return haystack.includes(q);
        })
        .slice(0, isSearching ? undefined : MAX_PREVIEW_ITEMS);

      return {
        ...group,
        items,
      };
    }).filter((g) => g.items.length > 0);
  }, [query]);

  const flatItems = useMemo(() => {
    let out: any[] = [];

    filteredGroups.forEach((group) => {
      group.items.forEach((item) => {
        out.push({
          ...item,
          group: group.label,
        });
      });
    });

    return out;
  }, [filteredGroups]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const execute = (item: CommandRef) => {
    close();

    requestAnimationFrame(() => {
      const command = COMMAND_MAP[item.id];

      if (!command) {
        console.warn(`[Command] missing: ${item.id}`);
        return;
      }

      command.run();
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!flatItems.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      setSelected((v) => {
        if (v >= flatItems.length - 1) return 0;
        return v + 1;
      });
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      setSelected((v) => {
        if (v <= 0) return flatItems.length - 1;
        return v - 1;
      });
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      const item = flatItems[selected];

      if (item) {
        execute(item);
      }
    }
  };

  let absoluteIndex = -1;

  return (
    <div className="fixed inset-0 z-99">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      {/* palette */}
      <div className="absolute left-1/2 top-24 w-full max-w-xl -translate-x-1/2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f19] shadow-2xl">
          {/* input */}
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <span className="text-xs text-white/40">⌘K</span>

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search commands, files, settings..."
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
            />
          </div>

          {/* groups */}
          <div className="max-h-80 overflow-y-auto p-1">
            {filteredGroups.map((group) => (
              <div key={group.label} className="mb-2">
                <div className="px-2 py-1 text-[10px] uppercase tracking-wide text-white/30">{group.label}</div>

                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const resolveItem = (item) => COMMANDS[item.id];
                    absoluteIndex += 1;

                    const active = absoluteIndex === selected;

                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setSelected(absoluteIndex)}
                        onClick={() => execute(item)}
                        className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition
                          ${active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}
                        `}
                      >
                        <span className="truncate">{item.label}</span>

                        {item.hint && <span className="text-[10px] text-white/40">{item.hint}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
