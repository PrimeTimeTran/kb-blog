import LiveReactSandbox from '@/pkg/live-editor';

import { getExhibitSlotsFS } from '@/lib/vfs-server';

export default function Page() {
  const slug = ['hello-world'];
  const entry = 'todo/tsx';
  const initialFiles = getExhibitSlotsFS(slug);
  return <LiveReactSandbox slug={slug} initialFiles={initialFiles} entryPoint={entry} />;
}
