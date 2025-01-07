import type { NextConfig } from 'next'
import createMDX, { NextMDXOptions } from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm', { strict: true, throwOnError: true }]],
  },
} satisfies NextMDXOptions)

export default withMDX(nextConfig)
