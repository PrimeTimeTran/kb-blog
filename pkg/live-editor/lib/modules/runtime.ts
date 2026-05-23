import { injectReact } from '../frameworks';
import { createVM } from './vm';

export function createRuntime(vmFactory = createVM) {
  let vm: ReturnType<typeof vmFactory> | null = null;

  function init(files: Record<string, string>) {
    vm = vmFactory(files);
  }

  function run(entry: string) {
    console.log('[RUNTIME ENTRY]', entry);

    if (!vm) {
      throw new Error('[RUNTIME] not initialized');
    }

    if (!entry) {
      throw new Error('[RUNTIME] missing entry');
    }

    const App = vm.execute(entry);

    if (!App) {
      throw new Error('[RUNTIME] execution returned undefined');
    }

    return App;
  }

  return { init, run };
}

export function createIframeRuntime(renderId, iframeRef) {
  const runtime = createRuntime();

  return (vfs, entry) => {
    renderId.current += 1;

    runtime.init(vfs);

    const App = runtime.run(entry);

    iframeRef.current!.srcdoc = injectReact(App, renderId.current);
  };
}

// function require(file: string) {
//   if (cache[file]) return cache[file];

//   const node = graph[file];
//   if (!node) throw new Error(`missing: ${file}`);

//   const module = { exports: {} };
//   cache[file] = module.exports;

//   const fn = new Function('require', 'exports', 'module', node.code);

//   const localRequire = (dep: string) => require(resolve(file, dep));

//   fn(localRequire, module.exports, module);

//   return module.exports;
// }
