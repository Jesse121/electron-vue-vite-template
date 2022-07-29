import { DataSource, DataSourceOptions } from "typeorm";

import { Photo } from "./entity/photo";

const handleDatabase = () => {
	console.log("a");
	const options: DataSourceOptions = {
		type: "sqlite",
		database: `./db.sqlite`,
		entities: [Photo],
		logging: true
	};

	// const AppDataSource = new DataSource(options);

	// AppDataSource.initialize()
	// 	.then(async DataSource => {
	// 		let photo = new Photo();
	// 		photo.name = "Me and Bears";
	// 		photo.description = "I am near polar bears";
	// 		photo.filename = "photo-with-bears.jpg";
	// 		photo.views = 1;
	// 		photo.isPublished = true;
	// 		let photoRepository = DataSource.getRepository(Photo);
	// 		await photoRepository.save(photo);
	// 		console.log("Photo has been saved");
	// 	})
	// 	.catch(error => console.log(error));
};

export default handleDatabase;
