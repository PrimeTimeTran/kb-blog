'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useDock } from '../context/DockProvider'
import { JSX, ReactNode } from 'react'
import { SysSlot } from './SysSlot'

interface DockProps {
  name: 'left' | 'right' | 'leftOverlay' | 'rightOverlay' | string
  children: ReactNode
}

export function Dock({ name, children }: DockProps): JSX.Element {
  const dock = useDock()
  const pathname = usePathname()

  useEffect(() => {
    dock.setSlot(name, children)

    return () => {
      dock.clearSlot(name)
    }
  }, [pathname, name])

  return (
    <SysSlot pathname={pathname} name={name}>
      {children}
    </SysSlot>
  )
}
