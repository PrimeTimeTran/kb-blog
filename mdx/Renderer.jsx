import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

import { layouts } from '@/layouts'
import { log } from '@/lib/debug/logger'
import { RegistryContext } from '@/lib/hooks/useRegistry'

export default function MDXRenderer({
  mdxSource,
  components = {},
  layout: Layout,
  layoutProps,
  ...rest
}) {
  const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  log.bundle('Embed:', !!components.Embed)
  log.bundle('Embed IN MDX:', mdxSource.includes('Embed'))
  log.bundle('LOWERCASE:', mdxSource.includes('embed'))
  log.bundle('COMPONENTS KEYS:', Object.keys(components))

  const WrappedLayout = typeof Layout === 'string' ? layouts[Layout] : Layout
  const content = (
    <RegistryContext.Provider value={components.__registry}>
      <Component components={components} />
    </RegistryContext.Provider>
  )

  if (!WrappedLayout) return content

  return (
    <WrappedLayout {...layoutProps} {...rest}>
      {content}
    </WrappedLayout>
  )
}
