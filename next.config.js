const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const sharedConfig = require('./webpack.sharedConfig.js')

let config = {
  webpack: sharedConfig,
}

console.log('DEPLOY_ENV: ', process.env.NEXT_PUBLIC_DEPLOY_ENV)

if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer(config)
}

module.exports = config
