declare const ipcRenderer: import("electron").IpcRenderer;

declare const log: {
	info: (args: string) => void;
	error: (args: string) => void;
	debug: (args: string) => void;
};

declare const sqlite: {
	db: any;
	connect: (path: string) => Promise<unknown>;
	get: (sql: string, params?: Object) => Promise<unknown>;
	run: (sql: string, params?: Object) => Promise<unknown>;
	all: (sql: string, params?: Object) => Promise<unknown>;
};
