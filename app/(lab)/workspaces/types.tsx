import React, { RefObject } from 'react';

import { themes } from './theme';
import { useViewport } from '@/hooks/useViewport';

export type WorkspaceId = string;
export type WorkspaceNavigationMode = 'idle' | 'select' | 'preview';

export type RailOrientation = 'horizontal' | 'vertical';
export type RailPosition = 'left' | 'right' | 'top' | 'bottom';
export type RailAnchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type Workspace = {
  id: string;
  title: string;
  persist?: boolean;
  theme?: keyof typeof themes;
  component: React.ComponentType<WorkspaceComponentProps>;
};
export type WorkspaceComponentProps = {
  workspaceId: string;
};
export interface ViewportAPI {
  isVertical: boolean;
  isHorizontal: boolean;
  activeId: WorkspaceId;
  previewId: WorkspaceId | null;
  select: (id: WorkspaceId) => void;
  preview: (id: WorkspaceId | null) => void;
  navigationMode: WorkspaceNavigationMode;
  animateRef: RefObject<boolean>;
  rail: RailState;
  orientation: RailOrientation;
  interactRail: (anchor: RailState['anchor']) => void;
  handleLongPress: (anchor: RailState['anchor']) => void;
}
export type WorkspaceProps = {
  children: React.ReactNode;
  viewport: ReturnType<typeof useViewport>;
  viewportRail: React.ReactNode;
};
export type ViewportProps = {
  viewport: ViewportAPI;
  workspaces: Workspace[];
};
export type ViewportControllerProps = {
  viewport: ViewportAPI;
};
export type ViewportRailProps = {
  items: Workspace[];
  viewport: ViewportAPI;
};
export type RailProps = {
  items: any[];
  activeId: string;
  previewId: string | null;
  onSelect: (id: string) => void;
  onPreview: (id: string | null) => void;
  position?: RailPosition;
};
export type RailItemProps = {
  item: Workspace;
  viewport: ViewportAPI;
  active: boolean;
  onSelect: (id: string) => void;
  onPreview: (id: string | null) => void;
};
export type Action = { type: 'SET_ANCHOR'; anchor: RailAnchor } | { type: 'TOGGLE_OPEN' } | { type: 'CLOSE' };

export type RailTileSpec = {
  width: string;
  height: string;
  aspectRatio?: number;

  thumbnailScale: number;
};
export type RailState = {
  open: boolean;
  anchor: 'tl' | 'tr' | 'bl' | 'br';
  position: 'top' | 'bottom' | 'left' | 'right';
};
export type ThumbnailConfig = {
  scale: number;
  aspectRatio: number;
};

export type WorkspaceThemeProviderProps = {
  theme: keyof typeof themes;

  children: React.ReactNode;
};
