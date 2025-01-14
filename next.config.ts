import type { NextConfig } from 'next'
import createMDX, { NextMDXOptions } from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: {
      mdxType: 'gfm', // Configure what kind of mdx syntax will be used to parse & transform
    },
  },
}

const withMDX = createMDX({} satisfies NextMDXOptions)

export default withMDX(nextConfig)
