export default function Page() {
  const items = Array.from({ length: 50 }, (_, i) => i + 1)
  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="p-4 space-y-2">
        {items.map((n) => (
          <div
            key={n}
            className={`h-16 flex items-center px-4 rounded ${
              n % 2 === 0 ? 'bg-zinc-200' : 'bg-zinc-400'
            }`}
          >
            Item {n}
          </div>
        ))}
      </div>
    </div>
  )
}
