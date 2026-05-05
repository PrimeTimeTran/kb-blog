'use client'

import { run } from '@mdx-js/mdx'
import { useEffect, useState } from 'react'

import { MDXComponents } from '@/mdx'
import { compile } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { useRegistry } from '@/lib/providers/RegistryProvider'

export async function compileToComponent(source, options = {}) {
  const { registry = {}, remarkPlugins = [], rehypePlugins = [] } = options
  // 1. Compile MDX → JS function body
  const code = String(
    await compile(source, {
      outputFormat: 'function-body',
      remarkPlugins,
      rehypePlugins,
    })
  )

  // 2. Execute compiled MDX into a React component
  const { default: Content } = await run(code, {
    ...runtime,

    // IMPORTANT: this is what prevents "undefined CallOut" issues
    components: {
      ...MDXComponents,

      // optional: if Embed depends on registry
      Embed: (props) => {
        const key = props.id?.split('/').pop()
        const doc = registry?.[key]

        if (!doc?.mdxSource) {
          return <div className="text-xs opacity-50">Missing embed: {key}</div>
        }

        // recursive compile (server-side only!)
        // safe because THIS function runs only on server
        const Nested = compileToComponent

        const Comp = Nested(doc.mdxSource, {
          registry,
          remarkPlugins,
          rehypePlugins,
        })

        return Comp
      },
    },
  })

  return Content
}

export function Embed({ id }) {
  const registry = useRegistry()
  const key = id.split('/').pop()
  const doc = registry?.[key]

  const [Content, setContent] = useState(null)

  useEffect(() => {
    if (!doc?.mdxSource) return

    let cancelled = false

    compileToComponent(doc.mdxSource).then((C) => {
      if (!cancelled) setContent(() => C)
    })

    return () => {
      cancelled = true
    }
  }, [doc?.mdxSource])

  if (!doc?.mdxSource) return <div>hi embed</div>
  if (!Content) return <div>loading...</div>

  return (
    <div className="prose p-3 dark:prose-invert overflow-auto h-[400px] embed">
      <Content />
    </div>
  )
}

// WIP: Rendering Server side so styles are applied.
// export function Embed({ id }) {
//   const registry = useRegistry()

//   const key = id.split('/').pop()
//   const doc = registry?.[key]

//   if (!doc?.Content) {
//     return <div className="text-xs opacity-50">Missing embed: {key}</div>
//   }

//   const Content = doc.Content

//   return (
//     <div className="my-2 rounded-lg border bg-zinc-50 p-3 dark:bg-zinc-900">
//       <div className="prose dark:prose-invert">
//         <Content />
//       </div>
//     </div>
//   )
// }
