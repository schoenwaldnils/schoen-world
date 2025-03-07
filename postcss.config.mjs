/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./src/app/viewports.css'],
    },
    'postcss-custom-media': {},
  },
}

export default config
