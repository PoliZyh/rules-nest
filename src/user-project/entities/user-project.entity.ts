import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import type { Positions } from "src/interface/common.interface";

@Entity()
export class UserProject {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    projectId: number

    @Column()
    position: Positions

}
