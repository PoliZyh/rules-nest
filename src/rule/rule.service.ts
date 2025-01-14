import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './entities/rule.entity';
import { User } from 'src/user/entities/user.entity';
import { UserProject } from 'src/user-project/entities/user-project.entity';
import { FileType, IsDelete, IsOpen } from 'src/interface/common.interface';
import { Not } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';


@Injectable()
export class RuleService {

  constructor(
    @InjectRepository(Rule) private readonly rule: Repository<Rule>,
    @InjectRepository(User) private readonly user: Repository<User>
  ) { }
  async create(ruleName: string, rule: string, fileId: number, project: Project) {
    const data = new Rule()
    data.ruleName = ruleName
    data.rule = rule
    data.isDelete = IsDelete.No
    data.status = IsOpen.Close
    data.fileId = fileId
    data.project = project
    const info = await this.rule.save(data)
    return info.id > 0 ? true : false
  }

  async findRuleHistoryByProjectId(projectId: number, limit: number, isLast: boolean) {
    let info = []
    if (isLast) {
      info = await this.rule
        .createQueryBuilder('rule')
        .leftJoinAndSelect('rule.ruleHistory', 'ruleHistory')
        .where({ project: { id: projectId } })
        .orderBy('ruleHistory.id', 'DESC')
        .limit(limit)
        .getMany()
    } else {
      info = await this.rule.find({
        where: {
          project: { id: projectId }
        },
        relations: ['ruleHistory']
      })
    }
    // 格式化返回数据
    const data = []
    info.forEach((rule) => {
      rule.ruleHistory.forEach((ruleHis) => {
        data.push({
          userId: ruleHis.userId,
          ruleName: rule.ruleName,
          operation: ruleHis.operation
        })
      })
    })

    // 查询user名
    for (const item of data) {
      const user = await this.findUserById(item.userId)
      item.username = user.username
    }

    return data

  }

  async findUserById(userId) {
    const userInfo = await this.user.findOne({
      where: {
        id: userId
      }
    })
    return userInfo
  }

  async getMembersSubmitNums(members: Array<UserProject>) {
    const data = []
    for(const member of members) {
      const rules = await this.rule
        .createQueryBuilder('rule')
        .leftJoinAndSelect('rule.ruleHistory', 'ruleHistory')
        .where('ruleHistory.userId = :userId', { userId: member.userId })
        .getMany()
      let submitNum = 0
      rules.forEach(item => submitNum += item.ruleHistory.length)
      const user = await this.findUserById(member.userId)
      data.push({
        username: user.username,
        submitNum
      })
    }
    return data
  }

  async getRulesByProjectId(projectId: number) {
    const info = await this.rule.find({ 
      where: { 
        project: { id: projectId },
        isDelete: Not(IsDelete.Yes)
      } })
      return info
  }

  async updateRuleStatus(id: number, status: IsOpen) {
    const info = await this.rule.update({
      id
    }, {
      status
    })
    return info.affected > 0 ? true : false
  }

  async deleteRule(id: number) {
    const info = await this.rule.update({
      id
    }, {
      isDelete: IsDelete.Yes
    })
    return info.affected > 0 ? true : false
  }

  async updateRule(ruleId: number, newData) {
    const info = await this.rule.update({
      id: ruleId
    }, newData)
    return info.affected > 0 ? true : false
  }

  async findRulesByFileId(fileId: number) {
    const info = await this.rule.find({
      where: {
        fileId,
        isDelete: IsDelete.No
      }
    })
    return info
  }


  async findRuleByRuleId(ruleId: number) {
    const info = await this.rule.findOne({
      where: { id: ruleId }
    })
    return info
  }
  

}
