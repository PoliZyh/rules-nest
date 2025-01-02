
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import type { IsDelete, IsOpen } from "src/interface/common.interface";
import { Project } from "src/project/entities/project.entity";
import { RuleHistory } from "src/rule-history/entities/rule-history.entity";


/*
    一对多模型: 一个项目可以有多个规则 多个规则可以属于同一个项目
*/

@Entity()
export class Rule {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ruleName: string

    @Column()
    rule: string

    @Column()
    isDelete: IsDelete

    @Column()
    status: IsOpen

    @ManyToOne(() => Project, (project) => project.rules, { onDelete: 'CASCADE' })
    project: Project

    @OneToMany(() => RuleHistory, (ruleHistory) => ruleHistory.rule)
    ruleHistory: RuleHistory[]

}
