import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // 1.5 新增项目 
  @Post('add')
  async createProject(@Req() req, @Body() createProjectDto: CreateProjectDto) {
    const upInfo = await this.projectService.create(createProjectDto, req.session.userId)
    return upInfo.id ? true : false
  }

  // 1.4 删除项目
  @Post('delete')
  async deleteProject(@Body('id') id: number) {
    const info = await this.projectService.remove(+id)
    return info.affected > 0 ? true : false
  }

  // 1.3 获取列表
  @Post('get')
  async getProject(@Req() req) {
    const userId = req.session.userId
    const data = await this.projectService.findAll(userId)
    return data
  }


}
