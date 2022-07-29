import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "昵称" })
	name: string;

	@Column()
	description: string;

	@Column()
	filename: string;

	@Column()
	views: number;

	@Column()
	isPublished: boolean;
}
