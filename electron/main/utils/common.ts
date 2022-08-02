import { app } from "electron";
import http from "http";
import path from "path";

import builderConfig from "../../../electron-builder.json";

export const getUserDataPath = () => app.getPath("userData");

export const pathJoin = (...p: string[]): string => path.join(...p);

/**
 * 获取app版本号
 * @returns
 */
export const getAppVersion = (): Promise<string> =>
	new Promise((resolve, reject) => {
		const req = http.get(builderConfig.publish[0].url + "latest.yml", req => {
			let detail = "";
			req.setEncoding("utf-8");
			req.on("data", chunk => {
				detail += chunk.toString();
			});
			req.on("end", () => {
				return resolve(detail.split("\n")[0].split(" ")[1]);
			});
		});
		req.on("error", e => {
			reject(e);
		});
		req.end();
	});
