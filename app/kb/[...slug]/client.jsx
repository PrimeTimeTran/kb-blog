'use client'

import { useEffect } from 'react'
import TableOfContents from '../../../components/TableOfContents'
import { useDock } from '@primetimetran/beeline'
import { usePathname } from 'next/navigation'


export default function TOC({ toc, children }) {
  const pathname = usePathname()
  console.log('TOC', toc.length)
  const dock = useDock()
  useEffect(() => {
    dock.setSlot('right', <TableOfContents toc={toc} />)
    return () => {
      dock.clearSlot('right')
    }
  }, [toc])
  return <article>{dock.activeRoute}{children}</article>
}
