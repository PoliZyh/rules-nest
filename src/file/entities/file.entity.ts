import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import type { FileType, IsFolder } from "src/interface/common.interface";
import { Project } from "src/project/entities/project.entity";
import { Variable } from "src/variable/entities/variable.entity";

@Entity()
export class File {

    @PrimaryGeneratedColumn()
    id: number

    // 跟文件父ID为0
    @Column()
    parentId: number

    @Column()
    fileName: string

    @Column()
    fileType: FileType

    @Column()
    isFolder: IsFolder

    @ManyToOne(() => Project, (project) => project.file, { onDelete: 'CASCADE' })
    project: Project

    @OneToMany(() => Variable, (variable) => variable.file)
    variable: Variable[]

}
