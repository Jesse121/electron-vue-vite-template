import { contextBridge, ipcRenderer } from "electron";

import log from "../main/utils/log";

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
	const protos = Object.getPrototypeOf(obj);

	for (const [key, value] of Object.entries(protos)) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

		if (typeof value === "function") {
			// Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
			obj[key] = function (...args: any) {
				return value.call(obj, ...args);
			};
		} else {
			obj[key] = value;
		}
	}
	return obj;
}
contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));

contextBridge.exposeInMainWorld("log", log);
