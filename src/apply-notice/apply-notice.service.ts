import { Injectable } from '@nestjs/common';
import { CreateApplyNoticeDto } from './dto/create-apply-notice.dto';
import { UpdateApplyNoticeDto } from './dto/update-apply-notice.dto';

@Injectable()
export class ApplyNoticeService {
  create(createApplyNoticeDto: CreateApplyNoticeDto) {
    return 'This action adds a new applyNotice';
  }

  findAll() {
    return `This action returns all applyNotice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applyNotice`;
  }

  update(id: number, updateApplyNoticeDto: UpdateApplyNoticeDto) {
    return `This action updates a #${id} applyNotice`;
  }

  remove(id: number) {
    return `This action removes a #${id} applyNotice`;
  }
}
