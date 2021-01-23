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

  //게시물을 작성한다.
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

  //게시글의 id로 1개의 게시글을 검색한다.
  static findById(id: string) {
    return this.createQueryBuilder("post")
      .where("post.id = :id", { id })
      .getOne();
  }

  // 유저와 게시물의 조인테이블을 연결한다.
  static JoinTheTable(postid: any, userid: any) {
    return this.createQueryBuilder()
      .relation(Post, "user")
      .of(postid)
      .add(userid);
  }

  // 유저와 게시물의 조인테이블 연결을 해제한다.
  static unjoinTheTable(postid: any, userid: any) {
    return this.createQueryBuilder()
      .relation(Post, "user")
      .of(postid)
      .remove(userid);
  }

  // 유저와 조인되어있는 게시물을 가져온다.
  static getUserPost(userid: any) {
    return this.createQueryBuilder("post")
      .leftJoin("post.user", "user")
      .where("user.id =:id", { id: userid })
      .getMany();
  }

  // 모든 게시물을 가져온다.
  static allPost() {
    return this.createQueryBuilder("post").getMany();
  }

  // 게시물의 상태를 closed로 변경한다.
  static openChange(id: string, open: boolean) {
    return this.createQueryBuilder("post")
      .update(Post)
      .set({ open })
      .where("id = :id", { id })
      .execute();
  }

  // 게시물의 상태를 무조건 false로 만든다.
  static makeClosed(id: any) {
    return this.createQueryBuilder("post")
      .update(Post)
      .set({ open: false })
      .where("id = :id", { id })
      .execute();
  }

  // 포지션 지원 인원을 변경한다.
  static changeNum(id: number, backend: number, frontend: number) {
    return this.createQueryBuilder()
      .update(Post)
      .set({ backend, frontend })
      .where("id = :id", { id })
      .execute();
  }

  // total 인원을 변경한다.
  static changeTotal(id: number, total: number) {
    return this.createQueryBuilder()
      .update(Post)
      .set({ total })
      .where("id = :id", { id })
      .execute();
  }
}
