import { transform } from './esbuild-transform';
import { createVM } from './vm';

export function run(vfs: Record<string, string>, entry: string) {
  // 1. transform all files
  const transformed: Record<string, string> = {};

  for (const [file, code] of Object.entries(vfs)) {
    transformed[file] = transform(code);
  }

  // 2. create VM
  const vm = createVM(transformed);

  // 3. execute entry
  const mod = vm.require(entry);

  return mod.default ?? mod;
}
