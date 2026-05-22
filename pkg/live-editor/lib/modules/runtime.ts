import { createVM } from './vm';

export function createRuntime() {
  let vm: ReturnType<typeof createVM> | null = null;

  function init(files: Record<string, string>) {
    vm = createVM(files);
  }

  function run(entry: string) {
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

  return {
    init,
    run,
  };
}

function require(file: string) {
  if (cache[file]) return cache[file];

  const node = graph[file];
  if (!node) throw new Error(`missing: ${file}`);

  const module = { exports: {} };
  cache[file] = module.exports;

  const fn = new Function('require', 'exports', 'module', node.code);

  const localRequire = (dep: string) => require(resolve(file, dep));

  fn(localRequire, module.exports, module);

  return module.exports;
}
