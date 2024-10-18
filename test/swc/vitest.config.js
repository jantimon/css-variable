import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    root: path.resolve(__dirname),
    include: ["**/*.transformed.js"],
  },
  resolve: {
    alias: {
      "css-variable": path.resolve(__dirname, "../../"),
    },
  },
});
