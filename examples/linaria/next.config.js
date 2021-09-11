const withLinaria = require('next-linaria');

module.exports = withLinaria({
  pageExtensions: ['page.jsx'],
  webpack(config, options) {
    return config;
  },
});