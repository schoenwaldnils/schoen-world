import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['next-mdx-remote-client'],
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
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
}

export default nextConfig
