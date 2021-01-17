import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { User } from "./User";
import { Comment } from "./Comment";
import { Diary } from "./Diary";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writer: string;

  @Column()
  category: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: true })
  open: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  backend: number;

  @Column({ nullable: true })
  frontend: number;

  @Column({ nullable: true })
  total: number;

  @Column({ nullable: true })
  post_stacks: string;

  @OneToMany(() => Diary, (diary) => diary.post)
  diary: Diary[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinTable({
    name: "post_user",
  })
  user: User[];

  static writingPost(
    writer: string,
    category: string,
    title: string,
    content: string,
    backend: number,
    frontend: number,
    total: number,
    post_stacks: string
  ) {
    return this.createQueryBuilder("posts")
      .insert()
      .into(Post)
      .values([
        {
          writer,
          category,
          title,
          content,
          backend,
          frontend,
          total,
          post_stacks,
        },
      ])
      .execute();
  }

  static findById(id: string) {
    return this.createQueryBuilder("post")
      .where("post.id = :id", { id })
      .getOne();
  }

  static JoinTheTable(postid: any, userid: any) {
    return this.createQueryBuilder()
      .relation(Post, "user")
      .of(postid)
      .add(userid);
  }

  static allPost() {
    return this.createQueryBuilder("post").getMany();
  }

  static openChange(id: string, open: boolean) {
    return this.createQueryBuilder("post")
      .update(Post)
      .set({ open })
      .where("id = :id", { id })
      .execute();
  }

  static changeNum(id: number, backend: number, frontend: number) {
    return this.createQueryBuilder()
      .update(Post)
      .set({ backend, frontend })
      .where("id = :id", { id })
      .execute();
  }
}
