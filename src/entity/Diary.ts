import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne,JoinColumn} from "typeorm";
import { User } from "./User"
import { Post } from "./Post";


@Entity()
export class Diary {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.diary)
    @JoinColumn({
        name: "user_id"
    })
    user: User

    @ManyToOne(() => Post, post => post.diary)
    @JoinColumn({
        name: "post_id"
    })
    post: Post
}
