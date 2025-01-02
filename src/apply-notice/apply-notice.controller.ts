import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplyNoticeService } from './apply-notice.service';
import { CreateApplyNoticeDto } from './dto/create-apply-notice.dto';
import { UpdateApplyNoticeDto } from './dto/update-apply-notice.dto';

@Controller('apply-notice')
export class ApplyNoticeController {
  constructor(private readonly applyNoticeService: ApplyNoticeService) {}

  @Post()
  create(@Body() createApplyNoticeDto: CreateApplyNoticeDto) {
    return this.applyNoticeService.create(createApplyNoticeDto);
  }

  @Get()
  findAll() {
    return this.applyNoticeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applyNoticeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplyNoticeDto: UpdateApplyNoticeDto) {
    return this.applyNoticeService.update(+id, updateApplyNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applyNoticeService.remove(+id);
  }
}
