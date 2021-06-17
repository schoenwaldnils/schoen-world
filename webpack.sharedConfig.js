module.exports = (config = {}) => {
  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.test && rule.test.test('.svg'),
  )
  fileLoaderRule.exclude = /\.svg$/

  config.module.rules.push({
    test: /\.svg$/,
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
