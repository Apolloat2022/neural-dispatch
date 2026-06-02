/** @type {import('next').NextConfig} */
const nextConfig = {
  // Served under a subdirectory of the marketing domain via Vercel rewrites:
  // apollotechnologiesus.com/neural-dispatch. basePath + assetPrefix ensure all
  // routes, <Link> hrefs, and _next/static assets are prefixed so they route back
  // through the rewrite instead of 404ing against the marketing site root.
  basePath: '/neural-dispatch',
  assetPrefix: '/neural-dispatch',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
