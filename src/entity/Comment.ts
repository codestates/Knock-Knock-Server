import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.comment)
  @JoinColumn({
    name: "post_id",
  })
  post: Post;

  static getComments(postid: any) {
    return this.createQueryBuilder("comment")
			.innerJoinAndSelect("comment.post", "post")
			.innerJoinAndSelect("comment.user", "user")
			.where("comment.post_id = :post_id", { post_id: postid })
			.getMany();
  }

  //특정 1개의 댓글을 가져온다.
  static getAComment(commentid: any) {
    return this.createQueryBuilder("comment")
      .where("comment.id = :id", { id: commentid })
      .getOne();
  }

  // 댓글을 작성한다.
  static postComments(writer: string, comment: string) {
    return this.createQueryBuilder()
      .insert()
      .into(Comment)
      .values({ writer, comment })
      .execute();
  }

  //댓글과 유저의 조인관계를 맺는다.
  static joinUser(id: any, userid: any) {
    return this.createQueryBuilder()
      .relation(Comment, "user")
      .of(id)
      .set(userid);
  }

  // 게시물과 조인 관계를 맺는다.
  static joinPost(id: any, postid: any) {
    return this.createQueryBuilder()
      .relation(Comment, "post")
      .of(id)
      .set(postid);
  }

  //특정 코멘트 1개를 가져온다.
  static findById(id: number) {
    return this.createQueryBuilder("comment")
      .where("comment.id = :id", { id })
      .getOne();
  }

  static deleteComment(id: string) {
    return this.createQueryBuilder()
      .delete()
      .from(Comment)
      .where("comment.id = :id", { id })
      .execute();
  }
}
