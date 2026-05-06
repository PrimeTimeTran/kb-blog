export default function DockOverlay({ side, open, width, onClose, onResize, children }) {
  const isLeft = side === 'left'

  return (
    <>
      {/* BACKDROP */}
      <div
        className={[
          'fixed inset-0 bg-black/30 z-40 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
      />

      {/* PANEL */}
      <aside
        className={[
          'fixed inset-y-0 z-50 flex bg-green-700 transition-transform duration-200',
          isLeft ? 'left-0 border-r' : 'right-0 border-l',
          open ? 'translate-x-0' : isLeft ? '-translate-x-full' : 'translate-x-full',
        ].join(' ')}
        style={{ width }}
      >
        {/* RESIZE HANDLE */}
        <div onMouseDown={onResize} className="w-1 cursor-col-resize hover:bg-slate-400" />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  )
}
