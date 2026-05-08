export interface DockSystemLayout {
  state: any
  startResize: (args: { name: string; key: 'width' | 'height' }) => void
  toggle: (name: string) => void
  setOverlay: (active: string | null) => void
}

export type OverlayRegisterArgs = {
  id: string
  type: string
  open: boolean
  placement: string
  node: React.ReactNode
}

export interface SystemContextType extends DockSystemLayout {
  setSlot: (name: string, node: React.ReactNode) => void
  clearSlot: (name: string) => void
  getSlot: (name: string) => React.ReactNode | undefined
  layer: {
    register: (overlay: OverlayRegisterArgs) => React.ReactNode | undefined
    toggle: (id: string) => undefined
  }
}

export type OverlayInstance = {
  id: string
  type: 'singleton' | 'stack' | 'toast'
  placement: 'left' | 'right' | 'bottom' | 'center'
  open: boolean
  node: React.ReactNode
  behavior?: 'singleton' | 'stack' | 'ephemeral' | 'sequence'
  config?: {
    stepIndex?: number
    dismissable?: boolean
  }
}
