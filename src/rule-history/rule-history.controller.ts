import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuleHistoryService } from './rule-history.service';
import { CreateRuleHistoryDto } from './dto/create-rule-history.dto';
import { UpdateRuleHistoryDto } from './dto/update-rule-history.dto';

@Controller('rule-history')
export class RuleHistoryController {
  constructor(private readonly ruleHistoryService: RuleHistoryService) {}

}
