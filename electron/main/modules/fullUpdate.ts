import { BrowserWindow, dialog } from "electron";
import { autoUpdater, UpdateCheckResult, UpdateInfo } from "electron-updater";

const fullUpdate = (window: BrowserWindow): void => {
	// // 正在检查更新
	// autoUpdater.on("checking-for-update", () => {
	// 	window.webContents.send(IPC.UPDATE_CHECKING, {
	// 		message: "检查更新中..."
	// 	});
	// });

	// 检查到新版本
	autoUpdater.once("update-available", (info: UpdateInfo) => {
		window.webContents.send("update-available", {
			message: `版本更新中...`
			// message: `检查到新版本 v${info.version}，开始下载`
		});
	});

	// 已经是新版本
	// autoUpdater.on("update-not-available", (info: UpdateInfo) => {
	// window.webContents.send(IPC.UPDATE_NOT_AVAILABLE, {
	// 	message: `当前版本已经是最新 v ${info.version}`
	// });
	// });

	// 更新下载中
	autoUpdater.on("download-progress", ({ percent }: { percent: number }) => {
		window.setProgressBar(percent / 100);
		window.webContents.send("download-progress", { percent: percent.toFixed(0) });
	});

	// 更新下载完毕
	autoUpdater.once("update-downloaded", () => {
		window.webContents.send("update-downloaded", {
			message: "更新完成"
		});
		autoUpdater.quitAndInstall();
	});

	// 检查更新出错
	autoUpdater.on("error", error => {
		window.webContents.send(
			"update-error",
			{
				message: "检查更新出错"
			},
			error
		);
	});
};

export default fullUpdate;
