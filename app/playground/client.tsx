import Exhibit from '@/pkg/exhibit/Exhibit';
import { SearchParams } from 'next/dist/server/request/search-params';

import { createExhibitManifest } from '@/pkg/exhibit';

export default async function Client(props: { params: Promise<{ slug: string[] }>; searchParams: SearchParams }) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);

  const manifest = createExhibitManifest(params.slug);

  return <Exhibit params={searchParams} manifest={manifest} />;
}
