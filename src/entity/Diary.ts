import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Diary extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => User, (user) => user.diary)
	@JoinColumn({
		name: "user_id",
	})
	user: User;

	@ManyToOne(() => Post, (post) => post.diary)
	@JoinColumn({
		name: "post_id",
	})
	post: Post;

	static getDiary(postid: number, userid: number) {
		return this.createQueryBuilder("diary")
			.leftJoin("diary.user", "user")
			.innerJoin("diary.post", "post")
			// .where("post.id = :id", { id: postid })
			// .andWhere("user.id = :id", { id: userid })
			.getMany();
	}
  //select * from diary inner join user on user.id = diary.user_id 
  // inner join post on post.id = diary.post_id

	static writeDiary(content: string) {
		return this.createQueryBuilder()
			.insert()
			.into(Diary)
			.values({ content })
			.execute();
	}

	static joinUser(id: string, userid: number) {
		return this.createQueryBuilder().relation(Diary, "user").of(id).set(userid);
	}

	static joinPost(id: string, postid: number) {
		return this.createQueryBuilder().relation(Diary, "post").of(id).set(postid);
	}

	static deleteDiary(id: any) {
		return this.createQueryBuilder()
			.delete()
			.from(Diary)
			.where("id = :id", { id })
			.execute();
	}
}
