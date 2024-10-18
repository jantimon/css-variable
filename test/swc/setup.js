const path = require("path");
require("@swc-node/register")({
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  esModuleInterop: true,
  jsx: true,
  target: "es2018",
  swc: {
    jsc: {
      experimental: {
        plugins: [
          [
            path.resolve(
              __dirname,
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
});
