import AdmZip from "adm-zip";
import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import fs from "fs";
import { join } from "path";
import { platform } from "process";

import pkg from "../../../package.json";
import electronAppInstance from "..";
import { deleteDirSync, getAppVersion, getRemoteZipToLocal, publishUrl } from "../utils/common";
import log from "../utils/log";
import sync from "../utils/sync";

const autoUpdate = async (win: BrowserWindow) => {
	if (!app.isPackaged) return false;
	const [err, res] = await sync(getAppVersion());
	if (err) {
		log.error("getAppVersionError", err);
		return false;
	}
	log.info("remoteVersion:", res);
	log.info("currentVersion", pkg.version);
	const remoteVersionArr = res.split(".");
	const currentVersionArr = pkg.version.split(".");
	if (Number(remoteVersionArr[0]) > Number(currentVersionArr[0])) {
		// 开启全量更新
		const [err, res] = await sync(autoUpdater.checkForUpdates());
		if (err) {
			log.error("fullUpdateError", err);
		}
		if (res) {
			win.setMinimumSize(420, 170);
			win.setSize(420, 170, false);
			win.center();
		}
		return true;
	} else if (
		Number(remoteVersionArr[1]) > Number(currentVersionArr[1]) ||
		Number(remoteVersionArr[2]) > Number(currentVersionArr[2])
	) {
		// 开启增量更新
		const targetPath = platform === "darwin" ? "../../Resources/" : "../resources/";
		const localPath = join(app.getPath("exe"), targetPath);
		log.info("localPath", localPath);
		try {
			if (fs.existsSync(localPath + "app.back")) {
				// 删除旧备份
				deleteDirSync(localPath + "app.back");
			}
			if (fs.existsSync(localPath + "app")) {
				// 重新备份
				fs.renameSync(localPath + "app", localPath + "app.back");
			}
			getRemoteZipToLocal(publishUrl + "app.zip", "app.zip", localPath, win)
				.then(() => {
					try {
						const unzip = new AdmZip(localPath + "app.zip");
						// win.hide();
						fs.mkdirSync(localPath + "app");
						unzip.extractAllTo(localPath + "app", true, true);
					} catch (error) {
						log.error("extractAllToError", error);
					}
					app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
					electronAppInstance.quit();
				})
				.catch(err => {
					log.error("getRemoteZipToLocal", err);
				});
		} catch (error) {
			log.error("partUpdateError", error);
			if (fs.existsSync(localPath + "app.back")) {
				// 使用备份
				fs.renameSync(localPath + "app.back", localPath + "app");
			}
		}
		win.setMinimumSize(420, 170);
		win.setSize(420, 170, false);
		win.center();
		return true;
	}
};

export default autoUpdate;
