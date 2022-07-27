import { Menu, Tray } from "electron";

import { IElectronApp } from "..";
import { getIcon, getLogout } from "../utils/icon";

let $tray: Tray | null = null;

const initEvent = () => {};
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

const createTray = (electronApp: IElectronApp) => {
	// 生成托盘图标及其菜单项实例
	$tray = new Tray(getIcon());
	// 设置鼠标悬浮时的标题
	$tray.setToolTip("ElectronApp");
	initEvent();
	setMenu(electronApp);
};

export default createTray;
