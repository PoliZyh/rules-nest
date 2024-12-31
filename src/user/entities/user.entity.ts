
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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




}
