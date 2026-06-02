/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pulled into the main app (apollotechnologiesus.com) as a Vercel Multi Zone
  // mounted at /neural-dispatch. basePath + assetPrefix ensure all routes,
  // <Link> hrefs, and _next/static assets are prefixed so they resolve under the
  // subfolder instead of 404ing against the main app's root.
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
