'use client'

import { useEffect } from 'react'
import { useSys } from '@primetimetran/beeline'

export function RouteSync({ slug, toc }: { slug: string; toc: any }) {
  const sys = useSys(() => {})
  useEffect(() => {
    sys.onPageEvent({
      type: 'PATH_CHANGE',
      state: { slug, toc },
    })
  }, [slug, toc])

  return null
}
