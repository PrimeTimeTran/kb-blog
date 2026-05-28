'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

type Tab = 'shortcuts' | 'commands' | 'navigation' | 'about';

type HelpCommand = {
  label: string;
  hint?: string;
  run?: () => void;
};

type HelpTab = {
  id: Tab;
  label: string;
  icon: string;
  commands: HelpCommand[];
};

const TABS: HelpTab[] = [
  {
    id: 'shortcuts',
    label: 'Shortcuts',
    icon: '⌨️',

    commands: [
      {
        label: 'Open Command Palette',
        hint: '⌘K',
      },

      {
        label: 'Open Help Panel',
        hint: '⌘/',
      },
    ],
  },

  {
    id: 'commands',
    label: 'Commands',
    icon: '⚡',

    commands: [
      {
        label: 'Configure Hotkeys',
        hint: 'Settings',
      },

      {
        label: 'Search Files',
        hint: 'Future',
      },
    ],
  },
];

export function HelpPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return createPortal(<HelpUI onClose={onClose} />, document.body);
}

function HelpUI({ onClose }: { onClose: () => void }) {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const [focusArea, setFocusArea] = useState<'left' | 'right'>('left');

  const activeTab = TABS[leftIndex];
  const commands = activeTab.commands;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      //
      // LEFT PANE
      //
      if (focusArea === 'left') {
        if (e.key === 'ArrowDown') {
          e.preventDefault();

          setLeftIndex((v) => {
            if (v >= TABS.length - 1) return 0;
            return v + 1;
          });
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();

          setLeftIndex((v) => {
            if (v <= 0) return TABS.length - 1;
            return v - 1;
          });
        }

        if (e.key === 'ArrowRight') {
          e.preventDefault();

          setFocusArea('right');
          setRightIndex(0);
        }
      }

      //
      // RIGHT PANE
      //
      else {
        if (e.key === 'ArrowDown') {
          e.preventDefault();

          setRightIndex((v) => {
            if (v >= commands.length - 1) return 0;
            return v + 1;
          });
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();

          setRightIndex((v) => {
            if (v <= 0) return commands.length - 1;
            return v - 1;
          });
        }

        if (e.key === 'ArrowLeft') {
          e.preventDefault();

          setFocusArea('left');
        }

        if (e.key === 'Enter') {
          e.preventDefault();

          commands[rightIndex]?.run?.();
        }
      }

      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);

    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [focusArea, leftIndex, rightIndex, commands, onClose]);

  return (
    <div className="fixed inset-0 z-9999">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* panel */}
      <div className="absolute left-1/2 top-20 flex w-225 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f19] shadow-2xl">
        {/* LEFT SIDEBAR */}
        <div className="w-64 border-r border-white/10 p-2">
          <div className="mb-2 px-2 text-[10px] uppercase tracking-wide text-white/30">Help</div>

          {TABS.map((tab, index) => {
            const active = index === leftIndex;

            return (
              <button
                key={tab.id}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition ${
                  active
                    ? focusArea === 'left'
                      ? 'bg-white/15 text-white ring-1 ring-white/20'
                      : 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5'
                }
      `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-2">
          <div className="mb-2 px-2 text-[10px] uppercase tracking-wide text-white/30">{activeTab.label}</div>

          <div className="space-y-0.5">
            {commands.map((cmd, index) => {
              const active = focusArea === 'right' && index === rightIndex;

              return (
                <button
                  key={cmd.label}
                  onClick={() => cmd.run?.()}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition ${active ? 'bg-white/15 text-white ring-1 ring-white/20' : 'text-white/70 hover:bg-white/5'}`}
                >
                  <span>{cmd.label}</span>

                  {cmd.hint && <span className="text-[10px] text-white/40">{cmd.hint}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function ShortcutsView() {
  return (
    <div className="space-y-2">
      <h2 className="text-white/60">Keyboard Shortcuts</h2>

      <Row k="Cmd / Ctrl + K" v="Command palette" />
      <Row k="Cmd / Ctrl + /" v="Help panel" />
      <Row k="Esc" v="Close overlays" />
    </div>
  );
}

function CommandsView() {
  return (
    <div className="space-y-2">
      <h2 className="text-white/60">Commands</h2>
      <Row k="Search files" v="Future feature" />
      <Row k="Configure hotkeys" v="Settings panel" />
    </div>
  );
}

function NavigationView() {
  return (
    <div className="space-y-2">
      <h2 className="text-white/60">Navigation</h2>
      <Row k="Click tree" v="Open file" />
      <Row k="Right panel" v="Inspector view" />
    </div>
  );
}

function AboutView() {
  return (
    <div className="space-y-2">
      <h2 className="text-white/60">About</h2>
      <p className="text-white/50">
        MiniReact Exhibit system with custom runtime, file tree, and slot-based layout engine.
      </p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-white/5">
      <span className="text-white/70">{k}</span>
      <span className="text-white/40">{v}</span>
    </div>
  );
}
