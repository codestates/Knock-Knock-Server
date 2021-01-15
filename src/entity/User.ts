import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import {Comment} from "./Comment";
import {Ustack} from "./Ustack"
import {Diary} from "./Diary";


@Entity()
export class User {

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(()=> Comment, comment => comment.user)
    comment: Comment[];

    @OneToMany(()=> Diary, diary => diary.user)
    diary: Diary[];

    @ManyToMany(() => Ustack)
    @JoinTable()
    ustack: Ustack[];
}

