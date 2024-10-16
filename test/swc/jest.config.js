module.exports = {
  rootDir: __dirname,
  moduleNameMapper: {
    "css-variable$": "../../",
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          experimental: {
            plugins: [
              [
                require.resolve(
                  "../../swc/target/wasm32-wasi/release/swc_plugin_css_variable.wasm"
                ),
                {
                  basePath: __dirname,
                  displayName: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
