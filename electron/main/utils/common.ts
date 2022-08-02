import { app, BrowserWindow } from "electron";
import { createWriteStream, unlink } from "fs";
import http from "http";
import path, { join } from "path";
import progress from "progress-stream";

import builderConfig from "../../../electron-builder.json";
import log from "./log";

export const publishUrl = builderConfig.publish[0].url;

export const getUserDataPath = () => app.getPath("userData");

export const pathJoin = (...p: string[]): string => path.join(...p);

/**
 * 获取app版本号
 * @returns
 */
export const getAppVersion = (): Promise<string> =>
	new Promise((resolve, reject) => {
		const req = http.get(publishUrl + "latest.yml", req => {
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

/**
 * 下载远程zip文件到本地
 * @param remoteUrl
 * @param fileName
 * @param localPath
 * @param window
 * @returns
 */
export const getRemoteZipToLocal = (remoteUrl: string, fileName: string, localPath: string, window: BrowserWindow) => {
	return new Promise((resolve, reject) => {
		const file = createWriteStream(join(localPath, fileName));
		http
			.get(remoteUrl, res => {
				if (res.statusCode !== 200) {
					reject(res.statusCode);
					return;
				}
				const str = progress({
					length: res.headers["content-length"] ? parseInt(res.headers["content-length"], 10) : 0,
					time: 500 /* ms */
				});
				str.on("progress", ({ percentage }: { percentage: number }) => {
					if (window.isDestroyed()) return;
					window.webContents.send("download-progress", { percent: percentage.toFixed(0) });
				});
				// 两个pip(通道) => 下载进度监控、存储到本地路径
				res.pipe(str).pipe(file);
				res.on("end", () => {
					if (window.isDestroyed()) return;
					window.webContents.send("update-downloaded", {
						message: "更新完成"
					});
				});
				file
					.on("finish", () => {
						file.close();
						if (window.isDestroyed()) return;
						window.webContents.send("update-finish", {
							message: "重启中..."
						});
						resolve(true);
					})
					.on("error", err => {
						unlink(join(localPath, fileName), err => {
							console.log(err);
						});
					});
			})
			.on("error", e => {
				log.error("getRemoteFileToLocal", e.message);
			})
			.end();
	});
};
