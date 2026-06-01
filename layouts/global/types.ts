import { COMMANDS } from './Commands';

export type Overlay = 'command' | 'help' | null;

export type OverlayState = {
  active: Overlay;
  sidebarOpen: boolean;
};

export type CommandId = keyof typeof COMMANDS;

export type CommandRef = {
  id: CommandId;
};

export type Command = {
  id: string;
  label: string;
  hint?: string;
  hotkey?: string;
  keywords?: string[];
  group: CommandGroupId;
  run: () => void;
  icon?: string;
};

export type CommandGroupId = 'shortcuts' | 'commands' | 'navigation' | 'about';
export type CommandGroup = {
  label: string;
  items: CommandRef[];
};
export type Tab = 'shortcuts' | 'commands' | 'navigation' | 'about';
export type HelpTab = {
  id: Tab;
  label: string;
  icon: string;
  filter: (command: Command) => boolean;
};
