import clsx from 'clsx'

import { RailProps, LocalRibbonItem, LocalRibbonProps, WorkspaceRibbonProps } from './types'
import { RibbonItem } from './Rail'

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
    <div className="h-full w-full">
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
export function MotionPreview() {
  return <div className="h-full w-full bg-gradient-to-br from-purple-500 to-black" />
}
export function WorkspaceRibbon({
  items,
  activeId,
  onSelect,
  orientation = 'horizontal',
}: WorkspaceRibbonProps & {
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <div
      className={clsx(
        'border border-black/10 dark:border-white/10 bg-background/80 backdrop-blur-md',
        orientation === 'horizontal' ? 'mx-2 my-2 rounded-2xl' : 'h-full w-64 rounded-2xl mx-2 my-2'
      )}
    >
      <div
        className={clsx(
          'p-3',
          orientation === 'horizontal'
            ? 'flex gap-3 overflow-x-auto'
            : 'flex flex-col gap-2 overflow-y-auto h-full'
        )}
      >
        {items.map((item) => {
          const active = item.id === activeId

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={clsx(
                'rounded-xl transition-all text-left',
                orientation === 'horizontal' ? 'shrink-0 px-4 py-2' : 'w-full px-4 py-3',

                active
                  ? 'bg-primary text-white'
                  : 'bg-surface-container hover:bg-[var(--surface-container-high)]'
              )}
            >
              <div className="text-sm font-medium">{item.title}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
export function LocalRibbon({ items, activeId, onSelect }: LocalRibbonProps) {
  return (
    <div className="border-t border-black/10 dark:border-white/10">
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2 p-2">
          {items.map((item) => {
            const active = item.id === activeId

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={clsx(
                  'rounded-lg px-3 py-2 text-sm transition-all',
                  active ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface-container)]'
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export function VerticalRibbon({
  items,
  activeId,
  onSelect,
}: {
  items: LocalRibbonItem[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="w-52 border-l border-r border-black/10 dark:border-white/10">
      <div className="flex h-full flex-col gap-2 overflow-y-auto p-3">
        {items.map((item) => {
          const active = item.id === activeId

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={clsx(
                'rounded-xl px-4 py-3 text-left text-sm transition-all',
                active ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface-container)]'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export function ScrollableWorkspaceContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">{children}</div>
    </div>
  )
}
export function WorkspaceHero({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl bg-surface p-8">
      <h1 className="text-4xl font-black tracking-tight">{title}</h1>

      <p className="mt-3 max-w-2xl text-base opacity-70">{description}</p>
    </div>
  )
}
export function LargeScrollableSection() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 24 }).map((_, index) => {
        return (
          <div key={index} className="rounded-2xl bg-surface-container p-6">
            <div className="text-lg font-semibold">Demo Block {index + 1}</div>

            <p className="mt-2 opacity-70">Independent scrollable workspace content.</p>
          </div>
        )
      })}
    </div>
  )
}
