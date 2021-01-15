import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Ustack {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stackName: string;
}
