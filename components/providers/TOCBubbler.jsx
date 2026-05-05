'use client'

import { useEffect } from 'react'
import { useScroll } from '@/components/providers/ScrollSpyProvider'

export default function TOCBubbler({ toc }) {
  const { setToc } = useScroll()

  useEffect(() => {
    setToc(toc)
  }, [toc, setToc])

  return null
}
