import { PartialType } from '@nestjs/mapped-types';
import { CreateApplyNoticeDto } from './create-apply-notice.dto';

export class UpdateApplyNoticeDto extends PartialType(CreateApplyNoticeDto) {}
