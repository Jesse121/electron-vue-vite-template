import { IpcRendererEvent } from "electron";

/**
 * 渲染进程向主进程发送异步消息
 * @param channel 通过channel向渲染器进程发送异步消息
 * @param args  发送任意参数
 */
export const ipcRendererSend = (channel: string, ...args: any[]): void => ipcRenderer.send(channel, ...args);

/**
 *
 * @param channel
 * @param listener
 * @returns
 */
export const ipcRendererOn = (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) =>
	ipcRenderer.on(channel, listener);

export const ipcRendererInvoke = (channel: string, ...args: any[]): Promise<any> =>
	ipcRenderer.invoke(channel, ...args);
