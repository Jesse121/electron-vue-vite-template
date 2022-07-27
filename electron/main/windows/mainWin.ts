import remote from "@electron/remote/main";
import { app, BrowserWindow } from "electron";
import { join } from "path";

import { openDevTools } from "../utils/devtools";
import { getIcon } from "../utils/icon";

remote.initialize();

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
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	remote.enable(win.webContents);

	if (app.isPackaged) {
		win.loadFile(join(__dirname, "../../index.html"));
	} else {
		const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

		win.loadURL(url);
		win.on("show", () => openDevTools(win));
	}
	return win;
};

export default createMainWin;
