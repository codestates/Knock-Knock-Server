import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pstack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stackName: string;
}
