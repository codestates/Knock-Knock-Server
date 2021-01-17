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
import {User} from "./User";
import {Post} from "./Post"

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    writer: string;

    @Column()
    comment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.comment)
    @JoinColumn({
        name: "user_id"
    })
    user: User

    @ManyToOne(() => Post, post => post.comment)
    @JoinColumn({
        name: "post_id"
    })
    post: Post
}

