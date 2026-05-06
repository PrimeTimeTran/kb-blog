import DockSlot from './DockSlot'

export default function Dock({ name, children }) {
  return <DockSlot name={name}>{children}</DockSlot>
}
