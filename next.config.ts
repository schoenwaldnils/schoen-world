import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['next-mdx-remote-client'],
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              // icon: true,
              memo: true,
              svgoConfig: {
                plugins: [
                  {
                    // cleanupIDs: false,
                    addAttributesToSVGElement: {
                      attributes: ['preserveAspectRatio="xMinYMid meet"'],
                    },
                  },
                ],
              },
            },
          },
          'url-loader',
        ],
        as: '*.js',
      },
    },
  },
  redirects: () => [
    {
      source: '/blog',
      destination: '/til',
      permanent: true,
    },
    {
      source: '/blog/:path*',
      destination: '/n/:path*',
      permanent: true,
    },
  ],
}

export default nextConfig
