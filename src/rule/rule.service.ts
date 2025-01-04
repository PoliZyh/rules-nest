import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './entities/rule.entity';
import { User } from 'src/user/entities/user.entity';
import { UserProject } from 'src/user-project/entities/user-project.entity';
import { IsDelete, IsOpen } from 'src/interface/common.interface';
import { Not } from 'typeorm';


@Injectable()
export class RuleService {

  constructor(
    @InjectRepository(Rule) private readonly rule: Repository<Rule>,
    @InjectRepository(User) private readonly user: Repository<User>
  ) { }
  create(createRuleDto: CreateRuleDto) {
    return 'This action adds a new rule';
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


}
