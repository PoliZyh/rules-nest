import { Injectable } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Variable } from './entities/variable.entity';
import { VariableType } from 'src/interface/common.interface';
import { File } from 'src/file/entities/file.entity';


@Injectable()
export class VariableService {


  constructor(
    @InjectRepository(Variable) private readonly variable: Repository<Variable>
  ) {}

  async create(
    varName: string, describe: string, value: string, 
    variableType: VariableType, file: File
  ) {
    const data = new Variable()
    data.default = value
    data.describe = describe
    data.file = file
    data.varName = varName
    data.variableType = variableType
    const info = await this.variable.save(data)
    return info.id > 0 ? true : false
  }


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


  async update(varId, newData) {
    const info = await this.variable.update({
      id: varId
    }, newData)
    return info.affected > 0 ? true : false
  }

}
