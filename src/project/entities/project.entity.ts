
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import type { IsDelete } from "src/interface/common.interface";

@Entity()
export class Project {

    // 项目ID
    @PrimaryGeneratedColumn()
    id: number

    // 项目名
    @Column()
    projectName: string

    // 项目简介
    @Column()
    projectProfile: string

    // 逻辑删除
    @Column()
    isDelete: IsDelete
    
}
