import AdmZip from "adm-zip";
import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import fs from "fs";
import { join } from "path";

import pkg from "../../../package.json";
import electronAppInstance from "..";
import { deleteDirSync, getAppVersion, getRemoteZipToLocal, publishUrl } from "../utils/common";
import log from "../utils/log";
import sync from "../utils/sync";

const autoUpdate = async (win: BrowserWindow) => {
	if (!app.isPackaged) return false;
	if (process.platform !== "win32") return false;
	const [err, res] = await sync(getAppVersion());
	if (err) {
		console.error(err);
		log.error(err);
		return;
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
		win.setMinimumSize(420, 170);
		win.setSize(420, 170, false);
		win.center();
		const localPath = join(app.getPath("exe"), "../resources/");
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
			const [err, res] = await sync(getRemoteZipToLocal(publishUrl + "app.zip", "app.zip", "./", win));
			if (err) {
				return false;
			}
			try {
				const unzip = new AdmZip("app.zip");
				win.hide();
				unzip.extractAllTo(localPath, true, true);
			} catch (error) {
				log.error("extractAllToError", error);
			}
			app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
			electronAppInstance.quit();
		} catch (error) {
			log.error("partUpdateError", error);
		}
		return true;
	}
};

export default autoUpdate;
