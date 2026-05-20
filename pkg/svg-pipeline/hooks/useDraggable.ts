import { useRef, useState } from 'react'

export function useDraggable(initial = { x: 20, y: 20 }) {
  const [pos, setPos] = useState(initial)
  const dragRef = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!dragRef.current) return

    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    })
  }

  const onMouseUp = () => {
    dragRef.current = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  return {
    pos,
    bind: {
      onMouseDown,
      style: {
        cursor: 'grab',
        userSelect: 'none',
      },
    },
  }
}
