import clsx from 'clsx'
import { useState } from 'react'
import { VscPreview } from 'react-icons/vsc'
import { GrRadialSelected } from 'react-icons/gr'

import { RailItemProps, ViewportRailProps } from './types'
import { workspaceRegistry } from './WorkspaceList'

export function ViewportRail({ items, viewport }: ViewportRailProps): import('react').JSX.Element {
  const isVertical = viewport?.railPosition === 'left' || viewport?.railPosition === 'right'
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
  previewId,
  onPreview,
  isVertical,
}: RailItemProps) {
  // Keep for onMouseLeave. Just in case it begins being janky try this.
  // let rafId: number | null = null
  const [isHovering, setIsHovering] = useState(false)
  const isPreview = item.id === previewId
  const isFocused = isHovering || active
  const Thumbnail = workspaceRegistry[item.id].component
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        // DONT try to use viewport here.
        onSelect(item.id)
      }}
      onMouseEnter={() => {
        // Must destructuve and pass it
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
        'group relative overflow-hidden p-4 transition-all duration-300 ease-out rounded',
        isVertical ? 'h-32 w-full' : 'w-64 h-full',

        isHovering || active ? 'scale-[1.08] z-20 shadow-xl' : 'scale-100'
      )}
    >
      <div className="absolute inset-0 z-0 bg-surface">
        {Thumbnail ? (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="origin-top-left pointer-events-none"
              style={{
                transform: 'scale(0.15)',
                width: '666.666%',
                height: '666.666%',
              }}
            >
              <Thumbnail workspaceId={item.id} />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
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
      {isPreview && !active && (
        <div className="absolute inset-0 z-30 flex items-center justify-center text-2xl opacity-100 transition-opacity duration-200">
          👁
        </div>
      )}
      {/* 3. FOREGROUND CONTENT (TEXT + ICONS) */}
      <div className="absolute inset-0 z-20 text-on-surface">
        {active && <GrRadialSelected className="absolute top-2 right-2 z-30 text-on-surface/95" />}

        {/* EYE */}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl z-30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <VscPreview className={`text-on-surface/50`} size={64} />
          </div>
        )}
        <div className="absolute bottom-3 left-3 text-white font-semibold">{item.title}</div>
      </div>
    </div>
  )
}
