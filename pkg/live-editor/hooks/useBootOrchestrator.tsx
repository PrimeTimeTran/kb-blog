import { useState } from 'react';
import { getSpec, SpecKey } from '../specs';
import { normalizeSnapshot } from '../lib/core/normalize-snapshot';

export function useBootOrchestrator() {
  const [loading, setLoading] = useState(false);
  const [framework, setFramework] = useState<any>(null);

  const [snapshot, setSnapshot] = useState<null | {
    files: Record<string, string>;
    entry: string;
  }>(null);

  async function boot(key: SpecKey) {
    setLoading(true);

    try {
      // ---------------- SPEC ----------------
      const spec = getSpec(key);

      console.log('[BOOT] spec:', {
        id: spec.id,
        framework: spec.framework,
        entry: spec.entry,
      });

      // ---------------- BASE FS ----------------
      const base = loadFrameworkBase(spec.framework);

      console.log('[BOOT] base size:', Object.keys(base).length);

      // ---------------- MERGE (CORE FIX) ----------------
      const vfs: Record<string, string> = {
        ...base,
        ...spec.files, // spec overrides base
      };

      console.log('[BOOT] merged VFS size:', Object.keys(vfs).length);

      // ---------------- ENTRY RESOLUTION ----------------
      const entry = spec.entry ?? Object.keys(vfs).find((f) => f.includes('page.tsx')) ?? Object.keys(vfs)[0];

      if (!entry || !vfs[entry]) {
        throw new Error(`[BOOT] invalid entry: ${entry}`);
      }

      console.log('[BOOT] resolved entry:', entry);

      // ---------------- COMMIT ----------------
      setFramework(spec.framework);
      const raw = {
        files: vfs,
        entry: spec.entry,
      };

      const snapshot = normalizeSnapshot(raw);

      setSnapshot(snapshot);

      console.log('[BOOT] snapshot committed');
    } catch (err) {
      console.error('[BOOT ERROR]', err);
      setSnapshot(null);
      setFramework(null);
    } finally {
      setLoading(false);
    }
  }

  const ready = !!snapshot && !loading;

  return {
    boot,
    loading,
    ready,
    snapshot,
    framework,
  };
}

// function getSeed(fw: Framework) {
//   switch (fw) {
//     case 'react':
//       return seedReact();
//     case 'next':
//       return seedNext();
//     case 'react-native':
//       return seedReactNative();
//     case 'flutter':
//       return seedFlutter();
//     default:
//       return seedNext();
//   }
// }

function runtime(files: Record<string, string>, entry: string) {
  throw new Error('Function not implemented.');
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
