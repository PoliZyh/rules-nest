import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserProjectService } from 'src/user-project/user-project.service';
import { enum2positions } from 'src/utils/enum2pos';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userProjectService: UserProjectService
  ) {}

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

  // 2.3.1 获取项⽬成员
  @Get('memebers')
  async getProjectMembers(@Query('projectId') projectId) {
    const members = await this.userProjectService.getMemberByProjectId(projectId)
    const data = []
    members.forEach(item => {
      data.push({
        ...item,
        position: enum2positions(item.position)
      })
    })
    return data
  }

  // 2.3.2 删除项⽬成员
  @Post('deleteMember')
  async deleteMember(@Body('projectId') projectId: number, @Body('userId') userId: number) {
    const info = await this.userProjectService.remove(projectId, userId)
    return info
  }

}
