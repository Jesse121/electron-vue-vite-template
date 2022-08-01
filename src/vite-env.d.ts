/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare const ipcRenderer: import("electron").IpcRenderer;

declare const log: {
	info: (...params: any[]) => void;
	warn (...params: any[]): void;
	error: (...params: any[]) => void;
	debug: (...params: any[]) => void;
};
