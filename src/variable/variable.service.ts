import { Injectable } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Variable } from './entities/variable.entity';


@Injectable()
export class VariableService {


  constructor(
    @InjectRepository(Variable) private readonly variable: Repository<Variable>
  ) {}
  async findVariablesByFileId(fileId: number) {
    const info = await this.variable.find({
      where: { file: { id: fileId } }
    })
    return info
  }

  async remove(variableId: number) {
    const info = await this.variable.delete({
      id: variableId
    })
    return info.affected > 0 ? true : false
  }

}
