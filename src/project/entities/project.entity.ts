
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import type { IsDelete } from "src/interface/common.interface";
import { Rule } from "src/rule/entities/rule.entity";
import { File } from "src/file/entities/file.entity";

/**
 *  项目表与规则表为一对多模型 一个项目可以有多个规则 多个规则可以属于同一个项目
 */

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

    @OneToMany(() => Rule, (rule) => rule.project)
    rules: Rule[]

    @OneToMany(() => File, (file) => file.project)
    file: File[] 
}
