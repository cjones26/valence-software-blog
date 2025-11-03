import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  turbopack: {},
  images: {
    qualities: [75, 90, 100],
  },
  // Enable compression
  compress: true,
  // Configure SWC minify options for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Target modern browsers to avoid unnecessary polyfills
  transpilePackages: [],
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ['react-icons', '@giscus/react', 'date-fns', 'fuse.js'],
    // Optimize CSS
    optimizeCss: true,
    // Inline critical CSS to reduce render blocking
    inlineCss: true,
  },
};

export default withContentlayer(nextConfig);
