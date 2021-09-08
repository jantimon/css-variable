const withLinaria = require('next-linaria');

module.exports = withLinaria({
  webpack(config, options) {
    return config;
  },
});