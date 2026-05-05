import { useEffect, useState } from 'react'

export function useScrollShrink(ref, threshold = 40) {
  const [shrunk, setShrunk] = useState(false)

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const onScroll = () => {
      setShrunk(el.scrollTop > threshold)
    }

    onScroll()
    el.addEventListener('scroll', onScroll)

    return () => el.removeEventListener('scroll', onScroll)
  }, [ref, threshold])

  return shrunk
}
