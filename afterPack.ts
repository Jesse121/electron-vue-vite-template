const path = require("path");
const AdmZip = require("adm-zip");

const afterPack = context => {
	let targetPath;
	if (context.packager.platform.nodeName === "darwin") {
		targetPath = path.join(context.appOutDir, `${context.packager.appInfo.productName}.app/Contents/Resources`);
	} else {
		targetPath = path.join(context.appOutDir, "./resources");
	}
	const unpackedDist = path.join(targetPath, "./app/dist");
	const unpackedResources = path.join(targetPath, "./app/resources");
	const unpackedNodeModule = path.join(targetPath, "./app/node_modules");
	const unpackedPackage = path.join(targetPath, "./app/package.json");
	var zip = new AdmZip();
	zip.addLocalFolder(unpackedDist);
	zip.addLocalFolder(unpackedResources);
	zip.addLocalFolder(unpackedNodeModule);
	zip.addLocalFile(unpackedPackage);
	zip.writeZip(path.join(context.outDir, "app.zip"));
};

module.exports = afterPack;
