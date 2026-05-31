import { useEffect, useState } from 'react';

import { CommandPalette } from './CmdPalette';
import { HelpPanel } from './HelpPanel';
import { Overlay } from './types';

export function useOverlayManager() {
  const [active, setActive] = useState<Overlay>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      // -----------------------------------
      // ESC → close ONLY overlays first
      // -----------------------------------
      if (e.key === 'Escape') {
        e.preventDefault();

        setActive((current) => {
          if (current !== null) return null;
          return null;
        });

        return;
      }

      // -----------------------------------
      // CMD + K → toggle command palette
      // -----------------------------------
      if (mod && key === 'k') {
        e.preventDefault();
        setActive((v) => (v === 'command' ? null : 'command'));
        return;
      }

      // -----------------------------------
      // CMD + / → toggle help
      // -----------------------------------
      if (mod && key === '/') {
        e.preventDefault();
        setActive((v) => (v === 'help' ? null : 'help'));
        return;
      }

      // -----------------------------------
      // ALT + SHIFT + K → dev shortcut
      // -----------------------------------
      if (e.altKey && e.shiftKey && key === 'k') {
        e.preventDefault();
        setActive('command');
        return;
      }

      // -----------------------------------
      // CMD + B → sidebar toggle
      // -----------------------------------
      if (mod && key === 'b') {
        e.preventDefault();
        setSidebarOpen((v) => !v);
        return;
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  useEffect(() => {
    const openHelp = () => setActive('help');
    const openCommand = () => setActive('command');
    const closeAll = () => setActive(null);
    const toggleSidebar = () => {
      setSidebarOpen((v) => !v);
    };

    window.addEventListener('overlay:help', openHelp);
    window.addEventListener('overlay:command', openCommand);
    window.addEventListener('overlay:close', closeAll);
    window.addEventListener('view:primary-sidebar', toggleSidebar);

    return () => {
      window.removeEventListener('overlay:help', openHelp);
      window.removeEventListener('overlay:command', openCommand);
      window.removeEventListener('overlay:close', closeAll);
      window.removeEventListener('view:primary-sidebar', toggleSidebar);
    };
  }, [sidebarOpen]);

  return {
    sidebarOpen,
    active,
    setActive,
  };
}
export function OverlayHost() {
  const { active, setActive } = useOverlayManager();

  return (
    <>
      {active === 'command' && <CommandPalette open onClose={() => setActive(null)} />}
      {active === 'help' && <HelpPanel open onClose={() => setActive(null)} />}
    </>
  );
}
