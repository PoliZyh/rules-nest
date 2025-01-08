import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EngineService } from './engine.service';

@Controller('engine')
export class EngineController {
  constructor(private readonly engineService: EngineService) {}


  @Post('test')
  async testEngine(@Body('rule') rule: string) {
    return await this.engineService.runEngine(rule)
  }

  @Post('testStr')
  async testStrEngine(@Body('rule') rule: string) {
    return await this.engineService.runEngine(rule)
  }

  @Post('const')
  async testConstEngine(@Body('rule') rule: string) {
    return await this.engineService.runEngine(rule)
  }

}
