import clsx from 'clsx'
import { VscPreview } from 'react-icons/vsc'
import { GrRadialSelected } from 'react-icons/gr'

import { RailProps } from './types'

export function ViewportRail({
  items,
  activeId,
  previewId,
  onSelect,
  onPreview,
  viewConfig,
}: RailProps): import('react').JSX.Element {
  const isVertical = viewConfig?.railPosition === 'left' || viewConfig?.railPosition === 'right'
  return (
    <div
      className="h-full w-full z-10"
      onClick={() => {
        console.log('ViewportRail')
      }}
    >
      <div className={clsx('h-full w-full flex gap-4 p-2', isVertical ? 'flex-col' : 'flex-row')}>
        {items.map((item) => (
          <RibbonItem
            key={item.id}
            item={item}
            active={item.id === viewConfig.activeId}
            activeId={activeId}
            id={item}
            onSelect={onSelect}
            isVertical={isVertical}
            onPreview={onPreview}
          />
        ))}
      </div>
    </div>
  )
}

export function RibbonItem({
  item,
  active,
  previewId,
  onSelect,
  onPreview,
  isVertical,
}: {
  item: any
  viewConfig: any
  active: boolean
  previewId: string | null
  onSelect: (id: string) => void
  onPreview: (id: string | null) => void
  isVertical: boolean
}) {
  const Preview = item.preview
  const isPreview = item.id === previewId

  const isIdle = !active && !isPreview
  return (
    <button
      onClick={() => {
        onSelect(item.id)
      }}
      onMouseLeave={() => onPreview(null)}
      onMouseEnter={() => {
        onPreview(item.id)
      }}
      className={clsx(
        `group relative overflow-hidden p-4 bg-red-400 transition-all duration-300 ease-out ${isVertical ? 'h-32 w-full' : 'w-64 h-full'}`,
        !active ? 'border border-primary' : 'scale-[1.05]'
      )}
    >
      <div className="absolute inset-0 z-0">
        {Preview ? (
          <Preview />
        ) : (
          <div className="flex justify-center align-middle items-center">No preview</div>
        )}
      </div>
      {/* 2. DARK OVERLAY */}
      {!active && (
        <div
          className={clsx(
            'absolute inset-0 z-10 bg-black/70 transition-opacity duration-300',
            'group-hover:opacity-0'
          )}
        />
      )}
      {isPreview && !active && (
        <div className="absolute inset-0 z-30 flex items-center justify-center text-2xl opacity-100 transition-opacity duration-200">
          👁
        </div>
      )}
      {/* 3. FOREGROUND CONTENT (TEXT + ICONS) */}
      <div className="absolute inset-0 z-20 text-white">
        {active && <GrRadialSelected className="absolute top-2 right-2 z-30 text-white/95" />}

        {/* EYE */}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl z-30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <VscPreview className={`text-white/50`} size={64} />
          </div>
        )}

        {/* MOVING LABEL */}
        <div
          className={clsx(
            'absolute left-0 right-0 px-2 text-center text-white',
            'transition-all duration-300 ease-out',

            // always anchored at bottom (no layout switching)
            'bottom-2',

            // animation state
            isIdle
              ? 'translate-y-[-50%] top-1/2 text-2xl font-bold'
              : 'translate-y-0 text-xs font-medium',

            active && 'bg-white/10 rounded-md py-1 backdrop-blur-sm'
          )}
        >
          {item.title}
        </div>
      </div>
    </button>
  )
}
