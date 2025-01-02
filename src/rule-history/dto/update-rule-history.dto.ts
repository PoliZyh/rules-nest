import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleHistoryDto } from './create-rule-history.dto';

export class UpdateRuleHistoryDto extends PartialType(CreateRuleHistoryDto) {}
