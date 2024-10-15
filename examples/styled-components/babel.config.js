module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["next/babel"],
    plugins: [
      "@babel/plugin-transform-runtime",
      ["css-variable/babel", { async: false }],
      ["babel-plugin-styled-components", { ssr: true }],
    ],
  };
};
