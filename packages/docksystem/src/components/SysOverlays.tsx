// 'use client'
// import { createPortal } from 'react-dom'
// import { useDock } from '../context/DockProvider'
// import { SysOverlay } from './SysOverlay'

// import { type OverlayInstance } from '../system.types'

// export function SysOverlays() {
//   const { state, layer: layout } = useDock()

//   return createPortal
//     <>
//       {Object.values(state.layers).map((layer: OverlayInstance) => {
//         if (!layer.open) return null

//         return (
//           <SysOverlay
//             key={layer.id}
//             open={layer.open}
//             onClose={() => layout.toggle(layer.id)}
//             placement={layer.placement}
//             width={layer.size?.width ?? 400}
//             height={layer.size?.height ?? 320}
//           >
//             {layer.node}
//           </SysOverlay>
//         )
//       })}
//     </>,
//     document.body
//   )
// }

'use client'

import { useDock } from '../context/DockProvider'
import { SysOverlay } from './SysOverlay'

export function SysOverlays() {
  const { state } = useDock()

  return (
    <>
      {Object.values(state.layers).map((layer: any) => {
        if (!layer.open) return null

        return (
          <SysOverlay
            key={layer.id}
            placement={layer.placement}
            open={layer.open}
            width={layer.size?.width ?? 400}
            height={layer.size?.height ?? 320}
          >
            {layer.node}
          </SysOverlay>
        )
      })}
    </>
  )
}
