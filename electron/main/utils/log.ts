import { app } from "electron";
import log from "electron-log";

/**
 * 支持下列日志等级
 * error,
 * warn,
 * info,
 * verbose,
 * debug,
 * silly
 *
 * 日志文件位置
 * on Linux: ~/.config/{app name}/logs/{process type}.log
 * on macOS: ~/Library/Logs/{app name}/{process type}.log
 * on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log
 */

let date = new Date();
const dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
// 修改日志文件名
log.transports.file.fileName = dateStr + ".log";

// 打包后禁用console输出
if (app?.isPackaged) {
	log.transports.console.level = false;
}

export default log;
