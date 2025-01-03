import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import type { FileType } from 'src/interface/common.interface';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {

  constructor(
    @InjectRepository(File) private readonly file: Repository<File>
  ) { }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
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

}
