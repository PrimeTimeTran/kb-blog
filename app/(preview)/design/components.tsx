import clsx from 'clsx'

import {
  LocalRibbonItem,
  LocalRibbonProps,
  WorkspaceDefinition,
  WorkspaceRibbonProps,
} from './types'

export function RibbonItem({
  item,
  active,
  onSelect,
  onPreview,
}: {
  item: any
  active: boolean
  onSelect: (id: string) => void
  onPreview: (id: string | null) => void
}) {
  const Preview = item.preview

  return (
    <button
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => onPreview(item.id)}
      onMouseLeave={() => onPreview(null)}
      className={clsx(
        'group relative overflow-hidden rounded-xl border transition-all',
        active ? 'border-[var(--primary)]' : 'border-black/10 dark:border-white/10'
      )}
    >
      <div className="h-24 w-40 overflow-hidden bg-[var(--surface-container)]">
        {Preview ? (
          <div className="h-full w-full scale-[0.3] origin-top-left pointer-events-none">
            <Preview />
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs opacity-50">
            No preview
          </div>
        )}
      </div>

      <div className="px-2 py-1 text-left text-xs">{item.title}</div>
    </button>
  )
}
export function MotionPreview() {
  return <div className="h-full w-full bg-gradient-to-br from-purple-500 to-black" />
}
export function ViewportRail({
  items,
  activeId,
  onSelect,
  previewId,
  onPreview,
}: {
  items: any[]
  activeId: string
  onSelect: (id: string) => void
  previewId: string | null
  onPreview: (id: string | null) => void
}) {
  return (
    <div className="overflow-x-auto border-y border-black/10 dark:border-white/10 bg-red-500">
      <div className="flex min-w-max gap-2 p-3">
        {items.map((item) => {
          const active = item.id === activeId
          const preview = item.id === previewId

          return (
            <RibbonItem
              key={item.id}
              item={item}
              active={active}
              onSelect={onSelect}
              onPreview={onPreview}
            />
          )
        })}
      </div>
    </div>
  )
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
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--surface-container)] hover:bg-[var(--surface-container-high)]'
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
    <div className="rounded-3xl bg-[var(--surface)] p-8">
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
          <div key={index} className="rounded-2xl bg-[var(--surface-container)] p-6">
            <div className="text-lg font-semibold">Demo Block {index + 1}</div>

            <p className="mt-2 opacity-70">Independent scrollable workspace content.</p>
          </div>
        )
      })}
    </div>
  )
}
