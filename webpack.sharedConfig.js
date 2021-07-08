module.exports = (config = {}) => {
  config.module.rules.push({
    test: /\.svg$/,
    issuer: /\.(ts)x?$/,
    use: [
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
  })

  return config
}
