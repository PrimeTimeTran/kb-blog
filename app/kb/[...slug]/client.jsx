'use client'

import { useEffect } from 'react'
import TableOfContents from '@/components/TableOfContents'
import { useDock } from '../../../packages/docksystem/src'

export default function TOC({ toc, children }) {
  const dock = useDock()
  useEffect(() => {
    dock.setSlot('right', <TableOfContents toc={toc} />)
    return () => {
      dock.clearSlot('right')
    }
  }, [toc])
  return <article>{children}</article>
}
