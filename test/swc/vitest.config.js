import { defineConfig } from "vitest/config";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { transformSync } from "@swc/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    root: resolve(__dirname),
    silent: false,
  },
  resolve: {
    alias: {
      "css-variable": resolve(__dirname, "../../"),
    },
  },
  plugins: [
    {
      name: "swc-plugin",
      transform(code, id) {
        const pluginPath = resolve(
          __dirname,
          "../../swc/target/wasm32-wasi/release/swc_plugin_css_variable.wasm"
        );

        if (id.endsWith(".js") || id.endsWith(".ts") || id.endsWith(".tsx")) {
          const transformed = transformSync(code, {
            filename: id,
            jsc: {
              experimental: {
                plugins: [
                  [
                    pluginPath,
                    {
                      basePath: __dirname,
                      displayName: true,
                    },
                  ],
                ],
              },
            },
          });
          return transformed.code;
        }
      },
    },
  ],
});
