import { IpcRendererEvent } from "electron";

/**
 * 渲染进程向主进程发送异步消息
 * @param channel 通过channel向渲染器进程发送异步消息
 * @param args  发送任意参数
 */
export const ipcRendererSend = (channel: string, ...args: any[]): void => ipcRenderer.send(channel, ...args);

/**
 * 渲染进程监听消息
 * @param channel
 * @param listener
 * @returns
 */
export const ipcRendererOn = (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) =>
	ipcRenderer.on(channel, listener);

/**
 * 渲染进程向主进程发消息且主进程处理完后将结果返回给渲染进程
 * @param channel
 * @param args
 * @returns
 */
export const ipcRendererInvoke = (channel: string, ...args: any[]): Promise<any> =>
	ipcRenderer.invoke(channel, ...args);

/**
 * 通过webContentsId可以在两个渲染进程之间直接发消息
 * @param webContentsId
 * @param channel
 * @param args
 * @returns
 */
export const ipcRendererSendTo = (webContentsId: number, channel: string, ...args: any[]): void =>
	ipcRenderer.sendTo(webContentsId, channel, ...args);

export const ipcRendererOnce = (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) =>
	ipcRenderer.once(channel, listener);

/**
 * 移除channel的监听
 * @param channel
 * @param listener
 * @returns
 */
export const ipcRendererRemoveListener = (channel: string, listener: (...args: any[]) => void) =>
	ipcRenderer.removeListener(channel, listener);
