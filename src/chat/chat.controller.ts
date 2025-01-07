import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('test')
  async testChat(@Body('message') message: string) {
    return await this.chatService.chat(message)
  }

  @Post('rules')
  async updateRules() {
    return this.chatService.chatForRules()
  }


}
