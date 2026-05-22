'use client';

import { BootSelectPage } from './app/BootSelectPage';
import { EditorPage } from './app/EditorPage';
import { useBootOrchestrator } from './hooks/useBootOrchestrator';
import { frameworkConfigs } from './lib/frameworks/dependencies';

export function Orchestrator() {
  const boot = useBootOrchestrator();

  // 🔥 DEBUG: filesystem print (what you asked for)
  if (boot.files) {
    console.log('[VFS LOADED]');
    console.table(Object.keys(boot.files));
  }

  if (!boot.ready || !boot.framework) {
    return <BootSelectPage onSelect={boot.boot} loading={boot.loading} />;
  }

  const cfg = frameworkConfigs[boot.framework];

  console.log('[BOOT] runtime:', cfg.runtime);
  console.log('[BOOT] entry:', cfg.entry);
  console.log('[BOOT] required:', cfg.requiredModules);

  return <EditorPage />;

  return (
    <div className="flex h-screen w-screen bg-black text-white">
      {/* LEFT: filesystem debug */}
      <div className="w-1/3 border-r border-white/10 p-4 font-mono text-xs overflow-auto">
        <h2 className="mb-2 text-white/70">Filesystem</h2>

        {Object.entries(boot.files!).map(([path, content]) => (
          <div key={path} className="mb-3">
            <div className="text-green-400">{path}</div>
            <pre className="text-white/40 text-[10px]">{content.slice(0, 120)}...</pre>
          </div>
        ))}
      </div>

      {/* RIGHT: placeholder runtime */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white/50">Runtime will mount here</div>
      </div>
    </div>
  );
}
