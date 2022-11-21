import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import vue from "@vitejs/plugin-vue";
import { rmSync } from "fs";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

import { svgBuilder } from "./src/utils/svgBuilder";

const resolvePath = (dir: string) => path.join(__dirname, dir);

rmSync("dist", { recursive: true, force: true });

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
		alias: {
			"@": resolvePath("./src")
			// vue: "https://esm.sh/vue@3.2.37"
		}
	},
	plugins: [
		vue(),
		svgBuilder(resolvePath("./src/assets/svg/")),
		viteCommonjs(),
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
						outDir: "dist/electron/preload"
					}
				}
			}
		}),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: ["vue"] // 自动导入vue3API
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				additionalData: `@import "${resolvePath("./src/styles/variables.less")}";`
			}
		},
		postcss: {
			plugins: [
				// 移除打包element时的@charset警告
				{
					postcssPlugin: "internal:charset-removal",
					AtRule: {
						charset: atRule => {
							if (atRule.name === "charset") {
								atRule.remove();
							}
						}
					}
				}
			]
		}
	},
	build: {
		// 关闭小文件编译的行为 没必要为了减少请求数量而增加单个文件的解析开销
		assetsInlineLimit: 0
	}
});
