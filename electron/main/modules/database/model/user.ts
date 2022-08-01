import { INTEGER, Model, STRING } from "sequelize";

import sequelize from "../sequelize";

interface IUserModel {
	id: string;
	name: string;
	sex: number;
	mobile: number;
}

const userModel = sequelize.define<Model<IUserModel>>("user", {
	id: {
		primaryKey: true,
		type: STRING(100)
	},
	name: {
		type: STRING(50)
	},
	sex: {
		type: INTEGER
	},
	mobile: {
		type: INTEGER
	}
});

export default userModel;
