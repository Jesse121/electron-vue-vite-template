import { app } from "electron";
import log from "electron-log";
import path from "path";

/**
 * 支持下列日志等级
 * error,
 * warn,
 * info,
 * verbose,
 * debug,
 * silly
 */

let date = new Date();
const dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

// 修改日志文件路径和名称，以日期为文件名区分不同日期的日志
// on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\{dataStr}.log
// on macOS: ~/Library/Application Support/{app name}/logs/{dateStr}.log
// on Linux: ~/.config/{app name}/logs/{dateStr}.log
log.transports.file.resolvePath = () => path.join(app.getPath("userData"), "logs", dateStr + ".log");

export default log;
