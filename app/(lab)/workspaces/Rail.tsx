import clsx from 'clsx';
import { useState } from 'react';
import { VscPreview } from 'react-icons/vsc';
import { GrRadialSelected } from 'react-icons/gr';

import { RailState, RailItemProps, RailTileSpec, RailOrientation, ThumbnailConfig, ViewportRailProps } from './types';
import { workspaceRegistry } from './data';
import { WorkspaceThemeProvider } from './theme';

const CONTROL_LAYOUTS = {
  'tl-horizontal': 'flex flex-row justify-start items-start',
  'tl-vertical': 'flex flex-col justify-start items-start',

  'tr-horizontal': 'flex flex-row justify-end items-start',
  'tr-vertical': 'flex flex-col justify-start items-end',

  'bl-horizontal': 'flex flex-row justify-start items-end',
  'bl-vertical': 'flex flex-col justify-end items-start',

  'br-horizontal': 'flex flex-row justify-end items-end',
  'br-vertical': 'flex flex-col justify-end items-end',
} as const;

export function ViewportRail({ items, viewport }: ViewportRailProps): import('react').JSX.Element {
  const {
    orientation,
    rail: { anchor },
  } = viewport;

  function getControlStyle(anchor: RailState['anchor'], orientation: RailOrientation) {
    return CONTROL_LAYOUTS[`${anchor}-${orientation}`];
  }
  return (
    <div className={clsx('h-full w-full flex gap-4 p-3', getControlStyle(anchor, orientation))}>
      {items.map((item) => (
        <RailItem
          key={item.id}
          item={item}
          viewport={viewport}
          onSelect={viewport.select}
          onPreview={viewport.preview}
          active={item.id === viewport.activeId}
        />
      ))}
    </div>
  );
}
export function RailItem({ item, active, viewport, onSelect, onPreview }: RailItemProps) {
  // Keep for onMouseLeave. Just in case it begins being janky try this.
  // let rafId: number | null = null
  const [isHovering, setIsHovering] = useState(false);
  // const isPreview = item.id === previewId
  const Thumbnail = workspaceRegistry[item.id].component;

  // const spec = isVertical ? RAIL_TILE_PRESETS.vertical : RAIL_TILE_PRESETS.horizontal
  // const thumbStyle = getThumbnailTransform(spec.thumbnailScale)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        // DONT try to use viewport here.
        onSelect(item.id);
      }}
      onMouseEnter={() => {
        // Must destructive and pass it
        setIsHovering(true);
        onPreview(item.id);
      }}
      onMouseLeave={() => {
        // Here too
        setIsHovering(false);
        onPreview(null);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(item.id);
        }
      }}
      className={clsx(
        'group relative overflow-hidden transition-all duration-300 ease-out rounded w-48 h-28',
        isHovering || active ? 'scale-[1.08] z-20 shadow-xl' : 'scale-100',
        active ? 'border' : '',
      )}
    >
      <div className="absolute inset-0 z-0 bg-surface">
        {Thumbnail ? (
          <WorkspaceThemeProvider theme={item.theme}>
            <div className="h-full w-full overflow-hidden">
              <div
                style={{
                  transform: 'scale(0.15)',
                  transformOrigin: 'top left',
                  width: '666.666%',
                  height: '666.666%',
                }}
              >
                <Thumbnail workspaceId={item.id} />
              </div>
            </div>
          </WorkspaceThemeProvider>
        ) : (
          <div className="flex items-center justify-center">No preview</div>
        )}
      </div>
      {/* 2. DARK OVERLAY */}
      <div
        className={clsx(
          'absolute inset-0 z-10 transition-opacity duration-300',
          isHovering || active ? 'opacity-0' : 'opacity-70 bg-black',
        )}
      />
      {/* 3. FOREGROUND CONTENT (TEXT + ICONS) */}
      <div className="absolute inset-0 z-20 text-on-surface">
        {active && <GrRadialSelected className="absolute top-2 right-2 z-30 text-on-surface/95" />}

        {/* EYE */}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <VscPreview className={`text-sm text-on-surface/50`} size={64} />
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <div
            className="inline-flex items-center px-2 py-1 rounded-md text-sm font-semibold text-white
                  bg-black/40 backdrop-blur-md shadow-sm"
          >
            {item.title}
          </div>
        </div>
      </div>
    </div>
  );
}
export const RAIL_TILE_PRESETS = {
  vertical: {
    width: '100%',
    height: '8rem',
    thumbnailScale: 0.15,
    aspectRatio: 16 / 9,
  },

  horizontal: {
    width: '16rem',
    height: '100%',
    thumbnailScale: 0.15,
    aspectRatio: 9 / 16,
  },

  compact: {
    width: '100%',
    height: '5rem',
    thumbnailScale: 0.12,
    aspectRatio: 1,
  },
} satisfies Record<string, RailTileSpec>;
export const THUMBNAIL_PRESETS: Record<string, ThumbnailConfig> = {
  rail: {
    scale: 0.15,
    aspectRatio: 1, // square-ish rail tiles
  },
  wide: {
    scale: 0.12,
    aspectRatio: 16 / 9,
  },
  tall: {
    scale: 0.18,
    aspectRatio: 9 / 16,
  },
};
function getThumbnailTransform(scale: number) {
  const inverse = 1 / scale;

  return {
    transform: `scale(${scale})`,
    width: `${inverse * 100}%`,
    height: `${inverse * 100}%`,
  };
}
