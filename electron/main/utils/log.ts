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
// 修改日志格式
log.transports.file.format = "[{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}";
// 设置日志文件大小上限, 达到上限后备份文件并重命名未**.old.log,有且仅有一个备份文件
log.transports.file.maxSize = 3 * 1024 * 1024;

// 打包后禁用console输出
if (app?.isPackaged) {
	log.transports.console.level = false;
}

export default log;
