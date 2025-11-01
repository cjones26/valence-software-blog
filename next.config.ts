import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  turbopack: {},
  images: {
    qualities: [75, 90],
  },
};

export default withContentlayer(nextConfig);
