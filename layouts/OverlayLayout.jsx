'use client'
import { useRef } from 'react'

// import { ScrollSpyProvider } from '@/components/providers/ScrollSpyProvider'
import { useDock } from '../packages/docksystem/src'
import { DockOverlay } from '../packages/docksystem/src'

export default function OverlayLayout({ left, right, children, className }) {
  const scrollRef = useRef()
  const dock = useDock()

  const isSingleColumn = !left && !right

  return (
    <div className={`flex flex-col md:flex-row flex-1 min-h-0 w-full ${className}`}>
      {/* <ScrollSpyProvider scrollRef={scrollRef}> */}
      <div className="flex min-h-0 flex-1 w-full">
        {/* LEFT DOCK */}
        {!isSingleColumn && (
          <aside
            style={{
              width: dock.state.regions.left.open ? dock.state.regions.left.width : 0,
            }}
            className="w-64 shrink-0 overflow-hidden transition-all duration-200"
          >
            {left}{' '}
            {dock.state.regions.left.open && (
              <div
                onMouseDown={(e) => dock.startResize({ name: 'left', key: 'width' })}
                className="w-1 cursor-col-resize hover:bg-slate-300"
              />
            )}
          </aside>
        )}

        {/* MAIN */}
        <main
          ref={scrollRef}
          className={`no-scrollbar flex-1 min-w-0 min-h-0 overflow-y-auto ${
            isSingleColumn ? 'px-24' : ''
          }`}
        >
          <div className="max-w-3xl mx-auto px-6">{children}</div>
        </main>

        {/* RIGHT DOCK */}
        {!isSingleColumn && (
          <aside
            style={{
              width: dock.state.regions.right.open ? dock.state.regions.right.width : 0,
            }}
            className="overflow-hidden transition-all duration-200"
          >
            {dock.state.regions.right.open && (
              <div
                onMouseDown={(e) => dock.startResize({ name: 'right', key: 'width' })}
                className="w-1 cursor-col-resize hover:bg-slate-300"
              />
            )}
            {right}
          </aside>
        )}
        <DockOverlay
          side="left"
          open={dock.state.regions.leftOverlay.open}
          width={dock.state.regions.leftOverlay.width}
          onClose={() => dock.toggle('leftOverlay')}
        >
          {left}
        </DockOverlay>
        <DockOverlay
          side="right"
          open={dock.state.regions.rightOverlay.open}
          width={dock.state.regions.rightOverlay.width}
          onClose={() => dock.toggle('rightOverlay')}
        >
          {right}
        </DockOverlay>
      </div>
      {/* </ScrollSpyProvider> */}
    </div>
  )
}
