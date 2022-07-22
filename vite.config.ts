import vue from "@vitejs/plugin-vue";
import { rmSync } from "fs";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

const resolvePath = (dir: string) => path.join(__dirname, dir);

rmSync("dist", { recursive: true, force: true });

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
		alias: {
			"@": resolvePath("./src")
		}
	},
	plugins: [
		vue(),
		electron({
			main: {
				entry: "electron/main/index.ts",
				vite: {
					build: {
						outDir: "dist/electron/main"
					}
				}
			},
			preload: {
				input: {
					// Must be use absolute path, this is the restrict of Rollup
					index: resolvePath("electron/preload/index.ts")
				},
				vite: {
					build: {
						sourcemap: "inline",
						outDir: "dist/electron/preload"
					}
				}
			}
		}),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	]
});
