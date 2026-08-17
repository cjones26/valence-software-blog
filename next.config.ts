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
  async redirects() {
    return [
      {
        source: '/page/:pageNum',
        destination: '/blog/page/:pageNum',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default withContentlayer(nextConfig);
