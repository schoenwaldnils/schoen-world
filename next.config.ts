import type { NextConfig } from 'next'
import createMDX, { NextMDXOptions } from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
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
  experimental: {
    mdxRs: {
      mdxType: 'gfm', // Configure what kind of mdx syntax will be used to parse & transform
    },
  },
}

const withMDX = createMDX({} satisfies NextMDXOptions)

export default withMDX(nextConfig)
