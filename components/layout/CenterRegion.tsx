export function CenterRegion({ children }) {
  return (
    <div className="main flex-1 min-w-0 min-h-0 overflow-y-auto flex">
      <div className="w-full max-w-5xl px-3 mx-auto">{children}</div>
    </div>
  )
}
