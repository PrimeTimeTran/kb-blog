'use client'

import { useDock } from '../context/DockProvider'

export default function DockSlip({ name }) {
  const { getSlot } = useDock()
  return getSlot(name) ?? null
}
