import clsx from 'clsx'
import { useState } from 'react'
import { VscPreview } from 'react-icons/vsc'
import { GrRadialSelected } from 'react-icons/gr'

import { RailItemProps, RailTileSpec, ThumbnailConfig, ViewportRailProps } from './types'
import { workspaceRegistry } from './data'

export function ViewportRail({ items, viewport }: ViewportRailProps): import('react').JSX.Element {
  const isVertical = viewport.isVertical
  return (
    <div className="h-full w-full">
      <div className={clsx('h-full w-full flex gap-4 p-2', isVertical ? 'flex-col' : 'flex-row')}>
        {items.map((item) => (
          <RailItem
            key={item.id}
            item={item}
            viewport={viewport}
            isVertical={isVertical}
            onSelect={viewport.select}
            onPreview={viewport.preview}
            active={item.id === viewport.activeId}
          />
        ))}
      </div>
    </div>
  )
}
export function RailItem({
  item,
  active,
  viewport,
  onSelect,
  onPreview,
  isVertical,
}: RailItemProps) {
  // Keep for onMouseLeave. Just in case it begins being janky try this.
  // let rafId: number | null = null
  const [isHovering, setIsHovering] = useState(false)
  // const isPreview = item.id === previewId
  const Thumbnail = workspaceRegistry[item.id].component

  const spec = isVertical ? RAIL_TILE_PRESETS.vertical : RAIL_TILE_PRESETS.horizontal
  const thumbStyle = getThumbnailTransform(spec.thumbnailScale)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        // DONT try to use viewport here.
        onSelect(item.id)
      }}
      onMouseEnter={() => {
        // Must destructive and pass it
        setIsHovering(true)
        onPreview(item.id)
      }}
      onMouseLeave={() => {
        // Here too
        setIsHovering(false)
        onPreview(null)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(item.id)
        }
      }}
      className={clsx(
        'group relative overflow-hidden p-4 transition-all duration-300 ease-out rounded border',
        isVertical ? 'h-32 w-full' : 'w-64 h-full',
        isHovering || active ? 'scale-[1.08] z-20 shadow-xl border' : 'scale-100',
        active ? 'outline' : ''
      )}
    >
      <div className="absolute inset-0 z-0 bg-surface">
        {Thumbnail ? (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="origin-top-left pointer-events-none" style={thumbStyle}>
              <Thumbnail workspaceId={item.id} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">No preview</div>
        )}
      </div>
      {/* 2. DARK OVERLAY */}
      <div
        className={clsx(
          'absolute inset-0 z-10 transition-opacity duration-300',
          isHovering || active ? 'opacity-0' : 'opacity-60 bg-black'
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
  )
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
} satisfies Record<string, RailTileSpec>
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
}
function getThumbnailTransform(scale: number) {
  const inverse = 1 / scale

  return {
    transform: `scale(${scale})`,
    width: `${inverse * 100}%`,
    height: `${inverse * 100}%`,
  }
}
