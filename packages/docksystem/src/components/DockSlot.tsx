'use client'

import { useEffect } from 'react'
import { useDock } from '../context/DockProvider'

export default function DockSlot({ name = 'right', children }) {
  const { setSlot, clearSlot } = useDock()

  useEffect(() => {
    setSlot(name, children)

    return () => clearSlot(name)
  }, [name, children])

  return null
}
