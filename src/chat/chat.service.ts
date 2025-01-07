import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';  // 用于将 Observable 转换为 Promise

@Injectable()
export class ChatService {

  constructor(private readonly httpService: HttpService) { }

  // 测试版本
  async chat(message: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${process.env.CHAT_ADDRESS}/chatRules`, {
          message: message,
        })
      );
      return response.data.response;  // 获取OpenAI的回复
    } catch (error) {
      console.log(error)
      throw new Error('Failed to communicate with Python API');
    }
  }


  // 获取rule
  async chatForRules() {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${process.env.CHAT_ADDRESS}/chatRules`, { message: 'null'})
      );
      return response.data.response;  // 获取OpenAI的回复
    } catch (error) {
      console.log(error)
      throw new Error('Failed to communicate with Python API');
    }
  }



}
