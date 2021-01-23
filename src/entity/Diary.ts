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

  // 특정 게시물에 해당되는 회고를 가져온다. 
  static getDiary(postid: any, userid: any) {
    return this.createQueryBuilder("diary")
			.innerJoin("diary.post", "post")
			.innerJoin("diary.user", "user")
			.where("diary.post_id = :post_id", { post_id: postid })
			.andWhere("diary.user_id = :user_id", { user_id: userid })
			.getMany();
  }

  // 회고를 작성한다.
  static writeDiary(content: string) {
    return this.createQueryBuilder()
      .insert()
      .into(Diary)
      .values({ content })
      .execute();
  }

  // 유저와 조인 관계를 맺는다.
  static joinUser(id: string, userid: number) {
    return this.createQueryBuilder()
    .relation(Diary, "user")
    .of(id)
    .set(userid);
  }

  // 게시물과 조인관계를 맺는다.
  static joinPost(id: string, postid: number) {
    return this.createQueryBuilder()
    .relation(Diary, "post")
    .of(id)
    .set(postid);
  }

  //회고를 삭제한다. 
  static deleteDiary(id: any) {
    return this.createQueryBuilder()
      .delete()
      .from(Diary)
      .where("id = :id", { id })
      .execute();
  }
}
