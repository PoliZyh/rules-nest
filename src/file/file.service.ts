import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileType, IsFolder } from 'src/interface/common.interface';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class FileService {

  constructor(
    @InjectRepository(File) private readonly file: Repository<File>
  ) { }

  async create(
    fileName: string, fileType: FileType, isFolder: IsFolder,
    parentId: number, project: Project
  ) {
    const data = new File()
    data.fileName = fileName
    data.fileType = isFolder == IsFolder.Yes ? FileType.FileRule : fileType
    data.isFolder = isFolder
    data.parentId = parentId
    data.project = project
    const info = await this.file.save(data)
    return info.id > 0 ? true : false
  }

  // 根据projectId统计文件类型个数
  async getTotalFileNums(projectId: number, fileType: FileType) {
    const info = await this.file
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.project', 'project')
      .where({ project: { id: projectId } })
      .andWhere({ fileType })
      .getCount()
    return info
  }

  async removeFileById(fileId: number) {
    const info = await this.file.delete({
      id: fileId
    })
    return info.affected > 0 ? true : false
  }

  async getFilesByProjectId(projectId: number) {
    const info = await this.file.find({
      where: {
        project: { id: projectId }
      }
    })
    return info
  }

  filterByFileType(fileType: FileType, files: File[]) {
    const data = []
    files.forEach(item => {
      if (item.isFolder || item.fileType == fileType) data.push(item)
    })
    return data
  }

  files2tree(files: File[]) {
    const data: any = files
    const idMap = new Map<number, any>(); // 存储所有文件的引用，按 id 映射
    const tree: Array<any> = []; // 存储最终的树结构

    data.forEach((file) => {
      // 初始化对象并确保包含 children 数组
      if (file.isFolder === 1) {
        file.children = [];
      }
      idMap.set(file.id, file); // 按 ID 存储文件引用

      if (file.parentId === 0) {
        // 根节点（parentId 为 0）
        tree.push(file);
      } else {
        // 不是根节点，找到父节点并将其加入 children
        const parent = idMap.get(file.parentId);
        if (parent && parent.isFolder === 1) {
          parent.children.push(file);
        }
      }
    });

    return tree;
  }

  async findFileByFileId(fileId: number) {
    const info = await this.file.findOne({
      where: { id: fileId }
    })
    return info
  }

}
