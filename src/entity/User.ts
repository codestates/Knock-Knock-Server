// import { static } from "express";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";

import { Comment } from "./Comment";
import { Diary } from "./Diary";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  persona: string;

  @Column({ nullable: true })
  mood: string;

  @Column({ nullable: true })
  user_stacks: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Diary, (diary) => diary.user)
  diary: Diary[];

  @ManyToMany(() => Post, (post) => post.id, {
    cascade: true,
  })
  @JoinTable({
    name: "post_user",
  })
  post: Post[];

  //세션 userid로 유저 데이터를 검색한다.
  static findById(id: string) {
    return this.createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();
  }

  //최초 oauth로그인 시, 이메일로 로그인 여부를 확인한다.
  static findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }
 
  //유저의 프로필 정보를 업데이트(수정)한다.
  static updateUser(
    id: string,
    username: string,
    persona: string,
    mood: string,
    user_stacks: string
  ) {
    return this.createQueryBuilder("user")
      .update(User)
      .set({ username, persona, mood, user_stacks })
      .where("id = :id", { id })
      .execute();
  }
  
  // 로그인 이력이 없으면, 회원가입을 진행한다. 
  static signup(email: string, username: string) {
    return this.createQueryBuilder()
      .insert()
      .into(User)
      .values({ username, email })
      .execute();
  }
}


