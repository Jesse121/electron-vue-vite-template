import { Sequelize } from "sequelize";

import { getUserDataPath, pathJoin } from "../../utils/common";
import log from "../../utils/log";

const databasePath = pathJoin(getUserDataPath(), "./database.sqlite");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: databasePath
});

export const connectDB = (): Promise<boolean> =>
	new Promise((resolve, reject) => {
		sequelize
			.authenticate()
			.then(() => {
				log.info("Connection has been established successfully.");
				resolve(true);
			})
			.catch((err: any) => {
				log.error("Unable to connect to the database:", err);
				reject(false);
			});
	});

export default sequelize;
