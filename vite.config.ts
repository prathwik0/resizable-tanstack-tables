import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ResizableTanstackTables",
      formats: ["es", "umd", "cjs"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return "index.mjs";
          case "umd":
            return "index.umd.js";
          case "cjs":
            return "index.js";
          default:
            return `index.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: ["react", "@tanstack/react-table"],
      output: {
        globals: {
          react: "React",
          "@tanstack/react-table": "ReactTable",
        },
      },
    },
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      format: {
        comments: "some",
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
