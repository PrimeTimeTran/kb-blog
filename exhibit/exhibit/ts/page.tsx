export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <div>Hello Page</div>;
}
