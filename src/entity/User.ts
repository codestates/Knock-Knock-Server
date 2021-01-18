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

  static findById(id: string) {
    return this.createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();
  }

  static findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }

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
  static signup(email: string, username: string) {
    return this.createQueryBuilder()
      .insert()
      .into(User)
      .values({ username, email })
      .execute();
  }
}

// .insert()
// .into("user")
// .values([{ username, email, persona, mood, user_stacks }])
// .execute();
