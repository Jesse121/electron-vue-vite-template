const path = require("path");
const AdmZip = require("adm-zip");

const afterPack = context => {
	let targetPath;
	if (context.packager.platform.nodeName === "darwin") {
		targetPath = path.join(context.appOutDir, `${context.packager.appInfo.productName}.app/Contents/Resources`);
	} else {
		targetPath = path.join(context.appOutDir, "./resources");
	}
	const unpackedApp = path.join(targetPath, "./app");
	var zip = new AdmZip();
	zip.addLocalFolder(unpackedApp);

	zip.writeZip(path.join(context.outDir, "app.zip"));
};

module.exports = afterPack;
