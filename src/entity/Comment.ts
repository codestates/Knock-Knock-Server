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

    @Column()
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


    static getComments(postid: string) {
        return this.createQueryBuilder("comment")
            .innerJoin("comment.post", "post")
            .where("post.id = :id", { id: postid })
            .getMany()
        // mysql> select * from comment inner join post on comment.post_id = post.id;
    }


    static postComments(
        writer: string,
        comment: string,
    ) {
        return this.createQueryBuilder()
            .insert()
            .into(Comment)
            .values({ writer, comment })
            .execute();
    }

    static joinUser(id: any, userid: any) {
        return this.createQueryBuilder()
            .relation(Comment, "user")
            .of(id)
            .set(userid);
    }
    static joinPost(id: any, postid: any) {
        return this.createQueryBuilder()
            .relation(Comment, "post")
            .of(id)
            .set(postid);
    }
    
    static findById(id: number) {
    return this.createQueryBuilder("comment")
				.where("comment.id = :id", { id })
				.getOne();
    }

    static deleteComment (id: string) {
        return this.createQueryBuilder()
            .delete()
            .from(Comment)
            .where("comment.id = :id", { id })
            .execute();
    }

}

