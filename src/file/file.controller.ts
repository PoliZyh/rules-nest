import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileType } from 'src/interface/common.interface';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}


  // 2.7.3 获取⽂件夹的树结构 11/8新增
  @Post('/getTree')
  async getFileTree(@Body('projectId') projectId: number, @Body('type') fileType: FileType) {
    const files = await this.fileService.getFilesByProjectId(projectId)
    const filterFiles = this.fileService.filterByFileType(fileType, files)  
    const tree = this.fileService.files2tree(filterFiles)
    return tree
  }
}
