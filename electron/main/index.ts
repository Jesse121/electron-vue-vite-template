import { app, BrowserWindow } from "electron";

import createTray from "./modules/createTray";
import handleDatabase from "./modules/database/handleDatabase";
import checkFullUpdate from "./modules/fullUpdate";
import maxMinClose from "./modules/maxMinClose";
import { loadVueDevtools } from "./utils/devtools";
import log from "./utils/log";
import createMainWin from "./windows/mainWin";
import createOtherWin from "./windows/otherWin";

// 屏蔽不安全的协议http 提示
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export interface IElectronApp {
	mainWin: BrowserWindow;
	otherWin: BrowserWindow;
	showMainWin: () => void;
	quit: () => void;
}
class ElectronApp implements IElectronApp {
	mainWin: any = null;
	otherWin: any = null;

	constructor() {
		this.init().then(() => {
			this.initMainWin();
			this.initOtherWin();
			this.initListenFullUpdate();
			// handleDatabase();

			this.loadModules();
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
	 * 显示主窗口
	 */
	showMainWin() {
		if (this.mainWin) {
			if (this.mainWin.isMinimized()) {
				this.mainWin.restore();
			}

			this.mainWin.show();
			this.mainWin.focus();
		}
	}

	/**
	 * 初始化其他窗口
	 */
	initOtherWin() {
		this.otherWin = createOtherWin();
	}

	/**
	 * 初始化监听全量根系
	 */
	initListenFullUpdate() {
		checkFullUpdate(this.mainWin);
	}

	/**
	 * 加载功能模块
	 */
	loadModules() {
		// 最大化最小化关闭
		maxMinClose(this);
		// 创建托盘
		createTray(this);
	}
	/**
	 * 退出应用
	 */
	quit() {
		log.info("app quit");
		// if (this.mainTray && !this.mainTray.$tray.isDestroyed()) {
		// 	this.mainTray.$tray.destroy();
		// 	this.mainTray = null;
		// 	log.info("quit----tray.destroy");
		// }

		const windows = BrowserWindow.getAllWindows();
		windows.forEach(item => item.destroy());

		app.quit();
	}
}

export default new ElectronApp();
