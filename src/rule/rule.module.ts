import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { Rule } from './entities/rule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rule])],
  controllers: [RuleController],
  providers: [RuleService],
})
export class RuleModule {}
