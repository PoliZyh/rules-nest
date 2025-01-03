import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { FileService } from 'src/file/file.service';
import { FileType } from 'src/interface/common.interface';
import { UserProjectService } from 'src/user-project/user-project.service';
import { enum2operation } from 'src/utils/enum2op';

@Controller('rule')
export class RuleController {
  constructor(
    private readonly ruleService: RuleService,
    private readonly fileService: FileService,
    private readonly userProject: UserProjectService
  ) {}

  // 2.1获取近期工作台数据
  @Get('/console')
  async getLastRuleHistory(@Query('projectId') projectId) {
    const lastFourSubmissions = await this.ruleService.findRuleHistoryByProjectId(projectId, 4, true)
    const pkgNum = await this.fileService.getTotalFileNums(projectId, FileType.FileVaribale)
    const members = await this.userProject.getMemberByProjectId(projectId)
    const teamSubmissionVolume = await this.ruleService.getMembersSubmitNums(members)
    return {
      pkgNum,
      lastFourSubmissions,
      teamSubmissionVolume
    }
  }

  // 2.2 获取项⽬动态
  @Get('/projectDynamics')
  async getProjectDynamics(@Query('projectId') projectId) {
    const data = await this.ruleService.findRuleHistoryByProjectId(projectId, 0, false)
    data.forEach(item => {
      item.event = enum2operation(item.username, item.operation, item.ruleName)
    })
    return {
      "测试时间": data
    }
  }

 
}
