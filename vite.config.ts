import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import electron from "vite-plugin-electron";

const resolvePath = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: [".vue", ".ts", ".js"],
    alias: {
      "@": resolvePath("./src"),
    },
  },
  plugins: [
    vue(),
    electron({
      main: {
        entry: "electron/main/index.ts",
        vite: {
          build: {
            outDir: "dist/electron/main",
          },
        },
      },
      preload: {
        input: {
          // Must be use absolute path, this is the restrict of Rollup
          index: resolvePath("electron/preload/index.ts"),
        },
        vite: {
          build: {
            sourcemap: "inline",
            outDir: "dist/electron/preload",
          },
        },
      },
    }),
  ],
});
