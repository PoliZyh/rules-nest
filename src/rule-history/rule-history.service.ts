import { Injectable } from '@nestjs/common';
import { CreateRuleHistoryDto } from './dto/create-rule-history.dto';
import { UpdateRuleHistoryDto } from './dto/update-rule-history.dto';
import { Operation } from 'src/interface/common.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleHistory } from './entities/rule-history.entity';
import { Repository } from 'typeorm';
import { Rule } from 'src/rule/entities/rule.entity';

@Injectable()
export class RuleHistoryService {
 

  constructor(
    @InjectRepository(RuleHistory) private readonly ruleHistory: Repository<RuleHistory>,
    @InjectRepository(Rule) private readonly rule: Repository<Rule>
  ) {}
  
  async create(userId: number, ruleId: number, operation: Operation) {

    // 查找rule 关联
    const rule = await this.rule.findOneBy({ id: ruleId })
    // 添加一行记录
    const data = new RuleHistory()
    data.operation = operation
    data.userId = userId
    data.rule = rule
    const info = await this.ruleHistory.save(data)
    return info.id > 0 ? true : false
  }

  async findHistoryByRuleId(ruleId: number) {
    const data = await this.ruleHistory.find({
      where: { rule: { id: ruleId } }
    })
    return data
  }


}
