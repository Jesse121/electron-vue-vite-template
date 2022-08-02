import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import { join } from "path";

import pkg from "../../../package.json";
import { getAppVersion } from "../utils/common";
import { openDevTools } from "../utils/devtools";
import { getIcon } from "../utils/icon";
import { ipcMainHandle } from "../utils/ipcMain";
import log from "../utils/log";
import sync from "../utils/sync";

const createMainWin = (): BrowserWindow => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: getIcon(),
		// 创建无边框窗口
		frame: false,
		webPreferences: {
			nodeIntegration: true, // 是否集成nodejs
			contextIsolation: true, // 是否开启上下文隔离
			preload: join(__dirname, "../preload/index.js")
		}
	});

	win.webContents.on("did-finish-load", () => {
		// 利用localStorage存储win.id
		win.webContents.executeJavaScript(`localStorage.setItem("electronMainWinId",${win.id})`);
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (app.isPackaged) {
		win.loadFile(join(__dirname, "../../index.html"));
	} else {
		const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

		win.loadURL(url).finally(() => openDevTools(win));
	}

	ipcMainHandle("checkUpdate", async () => {
		if (!app.isPackaged) return;
		if (process.platform !== "win32") return;
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
				console.error(err);
				log.error(err);
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
			// getRemoteFileToLocal(builderConfig.publish[0].url + "app.zip", "app.zip", "./", manThis.$mainWin)
			// 	.then(res => {
			// 		if (res) {
			// 			const unzip = new AdmZip("app.zip");
			// 			win.hide();
			// 			unzip.extractAllTo(localPath, true, true);
			// 			manThis.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
			// 			manThis.quit();
			// 		}
			// 	})
			// 	.catch(err => log.error(err));
			return true;
		}
		return false;
	});

	return win;
};

export default createMainWin;
