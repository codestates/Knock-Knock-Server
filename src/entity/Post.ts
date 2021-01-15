import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Pstack } from "./Pstack";
import { User } from "./User";
import { Comment } from "./Comment";
import { Diary } from "./Diary";

@Entity()
export class Post {
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

  @OneToMany(() => Diary, (diary) => diary.post)
  diary: Diary[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @ManyToMany(() => Pstack)
  @JoinTable({
    name: "post_pstack",
  })
  pstack: Pstack[];

  @ManyToMany(() => User)
  @JoinTable({
    name: "post_user",
  })
  user: User;
}
