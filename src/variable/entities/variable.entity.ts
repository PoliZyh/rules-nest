
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { File } from "src/file/entities/file.entity";


@Entity()
export class Variable {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    varName: string

    @Column()
    describe: string

    // 默认值
    // 统一转化为字符串存储
    @Column()
    default: string


    @ManyToOne(() => File, (file) => file.variable, { onDelete: 'CASCADE' })
    file: File
    

}
