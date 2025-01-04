import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { FileService } from 'src/file/file.service';
import { FileType, Operation } from 'src/interface/common.interface';
import { UserProjectService } from 'src/user-project/user-project.service';
import { enum2operation } from 'src/utils/enum2op';
import { IsOpen } from 'src/interface/common.interface';
import { RuleHistoryService } from 'src/rule-history/rule-history.service';
import { ProjectService } from 'src/project/project.service';

@Controller('rule')
export class RuleController {
  constructor(
    private readonly ruleService: RuleService,
    private readonly fileService: FileService,
    private readonly userProject: UserProjectService,
    private readonly ruleHistory: RuleHistoryService,
    private readonly projectService: ProjectService
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

  // 2.4.1  获取全部规则状态
  @Get('/ruleStatus/get')
  async getRuleStatus(@Query('projectId') projectId) {
    const rules = await this.ruleService.getRulesByProjectId(projectId)
    const data = rules.map(({ id, rule, ...rest }) => ({
      ...rest, // 包括 item 中除 id 和 rule 外的其他属性
      ruleId: id, // 如果需要 id，可以在这里重新命名为 ruleId
      ruleSet: ['测试1', '测试2'],
      createTime: '测试时间创建',
      updateTime: '测试时间更新',
      username: '测试创建人',
    }));
    return data
  }

  // 2.4.2 启⽤/禁⽤规则的状态
  @Post('/ruleStatus/change')
  async changeRuleStatus(
    @Body('projectId') projectId: number, 
    @Body('ruleId') ruleId: number,
    @Body('status') status: IsOpen
  ) {
    const data = await this.ruleService.updateRuleStatus(ruleId, status)
    return data
  }

  //2.4.3 添加规则的历史记录
  @Post('/ruleHistory/add')
  async addRuleHistory(
    @Req() req,
    @Body('projectId') projectId: number,
    @Body('ruleId') ruleId: number,
    @Body('userName') username: string,
    @Body('time') time: string,
    @Body('event') operation: Operation
  ) {
    const userId = req.session.userId
    const data = await this.ruleHistory.create(userId, ruleId, operation)
    return data
  }

  // 2.4.4 查看规则的历史记录
  @Get('/ruleHistory/get')
  async getRuleHistory(@Query('projectId') projectId: number, @Query('ruleId') ruleId: number) {
    const rHdata = await this.ruleHistory.findHistoryByRuleId(ruleId)
    const data = []
    for(const item of rHdata) {
      const userInfo = await this.ruleService.findUserById(item.userId)
      console.log(userInfo)
      data.push({
        ...item,
        time: '测试时间',
        username: userInfo.username,
        event: enum2operation(userInfo.username, item.operation, '本规则')
      })
    }
    return data
  }

  // 2.4.5 删除规则
  @Get('/ruleStatus/delete')
  async deleteRule(@Query('ruleId') ruleId: number) {
    
    const data = await this.ruleService.deleteRule(ruleId)
    return data
  }

  // 2.7.1 新增规则
  @Post('add')
  async addRule(
    @Body('projectId') projectId: number,
    @Body('fileId') fileId: number,
    @Body('ruleName') ruleName: string,
    @Body('rule') rule: string
  ) {
    const projectInfo = await this.projectService.findProjectById(projectId)
    const data = await this.ruleService.create(ruleName, rule, fileId, projectInfo)
    return data
  }

  // 2.7.2 运⾏项⽬
  @Post('/run')
  async runRule(@Body('type') fileType: FileType, @Body('id') id: number) {
    return {
      fileType,
      id
    }
  }
 
}
