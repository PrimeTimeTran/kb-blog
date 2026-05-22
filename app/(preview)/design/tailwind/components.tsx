export function SectionTitle({ title }) {
  return (
    <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

export function Box({ label }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-200 text-sm font-medium dark:bg-zinc-800">
      {label}
    </div>
  );
}
