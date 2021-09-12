const withLinaria = require('next-linaria');

module.exports = withLinaria({
  pageExtensions: ['page.tsx'],
  webpack(config, options) {
    return config;
  },
});