import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuleHistoryService } from './rule-history.service';
import { CreateRuleHistoryDto } from './dto/create-rule-history.dto';
import { UpdateRuleHistoryDto } from './dto/update-rule-history.dto';

@Controller('rule-history')
export class RuleHistoryController {
  constructor(private readonly ruleHistoryService: RuleHistoryService) {}

  @Post()
  create(@Body() createRuleHistoryDto: CreateRuleHistoryDto) {
    return this.ruleHistoryService.create(createRuleHistoryDto);
  }

  @Get()
  findAll() {
    return this.ruleHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruleHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuleHistoryDto: UpdateRuleHistoryDto) {
    return this.ruleHistoryService.update(+id, updateRuleHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruleHistoryService.remove(+id);
  }
}
