import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { EngineService } from 'src/engine/engine.service';
import { RuleService } from 'src/rule/rule.service';


@Controller('open-api')
export class OpenApiController {
  constructor(
    private readonly openApiService: OpenApiService,
    private readonly engineService: EngineService,
    private readonly ruleService: RuleService
  ) {}


  @Post(':id')
  async openAPI(@Param('id') id, @Body('vars') vars) {

    const ruleInfo = await this.ruleService.findRuleByRuleId(id)

    const varMap = this.openApiService.vars2Map(vars)

    const res = await this.engineService.runEngineUnderOpenAPI(ruleInfo.rule, varMap)

    return res

  }


}
