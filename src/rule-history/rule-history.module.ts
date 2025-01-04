import { Module } from '@nestjs/common';
import { RuleHistoryService } from './rule-history.service';
import { RuleHistoryController } from './rule-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleHistory } from './entities/rule-history.entity';
import { Rule } from 'src/rule/entities/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuleHistory, Rule])],
  controllers: [RuleHistoryController],
  providers: [RuleHistoryService],
  exports: [RuleHistoryService]
})
export class RuleHistoryModule {}
