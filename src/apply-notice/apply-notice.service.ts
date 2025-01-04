import { Injectable } from '@nestjs/common';
import { CreateApplyNoticeDto } from './dto/create-apply-notice.dto';
import { UpdateApplyNoticeDto } from './dto/update-apply-notice.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyNotice } from './entities/apply-notice.entity';
import { ApplyStatus } from 'src/interface/common.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ApplyNoticeService {

  constructor(
    @InjectRepository(ApplyNotice) private readonly applyNotice: Repository<ApplyNotice>
  ) {}

  async findApplyNoticeByProjectId(projectId: number) {
    const info = await this.applyNotice
      .createQueryBuilder('apply-notice')
      .leftJoinAndSelect('apply-notice.user', 'user')
      .where({ projectId })
      .getMany()
    
    return info
  }

  async updateNoticeStatus(applyId: number, status: ApplyStatus) {
    const info = await this.applyNotice.update({
      id: applyId
    }, {
      status
    })
    return info.affected > 0 ? true : false
  }

  async create(userInfo: User, projectId: number) {
    const data = new ApplyNotice()
    data.projectId = projectId
    data.status = ApplyStatus.Wating
    data.user = userInfo
    const info = await this.applyNotice.save(data)
    return info.id > 0 ? true : false
  }
  
}
