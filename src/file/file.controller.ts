import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileType, IsFolder } from 'src/interface/common.interface';
import { ProjectService } from 'src/project/project.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly projectService: ProjectService
  ) {}


  // 2.7.3 获取⽂件夹的树结构 11/8新增
  @Post('/getTree')
  async getFileTree(@Body('projectId') projectId: number, @Body('type') fileType: FileType) {
    const files = await this.fileService.getFilesByProjectId(projectId)
    const filterFiles = this.fileService.filterByFileType(fileType, files)  
    const tree = this.fileService.files2tree(filterFiles)
    return tree
  }


  // 2.7.8 创建⽂件（夹）
  @Post('/createFile')
  async createFile(
    @Body('fileName') fileName: string,
    @Body('fileType') fileType: FileType,
    @Body('parentId') parentId: number,
    @Body('projectId') projectId: number,
    @Body('isFolder') isFolder: IsFolder
  ) {
    const projectInfo = await this.projectService.findProjectById(projectId)
    const data = await this.fileService.create(fileName, fileType, isFolder, parentId, projectInfo)
    return data
  }
}
