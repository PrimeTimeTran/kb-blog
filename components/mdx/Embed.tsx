'use client';

import { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import { run, compile } from '@mdx-js/mdx';

import * as MDXComponents from './createMDXComponents';
import { useRegistry } from '@/providers/RegistryProvider';

export async function compileToComponent(source, options = {}) {
  const { registry = {}, remarkPlugins = [], rehypePlugins = [] } = options;
  // 1. Compile MDX → JS function body
  const code = String(
    await compile(source, {
      outputFormat: 'function-body',
      remarkPlugins,
      rehypePlugins,
    }),
  );

  // 2. Execute compiled MDX into a React component
  const { default: Content } = await run(code, {
    ...runtime,

    // IMPORTANT: this is what prevents "undefined CallOut" issues
    components: {
      ...MDXComponents,

      // optional: if Embed depends on registry
      Embed: (props) => {
        const key = props.id?.split('/').pop();
        const doc = registry?.[key];

        if (!doc?.mdxSource) {
          return <div className="text-xs opacity-50">Missing embed: {key}</div>;
        }

        // recursive compile (server-side only!)
        // safe because THIS function runs only on server
        const Nested = compileToComponent;

        const Comp = Nested(doc.mdxSource, {
          registry,
          remarkPlugins,
          rehypePlugins,
        });

        return Comp;
      },
    },
  });

  return Content;
}

export function Embed({ id }) {
  const registry = useRegistry();
  const key = id.split('/').pop();
  const doc = registry?.[key];

  const [Content, setContent] = useState(null);

  useEffect(() => {
    if (!doc?.mdxSource) return;
    let cancelled = false;
    compileToComponent(doc.mdxSource).then((C) => {
      if (!cancelled) setContent(() => C);
    });

    return () => {
      cancelled = true;
    };
  }, [doc?.mdxSource]);

  if (!doc?.mdxSource) return <div>hi embed</div>;
  if (!Content) return <div>loading...</div>;

  return (
    <div className="prose p-3 dark:prose-invert overflow-auto h-[400px] embed">
      <Content />
    </div>
  );
}
