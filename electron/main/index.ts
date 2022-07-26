import { app, BrowserWindow } from "electron";

import { loadVueDevtools } from "./utils/devtools";
import createMainWin from "./windows/mainWin";
import createUpdateWin from "./windows/updateWin";

// 屏蔽不安全的协议http 提示
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

interface IElectronApp {
	mainWin: BrowserWindow;
	updateWin: BrowserWindow;
}
class ElectronApp implements IElectronApp {
	mainWin: any = null;
	updateWin: any = null;

	constructor() {
		this.init().then(() => {
			this.initMainWin();
			this.initUpdateWin();

			loadVueDevtools();
		});
	}

	init() {
		// 只允许一个app 运行
		if (!app.requestSingleInstanceLock()) {
			app.quit();
			process.exit(0);
		}
		app.on("window-all-closed", () => {
			if (process.platform !== "darwin") {
				app.quit();
			}
		});
		return app.whenReady();
	}

	/**
	 * 初始化主窗口
	 */
	initMainWin() {
		this.mainWin = createMainWin();
	}

	/**
	 * 初始化更新窗口
	 */
	initUpdateWin() {
		this.updateWin = createUpdateWin();
	}
}

export default new ElectronApp();
