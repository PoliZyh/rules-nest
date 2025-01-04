
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import type { ApplyStatus } from "src/interface/common.interface";
import { User } from "src/user/entities/user.entity";

@Entity()
export class ApplyNotice {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    projectId: number

    @Column()
    status: ApplyStatus

    @ManyToOne(() => User, (user) => user.applyNotice, { onDelete: 'CASCADE' })
    user: User

}
