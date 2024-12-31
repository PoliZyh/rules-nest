import { Injectable } from '@nestjs/common';
import { CreateUserProjectDto } from './dto/create-user-project.dto';
import { UpdateUserProjectDto } from './dto/update-user-project.dto';

@Injectable()
export class UserProjectService {
  create(createUserProjectDto: CreateUserProjectDto) {
    return 'This action adds a new userProject';
  }

  findAll() {
    return `This action returns all userProject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProject`;
  }

  update(id: number, updateUserProjectDto: UpdateUserProjectDto) {
    return `This action updates a #${id} userProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProject`;
  }
}
