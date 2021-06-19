const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const sharedConfig = require('./webpack.sharedConfig.js')

let config = {
  webpack: sharedConfig,
  images: {
    domains: ['ctfassets.net', 'images.ctfassets.net'],
  },
}

console.log('DEPLOY_ENV: ', process.env.NEXT_PUBLIC_DEPLOY_ENV)

if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer(config)
}

module.exports = config
