import path from "path";

const resolve = (relativePath: string) => path.resolve(__dirname, relativePath);

/**
 * 不同系统采用不同图标
 * @returns
 */
export const getIcon = () => {
	if (process.platform === "darwin") {
		return resolve("../../../resources/icons/mac/icon.icns");
	} else if (process.platform === "win32") {
		return resolve("../../../resources/icons/win/icon.ico");
	} else {
		return resolve("../../../resources/icons/png/256x256.png");
	}
};

export const getLogout = () => resolve("../../../resources/logout.png");
