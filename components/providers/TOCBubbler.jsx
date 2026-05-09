'use client'

import { useEffect } from 'react'
import { useScroll } from './ScrollSpyProvider'

export default function TOCBubbler({ toc }) {
  const { setToc } = useScroll()

  useEffect(() => {
    setToc(toc)
  }, [toc, setToc])

  return null
}
