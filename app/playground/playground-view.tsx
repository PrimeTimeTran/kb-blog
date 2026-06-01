import Exhibit from '@/pkg/exhibit/Exhibit';
import { SearchParams } from 'next/dist/server/request/search-params';
import { createExhibitManifest } from '@/pkg/exhibit';

type PageProps = { params: Promise<{ slug: string[] }>; searchParams: SearchParams };

export async function PlaygroundView(props: PageProps) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);

  const manifest = createExhibitManifest(params.slug);

  return <Exhibit params={searchParams} manifest={manifest} />;
}
