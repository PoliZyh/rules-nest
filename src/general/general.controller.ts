import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { GeneralService } from './general.service';
import { CreateGeneralDto } from './dto/create-general.dto';
import { UpdateGeneralDto } from './dto/update-general.dto';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Post('/code')
  createCode(@Req() req, @Body('phone') phone) {
    const code = this.generalService.getCode(phone)
    req.session.code = code
    return code
  }
}
