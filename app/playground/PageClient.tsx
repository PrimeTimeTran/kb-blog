import Exhibit from '@/pkg/exhibit/Exhibit';

import { createExhibitManifest } from '@/pkg/exhibit/src/create-manifest';

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);

  const manifest = createExhibitManifest(params.slug);

  return (
    <Exhibit
      manifest={{
        ...manifest,
        params: searchParams,
      }}
    />
  );
}
