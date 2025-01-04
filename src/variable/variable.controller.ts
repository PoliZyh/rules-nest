import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VariableService } from './variable.service';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { FileType } from 'src/interface/common.interface';
import { enum2type } from 'src/utils/enum2type';
import { FileService } from 'src/file/file.service';

@Controller('variable')
export class VariableController {
  constructor(
    private readonly variableService: VariableService,
    private readonly fileService: FileService
  ) {}

  // 2.6.1 获取某个变量库中的所有变量
  @Post('/get')
  async getVariables(
    @Body('fileId') fileId: number,
    @Body('fileType') fileType: FileType
  ) {
    const info = await this.variableService.findVariablesByFileId(fileId)
    const data = info.map(({ varName, describe, default: defaultValue, variableType, ...rest }) => ({
      ...rest,
      variableName: varName,
      variableType: enum2type(variableType),
      description: describe,
      value: defaultValue
    }))
    return data
  }

  // 2.6.2 删除某个变量
  @Get('delete')
  async deleteVariable(@Query('variableId') variableId: number) {
    const data = await this.variableService.remove(variableId)
    return data
  }

  // 2.6.3 删除某个变量库
  @Get('/deleteSet')
  async deleteVariableFile(@Query('fileId') fileId: number) {
    const data = await this.fileService.removeFileById(fileId)
    return data
  }

}
