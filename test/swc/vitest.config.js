import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { transformSync } from "@swc/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    root: path.resolve(__dirname),
  },
  resolve: {
    alias: {
      "css-variable": path.resolve(__dirname, "../../"),
    },
  },
  plugins: [
    {
      name: "swc-plugin",
      transform(code, id) {
        if (id.endsWith(".js") || id.endsWith(".ts") || id.endsWith(".tsx")) {
          return transformSync(code, {
            filename: id,
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
          }).code;
        }
      },
    },
  ],
});
