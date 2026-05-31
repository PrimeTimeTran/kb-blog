import { Command, CommandGroupId, HelpTab } from './types';

export const getActiveCommands = () => {
  return Object.values(COMMANDS);
};

export function normalizeHotkey(e: KeyboardEvent) {
  const parts = [];

  if (e.metaKey || e.ctrlKey) parts.push('meta');
  if (e.altKey) parts.push('alt');
  if (e.shiftKey) parts.push('shift');

  parts.push(e.key.toLowerCase());

  return parts.join('+');
}

export const COMMANDS: Command[] = [
  // =========================================
  // SYSTEM / UI TOGGLES
  // =========================================

  {
    id: 'cmd-palette',
    label: 'Open Command Palette',
    hint: '⌘K',
    hotkey: 'meta+k',
    keywords: ['palette', 'commands', 'search'],
    group: 'commands',
    run: () => {
      window.dispatchEvent(new CustomEvent('overlay:command'));
    },
  },

  {
    id: 'help',
    label: 'Open Help Panel',
    hint: '⌘/',
    hotkey: 'meta+/',
    keywords: ['help', 'shortcuts'],
    group: 'shortcuts',
    run: () => {
      window.dispatchEvent(new CustomEvent('overlay:help'));
    },
  },

  {
    id: 'close',
    label: 'Close',
    hint: 'ESC',
    hotkey: 'Escape',
    keywords: ['palette', 'commands', 'search'],
    group: 'commands',
    run: () => {
      window.dispatchEvent(new CustomEvent('overlay:close'));
    },
  },
  {
    id: 'sidebar-toggle',
    label: 'Toggle Primary Sidebar Visibility',
    hint: '⌘B',
    hotkey: 'meta+b',
    keywords: ['sidebar', 'navigation', 'layout'],
    group: 'navigation',
    run: () => {
      window.dispatchEvent(new CustomEvent('view:primary-sidebar'));
    },
  },

  // =========================================
  // COMMANDS / SETTINGS
  // =========================================

  {
    id: 'hotkeys',
    label: 'Configure Hotkeys',
    hint: 'Settings',
    keywords: ['settings', 'shortcuts', 'keybinds'],
    group: 'commands',
    run: () => {
      window.dispatchEvent(new CustomEvent('overlay:hotkeys'));
    },
  },

  // =========================================
  // WORKSPACE / NAVIGATION
  // =========================================

  {
    id: 'workspace',
    label: 'Open Workspace',
    hint: '⌘O',
    hotkey: 'meta+o',
    keywords: ['workspace', 'project', 'open'],
    group: 'navigation',
    run: () => {
      window.dispatchEvent(new CustomEvent('workspace:open'));
    },
  },

  {
    id: 'search-files',
    label: 'Search Files',
    hint: '⌘P',
    hotkey: 'meta+p',
    keywords: ['search', 'files', 'find'],
    group: 'navigation',
    run: () => {
      window.dispatchEvent(new CustomEvent('files:search'));
    },
  },
];
export const COMMAND_MAP = Object.fromEntries(COMMANDS.map((cmd) => [cmd.id, cmd])) as Record<string, Command>;

export const GROUP_LABELS: Record<CommandGroupId, string> = {
  shortcuts: 'Shortcuts',
  commands: 'Commands',
  navigation: 'Navigation',
  about: 'About',
};
export const GROUPS = Object.entries(
  COMMANDS.reduce<Record<string, Command[]>>((acc, cmd) => {
    const group = cmd.group ?? 'commands';

    if (!acc[group]) acc[group] = [];
    acc[group].push(cmd);

    return acc;
  }, {}),
).map(([group, items]) => ({
  label: GROUP_LABELS[group as CommandGroupId] ?? group,
  items,
}));

export const TABS: HelpTab[] = [
  {
    id: 'shortcuts',
    label: 'Shortcuts',
    icon: '⌨️',
    filter: (cmd) => cmd.group === 'shortcuts',
  },
  {
    id: 'commands',
    label: 'Commands',
    icon: '⚡',
    filter: (cmd) => cmd.group === 'commands',
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: '🧭',
    filter: (cmd) => cmd.group === 'navigation',
  },
  {
    id: 'about',
    label: 'About',
    icon: 'ℹ️',
    filter: (cmd) => cmd.group === 'about',
  },
];
