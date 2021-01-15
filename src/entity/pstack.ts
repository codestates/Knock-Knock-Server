import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Pstack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stackName: string;

  @ManyToMany(() => Post, (post) => post.id)
  post: Post;
}
