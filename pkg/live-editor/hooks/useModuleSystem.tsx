import { useMemo } from 'react';
import { resolveImports } from '../lib/modules/resolver';
import { compile } from '../lib/modules/compiler';

export function useModuleSystem(files: Record<string, string>, entry: string) {
  const graph = useMemo(() => {
    return resolveImports(entry, files);
  }, [files, entry]);

  const compiled = useMemo(() => {
    // flatten graph into executable bundle
    return compileBundle(graph);
  }, [graph]);

  return {
    graph,
    compiled,
  };
}

function compileBundle(graph: any) {
  return `
    console.log('running entry module')

    ${graph.code}
  `;
}
