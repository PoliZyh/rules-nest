import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { IsDelete } from 'src/interface/common.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProject } from 'src/user-project/entities/user-project.entity';
import { Positions } from 'src/interface/common.interface';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project) private readonly project: Repository<Project>,
    @InjectRepository(UserProject) private readonly userProject: Repository<UserProject>
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    // 在project表中新增
    const data = new Project()
    data.isDelete = IsDelete.No
    data.projectName = createProjectDto.projectName
    data.projectProfile = createProjectDto.projectProfile.length > 0 ? createProjectDto.projectProfile : '暂无简介'
    const info = await this.project.save(data)
    // 在user-project表中新增
    const upData = new UserProject()
    upData.position = Positions.Leader
    upData.projectId = info.id
    upData.userId = userId
    const upInfo = await this.userProject.save(upData)
    return upInfo 
  }

  async findAll(userId: number) {
    const info = await this.userProject.find({ where: { userId } })
    const res = []
    for(let i = 0; i < info.length; i++) {
      const projectId = info[i].projectId
      const pInfo = await this.project.findOne({ where: { id: projectId } })
      const item = {
        id: pInfo.id,
        projectName: pInfo.projectName,
        position: info[i].position,
        projectProfile: pInfo.projectProfile
      }
      res.push(item)
    }
    return res
  }

  async findProjectById(projectId: number) {
    const info = await this.project.findOne({
      where: { id: projectId }
    })
    return info
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number) {
    const data = await this.project.delete(id)
    return data
  }
}
