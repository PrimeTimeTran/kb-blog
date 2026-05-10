import { useLayout } from '../providers/LayoutProvider'

export function useResize(side) {
  const { layout, setLayout } = useLayout()

  return (e) => {
    const startX = e.clientX
    const startWidth = layout[side]

    const isRight = side === 'right'

    const onMove = (ev) => {
      const delta = ev.clientX - startX

      const nextWidth = isRight
        ? startWidth - delta // 🔥 invert for right
        : startWidth + delta // normal for left

      setLayout((prev) => ({
        ...prev,
        [side]: Math.max(180, nextWidth),
      }))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
}
