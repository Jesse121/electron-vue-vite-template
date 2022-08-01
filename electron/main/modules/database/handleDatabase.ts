import sync from "../../utils/sync";
import userModel from "./model/user";
import sequelize, { connectDB } from "./sequelize";

const handleDatabase = async () => {
	const [err] = await sync(connectDB());
	if (err) return;

	const [err1, res1] = await sync(sequelize.sync());
	if (err1) return;
	const [err2, res2] = await sync(
		userModel.create({
			name: "jesse",
			sex: 1,
			id: "13456",
			mobile: 15219498643
		})
	);
	console.log(res2);
};
export default handleDatabase;
