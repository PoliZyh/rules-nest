import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { mapStructureToString } from 'src/utils/rulesTransform'; 


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('test')
  async testChat(@Body('message') message: string) {
    return await this.chatService.chat(message)
  }

  @Post('rules')
  async updateRules(@Body('message') message: string) {
    const rep = await this.chatService.chatForRules(message)
    const extracts = this.chatService.extractContent(rep)
    const rules = this.chatService.rulesJson2Js(extracts.rules)
    const ruleStr = mapStructureToString(rules)
    return {
      logic: extracts.logicExplanation,
      rules,
      vars: extracts.variableExplanation,
      ruleStr
    }
  }


}
