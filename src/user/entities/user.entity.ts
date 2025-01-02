
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApplyNotice } from "src/apply-notice/entities/apply-notice.entity";

@Entity()
export class User {


    // 用户ID
    @PrimaryGeneratedColumn()
    id: number

    //用户名
    @Column()
    username: string

    // 用户密码
    @Column()
    password: string


    @OneToMany(() => ApplyNotice, (applyNotice) => applyNotice.user)
    applyNotice: ApplyNotice[]


}
