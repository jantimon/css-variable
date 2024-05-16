const withLinaria = require('next-with-linaria');

module.exports = withLinaria({
  pageExtensions: ['page.tsx'],
  webpack(config, options) {
    return config;
  },
})