import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Rule } from "src/rule/entities/rule.entity";
import type { Operation } from "src/interface/common.interface";

@Entity()
export class RuleHistory {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    operation: Operation 

    @ManyToOne(() => Rule, (rule) => rule.ruleHistory, { onDelete: 'CASCADE' })
    rule: Rule
}
