import LiveReactSandbox from '@/pkg/live-editor';

import { getExhibitSlotsFS } from '@/lib/vfs-server';

export default function Page() {
  const initialFiles = getExhibitSlotsFS();
  return <LiveReactSandbox initialFiles={initialFiles} />;
}
