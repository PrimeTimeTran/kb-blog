'use client';

import { useEffect, useMemo, useState } from 'react';

import { createPortal } from 'react-dom';

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return createPortal(<PaletteU1 close={onClose} />, document.body);
}

export function PaletteUI() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const hotkey = isMac ? e.metaKey : e.ctrlKey;

      if (hotkey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }

      if (e.key === 'Escape') {
        setOpen(false);
      }
      if (e.key === 'k' && e.altKey && e.shiftKey) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/60"
        onClick={() => setOpen(false)}
      />

      {/* palette */}
      <div className="absolute left-1/2 top-24 w-full max-w-xl -translate-x-1/2">
        <div className="rounded-2xl border border-white/10 bg-[#0b0f19] shadow-2xl">
          {/* input */}
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <span className="text-white/40">⌘K</span>
            <input
              autoFocus
              placeholder="Search commands, files, settings..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>

          {/* results */}
          <div className="max-h-72 overflow-y-auto p-2">
            <CommandItem label="Configure hotkeys" hint="Settings" />
            <CommandItem label="Search files" hint="Future" />
            <CommandItem label="Open workspace" hint="Cmd+O" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

type CommandGroup = {
  label: string;
  items: CommandItemType[];
};

type CommandItemType = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string[];
  run?: () => void;
};

const GROUPS: CommandGroup[] = [
  {
    label: 'Recent',
    items: [
      {
        id: 'help',
        label: 'Open Help Panel',
        hint: '⌘/',
        keywords: ['help', 'shortcuts'],
        run: () => {
          window.dispatchEvent(new CustomEvent('overlay:help'));
        },
      },
      {
        id: 'hotkeys',
        label: 'Configure Hotkeys',
        hint: 'Settings',
      },
    ],
  },

  {
    label: 'Suggested',
    items: [
      {
        id: 'search-files',
        label: 'Search Files',
        hint: 'Future',
      },
      {
        id: 'workspace',
        label: 'Open Workspace',
        hint: '⌘O',
      },
    ],
  },
];

export function PaletteU1({ close }: { close: () => void }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return GROUPS;

    return GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const haystack = [item.label, item.hint, ...(item.keywords ?? [])].join(' ').toLowerCase();

        return haystack.includes(q);
      }),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const flatItems = useMemo(() => filteredGroups.flatMap((g) => g.items), [filteredGroups]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const execute = (item: CommandItemType) => {
    close();

    requestAnimationFrame(() => {
      item.run?.();
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
    <div className="fixed inset-0 z-[9999]">
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

function CommandItem({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-xs text-white/80 hover:bg-white/10">
      <span>{label}</span>
      {hint && <span className="text-xs text-white/40">{hint}</span>}
    </div>
  );
}
