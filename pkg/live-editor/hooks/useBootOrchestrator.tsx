import { useState } from 'react';
import { getSpec, SpecKey } from '../specs';

export function useBootOrchestrator() {
  const [specKey, setSpecKey] = useState<SpecKey | null>(null);
  const [files, setFiles] = useState<Record<string, string> | null>(null);
  const [entry, setEntry] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function boot(key: SpecKey) {
    console.log('[BOOT] loading spec:', key);

    setLoading(true);
    setSpecKey(key);

    try {
      await new Promise((r) => setTimeout(r, 300));

      const spec = getSpec(key);

      console.log('[BOOT] spec loaded:', spec.id);
      console.table(Object.keys(spec.files));

      setFiles(spec.files);
      setEntry(spec.entry);
      setFocus(spec.focus ?? spec.entry);

      await new Promise(requestAnimationFrame);

      console.log('[BOOT] ready');
    } catch (err) {
      console.error('[BOOT ERROR]', err);
    } finally {
      setLoading(false);
    }
  }

  const ready = !!files && !!entry && !loading;

  return {
    specKey,
    files,
    entry,
    focus,
    loading,
    ready,
    boot,
  };
}

function getSeed(fw: Framework) {
  switch (fw) {
    case 'react':
      return seedReact();
    case 'next':
      return seedNext();
    case 'react-native':
      return seedReactNative();
    case 'flutter':
      return seedFlutter();
    default:
      return seedNext();
  }
}

import { nextVfs } from '../generated/next-vfs';

export function loadFrameworkBase() {
  return nextVfs;
}

// const FRAMEWORK_BASE_DIR = path.join(process.cwd(), 'pkg/live-editor/lib/frameworks/base');
// export function loadFrameworkBase(fw: Framework): Record<string, string> {
//   const root = path.join(FRAMEWORK_BASE_DIR, fw);

//   const files: Record<string, string> = {};

//   function walk(dir: string) {
//     const entries = fs.readdirSync(dir, {
//       withFileTypes: true,
//     });

//     for (const entry of entries) {
//       const full = path.join(dir, entry.name);

//       // relative path INSIDE framework root
//       const relative = path.relative(root, full).replace(/\\/g, '/');

//       if (entry.isDirectory()) {
//         walk(full);
//         continue;
//       }

//       const content = fs.readFileSync(full, 'utf8');

//       // normalize to VFS-style path
//       files['/' + relative] = content;
//     }
//   }

//   if (!fs.existsSync(root)) {
//     throw new Error(`[FRAMEWORK LOAD] missing framework base dir: ${root}`);
//   }

//   walk(root);

//   console.log('[FRAMEWORK LOAD]', fw);
//   console.table(Object.keys(files));

//   return files;
// }
