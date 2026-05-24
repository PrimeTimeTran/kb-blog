import LiveReactSandbox from '@/pkg/live-editor';

import { getExhibitSlotsFS } from '@/lib/vfs-server';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. Await the slug and searchParams
  const { slug } = await params;
  const sp = await searchParams;

  // 2. Extract 'entry' or default to 'page.tsx'
  const entry = typeof sp.entry === 'string' ? sp.entry : 'page.tsx';

  const initialFiles = getExhibitSlotsFS(slug);

  return <LiveReactSandbox slug={slug} initialFiles={initialFiles} entryPoint={entry} />;
}
