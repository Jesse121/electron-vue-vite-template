import { app, BrowserWindow } from "electron";
import { createWriteStream, existsSync, PathLike, readdirSync, rmdirSync, statSync, unlink, unlinkSync } from "fs";
import http from "http";
import path, { join } from "path";
import { platform } from "process";
import progress from "progress-stream";

import builderConfig from "../../../electron-builder.json";

export const publishUrl = builderConfig.publish[0].url;

export const getUserDataPath = () => app.getPath("userData");

export const pathJoin = (...p: string[]): string => path.join(...p);

/**
 * 获取app版本号
 * @returns
 */
export const getAppVersion = (): Promise<string> =>
	new Promise((resolve, reject) => {
		const latest = platform === "win32" ? "latest.yml" : platform === "darwin" ? "latest-mac.yml" : "latest-linux.yml";
		const req = http.get(publishUrl + latest, req => {
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
							reject(err);
						});
					});
			})
			.on("error", e => {
				reject(e.message);
			})
			.end();
	});
};
/**
 * 删除文件夹
 * @param path
 */
export const deleteDirSync = (path: PathLike) => {
	let files = [];
	if (existsSync(path)) {
		files = readdirSync(path);
		files.forEach(file => {
			const curPath = path + "/" + file;
			if (statSync(curPath).isDirectory()) {
				deleteDirSync(curPath);
			} else {
				unlinkSync(curPath);
			}
		});
		rmdirSync(path);
	}
};
