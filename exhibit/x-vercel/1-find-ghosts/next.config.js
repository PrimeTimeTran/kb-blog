import createMDX from '@next/mdx';
import { fileURLToPath } from 'url';
import path from 'path';
import why from 'why-is-node-running';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  setTimeout(() => {
    console.log('--- DEBUG: Inspecting active handles ---');
    why();
  }, 10000);
}

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Note:
// ./mdx-components.tsx strategy worked while this one didn't.
// https://nextjs.org/docs/pages/guides/mdx
const withMdx = createMDX({
  options: {},
  extension: /\.(md|mdx)$/,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});
export default withMdx(nextConfig);
