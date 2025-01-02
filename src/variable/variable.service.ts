import { Injectable } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';

@Injectable()
export class VariableService {
  create(createVariableDto: CreateVariableDto) {
    return 'This action adds a new variable';
  }

  findAll() {
    return `This action returns all variable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variable`;
  }

  update(id: number, updateVariableDto: UpdateVariableDto) {
    return `This action updates a #${id} variable`;
  }

  remove(id: number) {
    return `This action removes a #${id} variable`;
  }
}
