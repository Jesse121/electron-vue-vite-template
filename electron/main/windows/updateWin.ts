import { app, BrowserWindow } from "electron";
import { join } from "path";

import { closeDevTools, openDevTools } from "../utils/devtools";
import { getIcon } from "../utils/icon";

const createUpdateWin = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		// show: false,
		icon: getIcon(),
		webPreferences: {
			preload: join(__dirname, "../preload/index.js")
		}
	});

	win.webContents.on("did-finish-load", () => {
		// 利用localStorage存储win.id
		win.webContents.executeJavaScript(`localStorage.setItem("electronUpdateWinId",${win.id})`);
	});

	let windowUrl;
	if (app.isPackaged) {
		windowUrl = "file://" + join(__dirname, "../../index.html");
	} else {
		windowUrl = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
	}
	win.loadURL(windowUrl + "#/update");

	win.on("show", () => openDevTools(win));
	win.on("hide", () => closeDevTools(win));

	return win;
};

export default createUpdateWin;
