import { contextBridge, ipcRenderer } from "electron";

import log from "../main/utils/log";

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

contextBridge.exposeInMainWorld("log", log);
