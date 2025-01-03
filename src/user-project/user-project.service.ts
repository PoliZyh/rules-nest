import { Injectable } from '@nestjs/common';
import { CreateUserProjectDto } from './dto/create-user-project.dto';
import { UpdateUserProjectDto } from './dto/update-user-project.dto';
import { UserProject } from './entities/user-project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserProjectService {

  constructor(
    @InjectRepository(UserProject) private readonly userProject: Repository<UserProject>
  ) {}
  create(createUserProjectDto: CreateUserProjectDto) {
    return 'This action adds a new userProject';
  }

  async getMemberByProjectId(projectId: number) {
    const info = await this.userProject.find({
      where: {
        projectId
      }
    })
    console.log(info)
    return info
  }

}
