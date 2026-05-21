export function WorkspaceHero({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl bg-surface p-8 text-on-surface shadow-sm border border-black/5 dark:border-white/10">
      <h1 className="text-4xl tracking-tight font-semibold">{title}</h1>

      <p className="mt-3 max-w-2xl text-on-surface opacity-70">{description}</p>
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

export function LargeScrollableSection() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 24 }).map((_, index) => {
        return (
          <div
            key={index}
            className="rounded-2xl bg-surface-container p-6 text-on-surface border border-black/5 dark:border-white/10"
          >
            <div className="text-lg font-semibold">Demo Block {index + 1}</div>

            <p className="mt-2 opacity-70">Independent scrollable workspace content.</p>
          </div>
        )
      })}
    </div>
  )
}
