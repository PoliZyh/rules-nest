import { Injectable } from '@nestjs/common';
import { CreateRuleHistoryDto } from './dto/create-rule-history.dto';
import { UpdateRuleHistoryDto } from './dto/update-rule-history.dto';

@Injectable()
export class RuleHistoryService {
  create(createRuleHistoryDto: CreateRuleHistoryDto) {
    return 'This action adds a new ruleHistory';
  }

  findAll() {
    return `This action returns all ruleHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruleHistory`;
  }

  update(id: number, updateRuleHistoryDto: UpdateRuleHistoryDto) {
    return `This action updates a #${id} ruleHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruleHistory`;
  }
}
