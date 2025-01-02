import { Module } from '@nestjs/common';
import { RuleHistoryService } from './rule-history.service';
import { RuleHistoryController } from './rule-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleHistory } from './entities/rule-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuleHistory])],
  controllers: [RuleHistoryController],
  providers: [RuleHistoryService],
})
export class RuleHistoryModule {}
