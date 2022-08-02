import { app, BrowserWindow } from "electron";

import electronAppInstance, { IElectronApp } from "..";
import { ipcMainHandle, ipcMainOn } from "../utils/ipcMain";

export default () => {
	/**
	 * 窗口最小化
	 */
	ipcMainOn("minimize-win", event => {
		const win = BrowserWindow.fromId(event.sender.id);
		win?.minimize();
	});
	/**
	 * 窗口最大化与正常化
	 */
	ipcMainHandle("maximize-win", event => {
		const win = BrowserWindow.fromId(event.sender.id);
		if (win?.isMaximized()) {
			win.unmaximize();
			return "showMaximizeIcon";
		} else {
			win?.maximize();
			return "showNormalIcon";
		}
	});
	/**
	 * 关闭窗口
	 */
	ipcMainOn("close-win", (event, arg: { needClose: boolean }) => {
		if (arg.needClose) {
			electronAppInstance.quit();
		} else {
			const win = BrowserWindow.fromId(event.sender.id);
			win?.hide();
		}
	});
};
