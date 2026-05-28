import { useEffect, useState } from 'react';

import { CommandPalette } from './CmdPalette';
import { HelpPanel } from './HelpPanel';

type Overlay = 'command' | 'help' | null;

export function useOverlayManager() {
  const [active, setActive] = useState<Overlay>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      // COMMAND PALETTE
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActive((v) => (v === 'command' ? null : 'command'));
      }

      // HELP PANEL
      if (e.key === '/' && mod) {
        e.preventDefault();
        setActive((v) => (v === 'help' ? null : 'help'));
      }

      // DEV TRIGGER
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActive('command');
      }

      // ESC closes top layer
      if (e.key === 'Escape') {
        setActive(null);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  useEffect(() => {
    const openHelp = () => {
      console.log('hi');
      setActive('help');
    };

    window.addEventListener('overlay:help', openHelp);

    return () => {
      window.removeEventListener('overlay:help', openHelp);
    };
  }, []);
  return { active, setActive };
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
