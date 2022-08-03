import { Menu, Tray } from "electron";
import path from "path";

import electronAppInstance, { IElectronApp } from "..";
import { getLogout } from "../utils/icon";

let $tray: Tray | null = null;

const setMenu = (electronApp: IElectronApp) => {
	const menu = [
		{
			label: "打开ElectronApp",
			click: () => electronApp.showMainWin()
		},
		{
			icon: getLogout(),
			label: "退出",
			click: () => electronApp.quit()
		}
	];
	if ($tray) {
		// 绑定菜单
		$tray.setContextMenu(Menu.buildFromTemplate(menu));
	}
};

const createTray = () => {
	// 生成托盘图标及其菜单项实例
	$tray = new Tray(path.join(__dirname, "../../../resources/icons/png/16x16.png"));
	// 设置鼠标悬浮时的标题
	$tray.setToolTip("ElectronApp");
	setMenu(electronAppInstance);
	return $tray;
};

export default createTray;
