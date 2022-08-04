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
		getRemoteZipToLocal(publishUrl + "app.zip", "app.zip", localPath, win)
			.then(() => {
				log.info("app.zip download success");
				try {
					const unzip = new AdmZip(localPath + "app.zip");
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

		win.setMinimumSize(420, 170);
		win.setSize(420, 170, false);
		win.center();
		return true;
	}
};

export default autoUpdate;
