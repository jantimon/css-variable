const withLinaria = require('next-with-linaria');

module.exports = withLinaria({
  linaria: {
    babelOptions: {
      "presets": [
          "next/babel",
          '@wyw-in-js'
      ],
      "plugins": [
          "css-variable/babel"
      ]
  }
  },
  pageExtensions: ['page.tsx'],
  webpack(config, options) {
    return config;
  },
})