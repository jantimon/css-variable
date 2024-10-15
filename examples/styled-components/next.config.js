module.exports = {
  pageExtensions: ["page.tsx"],
  webpack: (config, { isServer }) => {
    config.resolve.extensionAlias = {
      ".js": [".js", ".mjs"],
    };
    return config;
  },
  transpilePackages: ["css-variable"],
};
