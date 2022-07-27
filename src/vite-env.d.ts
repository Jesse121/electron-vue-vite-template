/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare const ipcRenderer: import("electron").IpcRenderer;

declare const log: {
	info: (args: string) => void;
	error: (args: string) => void;
	debug: (args: string) => void;
};
