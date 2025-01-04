import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApplyNoticeService } from './apply-notice.service';
import { ApplyStatus } from 'src/interface/common.interface';
import { UserService } from 'src/user/user.service';

@Controller('apply')
export class ApplyNoticeController {
  constructor(
    private readonly applyNoticeService: ApplyNoticeService,
    private readonly userService: UserService
  ) {}

  // 2.5.1 ⽤户申请列表接⼝
  @Get('get')
  async getApplyList(@Query('projectId') projectId: number) {
    const info = await this.applyNoticeService.findApplyNoticeByProjectId(projectId)
    const data = []
    info.forEach(item => {
      data.push({
        username: item.user.username,
        time: '测试时间',
        applyId: item.id,
        status: item.status
      })
    })
    return data
  }

  // 2.5.2 同意/拒绝⽤户进⼊团队接⼝
  @Get('/handle')
  async handleApplyNotice(
    @Query('projectId') projectId: number,
    @Query('applyId') applyId: number,
    @Query('isApply') isApply: ApplyStatus
  ) {
    const data = await this.applyNoticeService.updateNoticeStatus(applyId, isApply)
    return data
  }

  // 2.5.3 ⽤户申请加⼊团队接⼝
  @Post('add')
  async addApplyNotice(@Req() req, @Body('projectId') projectId: number) {
    const userId = req.session.userId
    const userInfo = await this.userService.findUserById(userId)
    const data = await this.applyNoticeService.create(userInfo, projectId)
    return data
  }

}
