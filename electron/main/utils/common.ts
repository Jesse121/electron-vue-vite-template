import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";

/**
 * 添加 ipc 调用的处理事件
 * @param eventName - ipc 事件名
 * @param listener - 回调事件
 */
export const ipcMainHandle = <T>(
	eventName: string,
	listener: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<T> | void | T
): void => {
	ipcMain.handle(eventName, async (event, ...args: any[]) => {
		return listener(event, ...args);
	});
};
/*
on(channel: string, listener: (event: IpcMainEvent, ...args: any[]) => void): this;
*/

export const ipcMainOn = <T>(
	channel: string,
	listener: (event: IpcMainEvent, ...args: any[]) => Promise<T> | void | T
): void => {
	ipcMain.on(channel, (event, ...args: any[]) => {
		return listener(event, ...args);
	});
};
