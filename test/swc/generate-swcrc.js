import { readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swcrcPath = join(__dirname, ".swcrc");
const pluginPath = resolve(
  __dirname,
  "../../swc/target/wasm32-wasi/release/swc_plugin_css_variable.wasm"
);

let swcrcContent = readFileSync(swcrcPath, "utf8");
swcrcContent = swcrcContent.replace(
  '"__PLUGIN_PATH__"',
  JSON.stringify(pluginPath)
);

writeFileSync(swcrcPath, swcrcContent);

console.log("Generated .swcrc with absolute plugin path");
